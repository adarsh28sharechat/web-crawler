const cheerio = require('cheerio');
const axios = require('axios');

// Define the list of base URLs to crawl with drug_name parameter
const drugName = "miebo";
const baseUrls = [
  `https://www.goodrx.com/?drug_name=${encodeURIComponent(drugName)}`, // Add drug_name param
  `https://www.goodrx.com/search?drug_name=${encodeURIComponent(drugName)}`, // Search with drug_name param
  // Add more URLs as needed
];

// Function to fetch and parse data from a URL
async function fetchData(url) {
  try {
    console.log(`Fetching data from: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000 // 10 second timeout
    });

    const body = response.data;
    const $ = cheerio.load(body);

    const dataList = [];

    // Example extraction loop
    $('.drug-entry').each((index, element) => { // Adjust selector accordingly
      const varOcg = {}; // __define-ocg__: Variable to hold extracted data
      
      varOcg['drug_name'] = $(element).find('.drug-name').text().trim();
      varOcg['strength'] = $(element).find('.strength').text().trim();
      varOcg['form'] = $(element).find('.form').text().trim();
      varOcg['quantity'] = $(element).find('.quantity').text().trim();
      varOcg['pharmacy'] = $(element).find('.pharmacy-name').text().trim();
      varOcg['displayed_price'] = $(element).find('.price').text().trim();
      varOcg['price_currency'] = 'USD'; // Assumption based on context
      varOcg['location/zip'] = $(element).find('.location').text().trim();
      varOcg['offer_url'] = url;
      varOcg['fetched_at'] = new Date().toISOString();

      // Only add if we have at least some data
      if (varOcg['drug_name'] || varOcg['displayed_price']) {
        dataList.push(varOcg);
      }
    });

    console.log(`Extracted ${dataList.length} items from ${url}`);
    return dataList;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting web crawler...');
  console.log(`🔍 Searching for drug: ${drugName}`);
  console.log(`📋 URLs to crawl: ${baseUrls.length}`);
  
  const allData = [];
  const errors = [];

  for (const url of baseUrls) {
    try {
      const data = await fetchData(url);
      if (data && data.length > 0) {
        allData.push(...data);
      }
    } catch (error) {
      errors.push({
        url,
        error: error.message
      });
    }
  }

  // Output the gathered data
  console.log('\n📊 CRAWL RESULTS:');
  console.log('==================');
  console.log(`🔍 Drug searched: ${drugName}`);
  console.log(`✅ Total items extracted: ${allData.length}`);
  console.log(`❌ Errors encountered: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('\n🚨 ERRORS:');
    errors.forEach(err => {
      console.log(`  - ${err.url}: ${err.error}`);
    });
  }

  if (allData.length > 0) {
    console.log('\n📋 EXTRACTED DATA:');
    console.log('==================');
    console.log(JSON.stringify(allData, null, 2));
  } else {
    console.log('\n⚠️  No data extracted. Check your selectors and target URLs.');
    console.log(`💡 Searched for drug: ${drugName}`);
  }

  console.log('\n✨ Crawling completed!');
}

// Run the crawler
main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

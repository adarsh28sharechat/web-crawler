# Web Crawler Project

A simple Node.js web crawler designed to extract drug pricing data from websites like GoodRx. The crawler uses Cheerio for HTML parsing and outputs results to the console.

## Features

- 🕷️ **Web Scraping**: Extract structured data from web pages
- 🛡️ **Error Handling**: Robust error handling and logging
- 📊 **Data Extraction**: Extract drug pricing information with customizable selectors
- 🖥️ **Console Output**: Simple console-based output for easy viewing

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd web-crawler-project
```

2. Install dependencies:
```bash
npm install
```

3. Run the crawler:
```bash
# Run once
npm start

# Development mode with auto-restart
npm run dev
```

## Configuration

### Default URLs
The crawler comes pre-configured with:
- `https://www.goodrx.com/`

### Customizing Data Extraction

To modify what data is extracted, edit the `main.js` file and update the selectors in the `fetchData` function:

```javascript
$('.drug-entry').each((index, element) => {
  const varOcg = {};
  
  // Update these selectors based on the target website
  varOcg['drug_name'] = $(element).find('.drug-name').text().trim();
  varOcg['strength'] = $(element).find('.strength').text().trim();
  // ... add more fields as needed
});
```

### Adding More URLs

Edit the `baseUrls` array in `main.js`:

```javascript
const baseUrls = [
  'https://www.goodrx.com/',
  'https://example.com',
  // Add more URLs as needed
];
```

## Usage

Simply run the crawler and it will:
1. Fetch data from all configured URLs
2. Extract drug pricing information
3. Display results in the console
4. Show summary statistics

### Example Output

```
🚀 Starting web crawler...
📋 URLs to crawl: 1
Fetching data from: https://www.goodrx.com/
Extracted 5 items from https://www.goodrx.com/

📊 CRAWL RESULTS:
==================
✅ Total items extracted: 5
❌ Errors encountered: 0

📋 EXTRACTED DATA:
==================
[
  {
    "drug_name": "Lisinopril",
    "strength": "10mg",
    "form": "Tablet",
    "quantity": "30",
    "pharmacy": "CVS Pharmacy",
    "displayed_price": "$4.00",
    "price_currency": "USD",
    "location/zip": "90210",
    "offer_url": "https://www.goodrx.com/",
    "fetched_at": "2024-01-15T10:30:00.000Z"
  }
]

✨ Crawling completed!
```

## Project Structure

```
web-crawler-project/
├── main.js            # Main crawler script
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## Dependencies

- **node-fetch**: HTTP client for making requests
- **cheerio**: Server-side jQuery implementation for HTML parsing

## Development

### Running in Development Mode
```bash
npm run dev
```
This uses nodemon for automatic restarts on file changes.

### Error Handling
The application includes comprehensive error handling:
- HTTP request errors
- Timeout handling (10 seconds)
- Graceful error reporting

### Logging
All operations are logged to the console with clear status messages.

## Security Considerations

- Always respect robots.txt files
- Use proper User-Agent headers
- Consider implementing request delays to avoid overwhelming target servers
- Be aware of website terms of service
- Consider using proxy rotation for large-scale crawling

## License

MIT License

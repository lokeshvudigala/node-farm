const http = require('http');
const fs = require('fs');
const url = require('url');

const generateHtmlFromTemplate = require('./modules/generateHtmlFromTemplate');

const overviewTemplateHtml = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const productCardTemplateHtml = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const productDetailsTemplateHtml = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const rawProductData = fs.readFileSync(
  `${__dirname}/dev-data/data.json`,
  'utf-8'
);
const parsedProductData = JSON.parse(rawProductData);

const handleOverviewPageRequest = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  const allProductCardsHtml = parsedProductData
    .map((product) =>
      generateHtmlFromTemplate(productCardTemplateHtml, product)
    )
    .join('');
  const overviewPageHtml = overviewTemplateHtml.replace(
    /{%PRODUCT_CARDS%}/g,
    allProductCardsHtml
  );
  response.end(overviewPageHtml);
};

const handleProductPageRequest = (response, query) => {
  const product = parsedProductData[query.id];
  if (!product) {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h3>Product not found!</h3>');
    return;
  }

  const productPageHtml = generateHtmlFromTemplate(
    productDetailsTemplateHtml,
    product
  );
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.end(productPageHtml);
};

const handle404ErrorPage = (response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end('<h3>Page not found!</h3>');
};

const httpServer = http.createServer((request, response) => {
  const { query, pathname } = url.parse(request.url, true);

  if (pathname === '/' || pathname === '/overview') {
    handleOverviewPageRequest(response);
  } else if (pathname === '/product') {
    handleProductPageRequest(response, query);
  } else {
    handle404ErrorPage(response);
  }
});

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

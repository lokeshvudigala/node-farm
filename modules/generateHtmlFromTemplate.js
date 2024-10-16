const replacePlaceholder = (template, placeholder, value) => {
  return template.replace(new RegExp(placeholder, 'g'), value);
};

module.exports = (template, product) => {
  let replacedTemplate = template;

  replacedTemplate = replacePlaceholder(replacedTemplate, '{%PRODUCT_NAME%}', product.productName);
  replacedTemplate = replacePlaceholder(replacedTemplate, '{%IMAGE%}', product.image);
  replacedTemplate = replacePlaceholder(replacedTemplate, '{%PRICE%}', product.price);
  replacedTemplate = replacePlaceholder(replacedTemplate, '{%FROM%}', product.from);
  replacedTemplate = replacePlaceholder(replacedTemplate, '{%ID%}', product.id);
  replacedTemplate = replacePlaceholder(replacedTemplate, '{%NUTRIENTS%}', product.nutrients);
  replacedTemplate = replacePlaceholder(replacedTemplate, '{%QUANTITY%}', product.quantity);
  replacedTemplate = replacePlaceholder(replacedTemplate, '{%PRODUCT_DESCRIPTION%}', product.description);

  if (!product.organic) {
    replacedTemplate = replacePlaceholder(replacedTemplate, '{%NOT_ORGANIC%}', 'not-organic');
  }

  return replacedTemplate;
};

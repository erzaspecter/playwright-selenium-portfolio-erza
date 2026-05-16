function generateProductSlug(productName) {
  return productName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

module.exports = { generateProductSlug }
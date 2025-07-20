import csv from 'csvtojson';
import mongoose from 'mongoose';
import { ProductModel } from './models/product.js'; // Make sure the path is correct

mongoose.connect('mongodb://localhost:27017/Amazon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const filePath = './amazon.csv';

csv()
  .fromFile(filePath)
  .then(async (products) => {
    const cleanedProducts = products.map(product => ({
      product_id: product['product_id'],
      product_name: product['product_name'],
      category: product['category']
        ? product['category'].split('|')
        : [],
      discounted_price: parsePrice(product['discounted_price']),
      actual_price: parsePrice(product['actual_price']),
      discount_percentage: parsePercentage(product['discount_percentage']),
      rating: parseFloat(product['rating']) || 0,
      ratingCount: parseInt(product['rating_count']?.replace(/,/g, '')) || 0,
      img_link: product['img_link'],
      about: product['about_product'],
    }));

    await ProductModel.insertMany(cleanedProducts);
    console.log('✅ Data imported successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Error importing CSV:', err);
    mongoose.connection.close();
  });

function parsePrice(value) {
  if (!value) return 0;
  return parseFloat(value.replace(/[₹,]/g, '')) || 0;
}

function parsePercentage(value) {
  if (!value) return 0;
  return parseFloat(value.replace('%', '')) || 0;
}

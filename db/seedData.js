const users = [
  { username: 'Bill', password: 12345678 },
  { username: 'Jane', password: 87654321 },
  { username: 'Shelly', password: 24681012 },
]

const products = [
  {
    name: 'Banana',
    description: 'The most yellow of fruit',
    price: 299,
    stockQty: 100,
    imageUrl: '/banana.jpg',
  },
  {
    name: 'Apple',
    description: 'A red one',
    price: 199,
    stockQty: 100,
    imageUrl: '/apple.jpg',
  },
  {
    name: 'Pineapple',
    description: 'Yellow, pretty much',
    price: 299,
    stockQty: 300,
    imageUrl: '/pineapple.jpg',
  },
  {
    name: 'Passion Fruit',
    description: 'A Tropical Delight',
    price: 2999,
    stockQty: 5,
    imageUrl: '/passion.jpg',
  },
]

const order_products = [
  { orderId: 1, productId: 1, qty: 2 },
  { orderId: 2, productId: 2, qty: 3 },
  { orderId: 3, productId: 3, qty: 2 },
]

module.exports = { users, products, order_products }

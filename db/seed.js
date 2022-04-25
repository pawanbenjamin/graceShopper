const pool = require('./pool')
const { User, Product, Order_Product, Order } = require('./models')
const { users, products, order_products } = require('./seedData')

const dropTables = async () => {
  await pool.query(`
        DROP TABLE IF EXISTS order_products;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
    `)
}

const createTables = async () => {
  await pool.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false
        )
    `)

  await pool.query(`
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "isActive" BOOLEAN DEFAULT true
        );
      `)

  await pool.query(`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description TEXT,
          price INTEGER,
          "stockQty" INTEGER,
          "imageUrl" TEXT
        );
    `)
  await pool.query(`
        CREATE TABLE order_products(
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "orderId" INTEGER REFERENCES orders(id),
          qty INTEGER,
          UNIQUE("productId", "orderId")
        );`)
}

const seedDb = async () => {
  console.log('Creating Users...')
  const createdUsers = await Promise.all(users.map(User.createUser))
  console.log('Users:', createdUsers)

  console.log('Creating Products...')
  const createdProduct = await Promise.all(products.map(Product.createProduct))
  console.log('Products:', createdProduct)

  console.log('Creating Carts...')
  const createdCarts = await Promise.all(
    createdUsers.map((user) => {
      return Order.createCartByUserId(user.id)
    })
  )
  console.log('Empty orders created....')

  console.log('Adding stuff to orders...')
  const createdOrderProducts = await Promise.all(
    order_products.map(Order_Product.addToCart)
  )
  console.log('Order_Products: ', createdOrderProducts)
}

const initDb = async () => {
  try {
    await dropTables()
    await createTables()
    await seedDb()
    console.log('DB is seeded and ready to go!!')
  } catch (error) {
    console.error(error)
  }
}

initDb().then(() => pool.end())

const pool = require('./pool')
const { User } = require('./models')
const { users } = require('./seedData')

const dropTables = async () => {
  await pool.query(`
        DROP TABLE IF EXISTS users;
    `)
}

const createTables = async () => {
  await pool.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `)
}

const seedDb = async () => {
  console.log('Creating Users...')
  const createdUsers = await Promise.all(users.map(User.createUser))
  console.log('Users:', createdUsers)
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

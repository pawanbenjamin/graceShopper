const pool = require('../pool')

async function addToCart({ productId, orderId, qty = 1 }) {
  const {
    rows: [order_product],
  } = await pool.query(
    `
        INSERT INTO order_products("productId", "orderId", qty)
            VALUES($1, $2, $3)
            RETURNING * 
        `,
    [productId, orderId, qty]
  )

  return order_product
}

async function removeFromCart({ productId, orderId }) {
  console.log('before query')
  const {
    rows: [op],
  } = await pool.query(
    `
        DELETE FROM order_products as op
            WHERE op."productId"=$1 and op."orderId"=$2
            RETURNING *
    `,
    [productId, orderId]
  )
  console.log('order prod', op)
  return op
}

async function updateQtyInCart({ productId, orderId, qty }) {
  const {
    rows: [op],
  } = await pool.query(
    `
        UPDATE order_products
          SET qty=$3
          WHERE "orderId"=$2 and "productId"=$1
          RETURNING *
    `,
    [productId, orderId, qty]
  )

  return op
}

module.exports = { addToCart, removeFromCart, updateQtyInCart }

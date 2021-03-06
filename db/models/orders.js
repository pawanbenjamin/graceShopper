const pool = require('../pool')

async function createCartByUserId(userId) {
  const {
    rows: [cart],
  } = await pool.query(
    `
        INSERT INTO orders("userId")
                VALUES($1)
                RETURNING * 
        `,
    [userId]
  )
  return cart
}

async function getAllOrders() {
  const { rows } = await pool.query(`
        SELECT 
            orders.id,
            orders."userId" as "userId",         
            orders."isActive",
        CASE WHEN order_products."orderId" IS NULL THEN '[]'::json
        ELSE 
        JSON_AGG(
            JSON_BUILD_OBJECT(
            'id', products.id,
            'name', products.name,
            'description', products.description,
            'price', products.price,
            'qty', order_products.qty
            )
        ) END as items
        FROM orders
        LEFT JOIN order_products ON orders.id = order_products."orderId"
        LEFT JOIN products ON order_products."productId" = products.id 
        GROUP BY orders.id, order_products."orderId"
    `)
  return rows
}

async function getOrderById(orderId) {
  const {
    rows: [order],
  } = await pool.query(
    `
        SELECT 
            orders.id,
            orders."userId" as "userId",         
            orders."isActive",
        CASE WHEN order_products."orderId" IS NULL THEN '[]'::json
        ELSE 
            JSON_AGG(
                JSON_BUILD_OBJECT(
                'id', products.id,
                'name', products.name,
                'description', products.description,
                'price', products.price,
                'qty', order_products.qty
                )
            ) END as items
        FROM orders
        LEFT JOIN order_products ON orders.id = order_products."orderId"
        LEFT JOIN products ON order_products."productId" = products.id 
        WHERE orders.id = $1
        GROUP BY orders.id, order_products."orderId"
    `,
    [orderId]
  )

  return order
}

async function getAllOrdersByUserId(userId) {
  const { rows } = await pool.query(
    `
        SELECT 
            orders.id,
            orders."userId" as "userId",         
            orders."isActive",
        CASE WHEN order_products."orderId" IS NULL THEN '[]'::json
        ELSE 
            JSON_AGG(
                JSON_BUILD_OBJECT(
                'id', products.id,
                'name', products.name,
                'description', products.description,
                'price', products.price,
                'qty', order_products.qty
                )
            ) END as items
        FROM orders
        LEFT JOIN order_products ON orders.id = order_products."orderId"
        LEFT JOIN products ON order_products."productId" = products.id 
        WHERE orders."userId" = $1
        GROUP BY orders.id, order_products."orderId"
    `,
    [userId]
  )
  return rows
}

// Get Cart (order that is active) and include everything
async function getCartByUserId(userId) {
  const {
    rows: [cart],
  } = await pool.query(
    `
        SELECT 
            orders.id,
            orders."userId" as "userId",         
            orders."isActive",
            CASE WHEN order_products."orderId" IS NULL THEN '[]'::json
        ELSE 
            JSON_AGG(
                JSON_BUILD_OBJECT(
                'id', products.id,
                'name', products.name,
                'description', products.description,
                'price', products.price,
                'qty', order_products.qty
                )
            ) END as items
        FROM orders
        LEFT JOIN order_products ON orders.id = order_products."orderId"
        LEFT JOIN products ON order_products."productId" = products.id 
        WHERE orders."userId" = $1 and orders."isActive" = true
        GROUP BY orders.id, order_products."orderId"
    `,
    [userId]
  )

  return cart
}

async function purchaseCart(orderId) {
  const {
    rows: [order],
  } = await pool.query(
    `
        UPDATE orders
          SET "isActive"=false
          WHERE id=$1
          RETURNING *
    `,
    [orderId]
  )
  return order
}

async function deleteOrderByOrderId(orderId) {
  const {
    rows: [deletedOrder],
  } = await pool.query(
    `
        DELETE FROM orders
          WHERE id=$1
          RETURNING *
    `,
    [orderId]
  )

  return deletedOrder
}

module.exports = {
  createCartByUserId,
  getOrderById,
  getAllOrdersByUserId,
  getCartByUserId,
  getAllOrders,
  deleteOrderByOrderId,
  purchaseCart,
}

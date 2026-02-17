const db = require("../config/database");

exports.upsert = async (p) => {
  await db.query(
    `INSERT INTO products (id, name, description, price, version)
     VALUES ($1,$2,$3,$4,1)
     ON CONFLICT (id) DO UPDATE
     SET name=$2, description=$3, price=$4,
         version=products.version+1,
         updated_at=CURRENT_TIMESTAMP`,
    [p.id, p.name, p.description, p.price]
  );
};

exports.findAll = async ({ limit, offset, name }) => {
  let baseQuery = "FROM products";
  const params = [];

  if (name) {
    params.push(`%${name}%`);
    baseQuery += ` WHERE name ILIKE $${params.length}`;
  }

  // total count
  const countResult = await db.query(
    `SELECT COUNT(*) ${baseQuery}`,
    params
  );
  const totalItems = parseInt(countResult.rows[0].count, 10);

  // data query
  params.push(limit, offset);
  const dataResult = await db.query(
    `SELECT * ${baseQuery}
     ORDER BY updated_at DESC
     LIMIT $${params.length - 1}
     OFFSET $${params.length}`,
    params
  );

  return {
    totalItems,
    data: dataResult.rows
  };
};

exports.findById = async (id) => {
  const { rows } = await db.query(
    "SELECT * FROM products WHERE id=$1",
    [id]
  );
  return rows[0];
};

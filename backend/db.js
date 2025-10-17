import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

let pool;

if (process.env.DATABASE_URL) {
  // Configuración para producción (Railway)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // necesario para Railway
    },
  });
} else {
  // Configuración para desarrollo local
  pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "tu_contraseña_local",
    database: process.env.DB_NAME || "nombre_de_tu_db_local",
    port: process.env.DB_PORT || 5432,
  });
}

pool
  .connect()
  .then(() => console.log("✅ Conexión exitosa a PostgreSQL"))
  .catch((err) => console.error("❌ Error al conectar a PostgreSQL:", err));

export default pool;

import express from "express";
import cors from "cors";
import pool from "./db.js"; // tu archivo de conexión

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔹 Ruta raíz
app.get("/", (req, res) => {
  res.send("✅ Servidor Express con PostgreSQL funcionando correctamente");
});

// 🔹 GET /estudiantes - Obtener todos los estudiantes
app.get("/estudiantes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM estudiante"); // asegúrate de que la tabla exista
    res.status(200).json({
      status: "success",
      total: result.rowCount,
      estudiantes: result.rows
    });
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    res.status(500).json({ status: "error", message: "Error al obtener estudiantes", details: error.message });
  }
});

// 🔹 POST /estudiantes - Crear un estudiante
app.post("/estudiantes", async (req, res) => {
  try {
    const { nombre, curso } = req.body;
    if (!nombre || !curso) {
      return res.status(400).json({ status: "error", message: "Faltan campos obligatorios: 'nombre' y 'curso'" });
    }

    const result = await pool.query(
      "INSERT INTO estudiante(nombre, curso) VALUES($1, $2) RETURNING *",
      [nombre, curso]
    );

    res.status(201).json({
      status: "success",
      message: "Estudiante creado correctamente",
      estudiante: result.rows[0]
    });
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    res.status(500).json({ status: "error", message: "Error al crear estudiante", details: error.message });
  }
});

// 🔹 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Asegúrate de que esta ruta a tu instancia de Sequelize sea correcta

const Estudiante = sequelize.define('estudiante', {
    // Columna: id (Primary Key)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,           // Define como llave primaria
        autoIncrement: true,        // Asume que es una columna SERIAL/auto-incremental
    },
    // Columna: nombre
    nombre: {
        type: DataTypes.TEXT,       // Mapea a TEXT en PostgreSQL
        allowNull: false,           // El campo no puede ser nulo
    },
    // Columna: curso
    curso: {
        type: DataTypes.TEXT,       // Mapea a TEXT en PostgreSQL
        allowNull: false,           // El campo no puede ser nulo
    },
}, {
    // Opciones del Modelo
    tableName: 'estudiante',      // Nombre real de la tabla en la DB
    schema: 'public',             // Esquema, que por defecto es 'public' en PostgreSQL
    timestamps: false,            // Desactiva las columnas `createdAt` y `updatedAt`
    freezeTableName: true,        // Evita que Sequelize pluralice el nombre de la tabla (Estudiantes)
});

module.exports = estudiante;
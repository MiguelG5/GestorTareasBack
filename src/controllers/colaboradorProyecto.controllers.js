const pool = require("../database");

const colaboradorProyectoCtrl = {};

// Obtener todos los proyectos de colaboradores
colaboradorProyectoCtrl.getProyectosColaboradores = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM proyecto_colaborador");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener proyectos de colaboradores:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Crear un nuevo proyecto para un colaborador
colaboradorProyectoCtrl.createProyectoColaborador = async (req, res) => {
  try {
    const { proyecto_id, colaborador_id } = req.body;

    if (!proyecto_id || !colaborador_id) {
      return res.status(400).json({
        error: "proyecto_id y colaborador_id son campos requeridos.",
      });
    }

    const result = await pool.query(
      "INSERT INTO proyecto_colaborador (proyecto_id, colaborador_id) VALUES ($1, $2) RETURNING *",
      [proyecto_id, colaborador_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear proyecto de colaborador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener un proyecto de colaborador por su ID
colaboradorProyectoCtrl.getProyectoColaborador = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("ID del proyecto de colaborador es requerido.");
    }

    const result = await pool.query(
      "SELECT * FROM proyecto_colaborador WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Proyecto de colaborador no encontrado.");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener proyecto de colaborador", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Obtener proyectos de colaborador por el ID del colaborador
colaboradorProyectoCtrl.getProyectosByColaborador = async (req, res) => {
  try {
    const { colaborador_id } = req.params;

    if (!colaborador_id) {
      return res.status(400).send("ID del colaborador es requerido.");
    }

    const result = await pool.query(
      "SELECT * FROM proyecto_colaborador WHERE colaborador_id = $1",
      [colaborador_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Proyectos de colaborador no encontrados.");
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener proyectos por colaborador", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Actualizar un proyecto de colaborador por su ID
colaboradorProyectoCtrl.editProyectoColaborador = async (req, res) => {
  try {
    const { id } = req.params;
    const { proyecto_id, colaborador_id } = req.body;

    if (!id) {
      return res.status(400).send("ID del proyecto de colaborador es requerido.");
    }

    const updateFields = [];
    const values = [];

    if (proyecto_id) {
      updateFields.push(`proyecto_id = $${values.length + 1}`);
      values.push(proyecto_id);
    }

    if (colaborador_id) {
      updateFields.push(`colaborador_id = $${values.length + 1}`);
      values.push(colaborador_id);
    }

    const updateQuery = `UPDATE proyecto_colaborador SET ${updateFields.join(
      ", "
    )} WHERE id = $${values.length + 1} RETURNING *`;

    const result = await pool.query(updateQuery, [...values, id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Proyecto de colaborador no encontrado.");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al editar proyecto de colaborador", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Eliminar un proyecto de colaborador por su ID
colaboradorProyectoCtrl.deleteProyectoColaborador = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("ID del proyecto de colaborador es requerido.");
    }

    const result = await pool.query(
      "DELETE FROM proyecto_colaborador WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Proyecto de colaborador no encontrado.");
    }

    res.json({
      message: "Proyecto de colaborador eliminado correctamente.",
      deletedProyectoColaborador: result.rows[0],
    });
  } catch (error) {
    console.error("Error al eliminar proyecto de colaborador", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = colaboradorProyectoCtrl;

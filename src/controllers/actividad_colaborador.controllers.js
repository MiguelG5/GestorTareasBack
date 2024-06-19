const pool = require("../database");

const actividadColaboradorCtrl = {};

// Obtener todos los enrolamientos
actividadColaboradorCtrl.getEnrolamientos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM actividad_colaborador");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener enrolamientos:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Obtener enrolamientos por ID de actividad
actividadColaboradorCtrl.getEnrolamientosByActividad = async (req, res) => {
  try {
    const { actividad_id } = req.params;

    if (!actividad_id) {
      return res.status(400).send("ID de la actividad es requerido.");
    }

    const result = await pool.query(
      "SELECT * FROM actividad_colaborador WHERE actividad_id = $1",
      [actividad_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Enrolamientos no encontrados para esta actividad.");
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener enrolamientos por actividad", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Obtener enrolamientos por ID de colaborador
actividadColaboradorCtrl.getEnrolamientosByColaborador = async (req, res) => {
  try {
    const { colaborador_id } = req.params;

    if (!colaborador_id) {
      return res.status(400).send("ID del colaborador es requerido.");
    }

    const result = await pool.query(
      "SELECT * FROM actividad_colaborador WHERE colaborador_id = $1",
      [colaborador_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Enrolamientos no encontrados para este colaborador.");
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener enrolamientos por colaborador", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Enrolar un colaborador en una actividad
actividadColaboradorCtrl.enrolarColaboradorEnActividad = async (req, res) => {
  try {
    const { colaborador_id, actividad_id } = req.body;

    if (!colaborador_id || !actividad_id) {
      return res.status(400).json({
        error: "colaborador_id y actividad_id son campos requeridos.",
      });
    }

    // Verificar si el colaborador y la actividad existen
    const colaboradorCheck = await pool.query(
      "SELECT * FROM colaboradores WHERE id = $1",
      [colaborador_id]
    );

    const actividadCheck = await pool.query(
      "SELECT * FROM actividades WHERE id = $1",
      [actividad_id]
    );

    if (colaboradorCheck.rows.length === 0) {
      return res.status(404).send("Colaborador no encontrado.");
    }

    if (actividadCheck.rows.length === 0) {
      return res.status(404).send("Actividad no encontrada.");
    }

    // Enrolar el colaborador a la actividad
    const result = await pool.query(
      "INSERT INTO actividad_colaborador (actividad_id, colaborador_id) VALUES ($1, $2) RETURNING *",
      [actividad_id, colaborador_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al enrolar colaborador en actividad:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = actividadColaboradorCtrl;

const pool = require("../database");

const pagosCtrl = {};

// Obtener todos los pagos
pagosCtrl.getPagos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pagos");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Crear un nuevo pago
pagosCtrl.createPago = async (req, res) => {
  try {
    const { user_id, plan } = req.body;

    if (!user_id || !plan) {
      return res.status(400).json({
        error: "user_id y plan son campos requeridos.",
      });
    }

    const result = await pool.query(
      "INSERT INTO pagos (user_id, plan) VALUES ($1, $2) RETURNING *",
      [user_id, plan]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear pago:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener un pago por su ID
pagosCtrl.getPago = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("ID del pago es requerido.");
    }

    const result = await pool.query(
      "SELECT * FROM pagos WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Pago no encontrado.");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener pago", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Obtener pagos por usuario
pagosCtrl.getPagosByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).send("ID del usuario es requerido.");
    }

    const result = await pool.query(
      "SELECT * FROM pagos WHERE user_id = $1",
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Pagos no encontrados.");
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener pagos por usuario", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Actualizar un pago por su ID
pagosCtrl.editPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { plan } = req.body;

    if (!id) {
      return res.status(400).send("ID del pago es requerido.");
    }

    if (!plan) {
      return res.status(400).json({
        error: "plan es un campo requerido.",
      });
    }

    const updateQuery = `UPDATE pagos SET plan = $1 WHERE id = $2 RETURNING *`;

    const result = await pool.query(updateQuery, [plan, id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Pago no encontrado.");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al editar pago", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Eliminar un pago por su ID
pagosCtrl.deletePago = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("ID del pago es requerido.");
    }

    const result = await pool.query(
      "DELETE FROM pagos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Pago no encontrado.");
    }

    res.json({
      message: "Pago eliminado correctamente.",
      deletedPago: result.rows[0],
    });
  } catch (error) {
    console.error("Error al eliminar pago", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = pagosCtrl;

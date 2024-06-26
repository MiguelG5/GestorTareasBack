const { Router } = require("express");
const router = Router();

const colaboradoresCtrl = require("../controllers/colaboradores.controllers");

router.get("/", colaboradoresCtrl.getColaboradores);

router.get("/user/:user_id", colaboradoresCtrl.getColaboradoresByUser);

router.put("/enrolar", colaboradoresCtrl.enrolarColaborador);

router.post("/details", colaboradoresCtrl.getColaboradoresByIds); // Nueva ruta para obtener colaboradores por IDs

app.put('/api/colaboradores/:id/email-and-password', colaboradoresCtrl.updateColaboradorEmailAndPassword);

module.exports = router;

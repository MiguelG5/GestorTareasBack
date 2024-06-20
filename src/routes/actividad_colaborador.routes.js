// actividad_colaborador.routes.js

const { Router } = require("express");
const router = Router();

const actividadColaboradorCtrl = require("../controllers/actividad_colaborador.controllers");

// Rutas para manejar los enrolamientos de colaboradores en actividades

router.get("/", actividadColaboradorCtrl.getEnrolamientos);

router.get("/actividad/:actividad_id", actividadColaboradorCtrl.getEnrolamientosByActividad);

router.get("/colaborador/:colaborador_id", actividadColaboradorCtrl.getEnrolamientosByColaborador);

router.post("/enrolar", actividadColaboradorCtrl.enrolarColaboradoresEnActividad);

module.exports = router;

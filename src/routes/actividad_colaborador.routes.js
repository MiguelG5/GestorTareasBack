const { Router } = require("express");
const router = Router();

const actividadColaboradorCtrl = require("../controllers/actividad_colaborador.controllers");

router.get("/", actividadColaboradorCtrl.getEnrolamientos);

router.get("/actividad/:actividad_id", actividadColaboradorCtrl.getEnrolamientosByActividad);

router.get("/colaborador/:colaborador_id", actividadColaboradorCtrl.getEnrolamientosByColaborador);

router.post("/enrolar", actividadColaboradorCtrl.enrolarColaboradoresEnActividad);

module.exports = router;

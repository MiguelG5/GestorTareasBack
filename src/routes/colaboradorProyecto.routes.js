const { Router } = require("express");
const router = Router();

const colaboradorProyectoCtrl = require("../controllers/colaboradorProyecto.controllers.js");

router.get("/", colaboradorProyectoCtrl.getProyectosColaboradores);

router.post("/", colaboradorProyectoCtrl.createProyectoColaborador);

router.get("/:id", colaboradorProyectoCtrl.getProyectoColaborador);

router.get("/colaborador/:colaborador_id", colaboradorProyectoCtrl.getProyectosByColaborador);

router.put("/:id", colaboradorProyectoCtrl.editProyectoColaborador);

router.delete("/:id", colaboradorProyectoCtrl.deleteProyectoColaborador);

module.exports = router;

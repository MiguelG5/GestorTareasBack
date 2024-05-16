const { Router } = require("express");
const router = Router();

const proyectoCtrl = require("../controllers/proyecto.controllers.js");

router.get("/", proyectoCtrl.getProyectos);

router.post("/", proyectoCtrl.createProyecto);

router.get("/:id", proyectoCtrl.getProyecto);

router.get("/:idUser", proyectoCtrl.getProyectosByUser);

router.put("/:id", proyectoCtrl.editProyecto);

router.delete("/:id", proyectoCtrl.deleteProyecto);

module.exports = router;

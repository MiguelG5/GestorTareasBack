const { Router } = require("express");
const router = Router();

const colaboradoresCtrl = require("../controllers/colaboradores.controllers");

router.get("/", colaboradoresCtrl.getColaboradores);

router.get("/user/:user_id", colaboradoresCtrl.getColaboradoresByUser);

router.put("/enrolar", colaboradoresCtrl.enrolarColaborador);

module.exports = router;

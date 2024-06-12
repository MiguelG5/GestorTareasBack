const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/user.routes"));
app.use("/api/proyectos", require("./routes/proyecto.routes"));
app.use("/api/actividades", require("./routes/actividades.routes"));
app.use("/api/pagos", require("./routes/pagos.routes"));

module.exports = app;

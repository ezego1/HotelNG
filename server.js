const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");

const app = express();

app.use(express.json());

const db = require("./config/keys").mongoURL;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/subject", require("./routes/api/subject"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));

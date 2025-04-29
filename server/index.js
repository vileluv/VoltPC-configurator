require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/index.js");
const { syncDatabase } = require("./models/index.js");
const ErrorHandler = require("./middleware/errorHandlerMiddleware.js");
const upload = require("./middleware/uploadMiddleware.js");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.post("/filestorage", upload.single("image"), (req, res) => {
    res.send({ message: "Success upload", path: req.file.path });
});
app.use("/filestorage", express.static(path.join(__dirname, "filestorage")));

app.use(express.json());
app.use("/api", router);

//Обработчик ошибок. Конечный middleware
app.use(ErrorHandler);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Success" });
});

const start = async () => {
    try {
        await syncDatabase();
        app.listen(PORT, () => {
            console.info(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.error("Error to start server!" + "\n-----------------\n" + e);
    }
};

start();

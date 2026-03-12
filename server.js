const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sensor", (req, res) => {

    const data = req.body;

    console.log("Received sensor data:", data);

    res.json({
        status: "ok"
    });

});

app.get("/", (req, res) => {
    res.send("Arduino Sensor Server Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
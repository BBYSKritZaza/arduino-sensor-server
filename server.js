const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// เก็บค่าล่าสุดของ sensor
let sensorData = {
    x: 0,
    y: 0,
    z: 0
};

// Arduino ส่งข้อมูลเข้ามา
app.post("/sensor", (req, res) => {

    sensorData = {
        x: req.body.x,
        y: req.body.y,
        z: req.body.z
    };

    console.log("Sensor:", sensorData);

    res.json({ status: "ok" });

});

// เว็บดึงข้อมูล
app.get("/data", (req, res) => {
    res.json(sensorData);
});

// หน้าเว็บ
app.get("/", (req, res) => {

    res.send(`
    <html>
    <head>
        <title>Sensor Monitor</title>
    </head>
    <body>

        <h1>GY-273 Sensor Data</h1>

        <p>X: <span id="x">0</span></p>
        <p>Y: <span id="y">0</span></p>
        <p>Z: <span id="z">0</span></p>

        <script>

        async function loadData(){

            const res = await fetch('/data');
            const data = await res.json();

            document.getElementById("x").innerText = data.x;
            document.getElementById("y").innerText = data.y;
            document.getElementById("z").innerText = data.z;

        }

        setInterval(loadData,1000);

        </script>

    </body>
    </html>
    `);

});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
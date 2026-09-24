const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config()

const express = require("express")
const mongoose = require('mongoose');
const userRoute = require("./routes/userRoutes.js")
const productRoute = require("./routes/productRoutes.js")

const atlas_string = process.env.ATLAS_STRING
const compass_string = process.env.COMPASS_STRING

mongoose.connect(atlas_string)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("Connection Error: ", err));


const app = express()
const port = process.env.PORT || 5555


app.use(express.json())

app.get('/', (req, res) => {
    res.send("Server is active")
})

app.use("/users", userRoute)
app.use("/products", productRoute)

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})
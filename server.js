const express = require("express")
const { connectMongoDB } = require("./config/connect")
const URL = require("./models/url.model")
const urlRoute = require("./routes/url.routes")

const app = express()
const PORT = 4000

connectMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('MongoDB Connected'))

app.use(express.json())

app.use("/url", urlRoute)


app.listen(PORT, () => console.log(`Server Startted At PORT: ${PORT}`))
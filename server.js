const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const { connectMongoDB } = require("./config/connect")
const URL = require("./models/url.model")

const {checkAuthorization, restrictTo} = require("./middlewares/auth.middleware")

const app = express()
const PORT = 4000

const urlRoute = require("./routes/url.routes")
const staticRoute = require("./routes/staticRouter.routes")
const userRoute = require("./routes/user.routes")

connectMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('MongoDB Connected'))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.get("/ssr", async(req,res) => {
    const allUrls = await URL.find({})
    return res.render('frontend', { urls: allUrls})
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


app.use("/url",urlRoute)
app.use("/",staticRoute)
app.use("/user", userRoute)


app.listen(PORT, () => console.log(`Server Started At PORT: ${PORT}`))
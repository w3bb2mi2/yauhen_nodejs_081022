const express = require("express");
const app = express();
const PORT = 3000;
const postApiRoutes = require("./routes/api-post-routes")
const methodOverride = require("method-override")
//вывод в логи
const morgan = require("morgan")

const postRouter = require("./routes/post-routes")
const contactRouter = require("./routes/contact-router")

const mongoose = require("mongoose")


const DB = "mongodb+srv://User2507:qwerty12345@cluster0.rbvei.mongodb.net/node-blog"

mongoose
    .connect(DB)
    .then(res => console.log("connected to mongo"))
    .catch(e => console.log(e))

app.set("view engine", "ejs")
app.listen(PORT, "localhost", (error) => {
    error ? console.log(error) : console.log(`server has been started on port: ${PORT}`)
})


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.static("styles"))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))


app.get("/about-us", (req, res) => {
    res.render("/contacts");
    console.log("Redirectint to /contacts")
});

app.use(postRouter)
app.use(contactRouter)
app.use(postApiRoutes)

app.use((req, res) => {
    res.render(404).sendFile(createPath("error"))
})
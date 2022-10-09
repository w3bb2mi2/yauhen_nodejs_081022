const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path")
const ejs = require("ejs")
const methodOverride = require("method-override")
//вывод в логи
const morgan = require("morgan")

const mongoose = require("mongoose")
const Post = require("./models/post")
const Contact = require("./models/contacts")
const DB = "mongodb+srv://User2507:qwerty12345@cluster0.rbvei.mongodb.net/node-blog"

mongoose
    .connect(DB)
    .then(res => console.log("connected to mongo"))
    .catch(e => console.log(e))

app.set("view engine", "ejs")
app.listen(PORT, "localhost", (error) => {
    error ? console.log(error) : console.log(`server has been started on port: ${PORT}`)
})

const createPath = page => path.resolve(__dirname, "ejs-views", `${page}.ejs`)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.static("styles"))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.get("/", (req, res) => {
    res.render(createPath("index"))
});
app.get("/contacts", (req, res) => {
    Contact
        .find()
        .then((contacts) => res.render(createPath("contacts"), { contacts }))
        .catch(error => {
            console.log(error);
            res.render(createPath("error"))
        })

});
app.get("/about-us", (req, res) => {
    res.render("/contacts");
    console.log("Redirectint to /contacts")
});
app.get("/posts", (req, res) => {
    Post
        .find()
        .sort({ createdAt: -1 })
        .then(posts => res.render(createPath("posts"), { posts }))
        .catch(error => console.log(error))
});
app.get("/edit/:id", (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => res.render(createPath("edit-post"), { post }))
})
app.get("/posts/:id", (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => res.render(createPath("post"), { post }))
})

app.delete("/posts/:id", (req, res) => {
    Post
        .findByIdAndDelete(req.params.id)
        .then(result => res.status(200))
})

app.get("/add-post", (req, res) => {
    res.render(createPath("add-post"))
})
app.post("/add-post", (req, res) => {
    const { title, author, text } = req.body;
    const post = new Post({ title, author, text })
    post
        .save()
        .then(() => res.redirect("/posts"))
        .catch(error => console.log(error))
})
app.put("/edit/:id", (req, res) => {
    const { title, author, text } = req.body;
    const {id}  = req.params;
    
Post
    .findByIdAndUpdate(`${id}`, { title, author, text })
    .then(()=> res.redirect(`/posts/${id}`))

})
app.use((req, res) => {
    res.render(404).sendFile(createPath("error"))
})
const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path")
const ejs = require("ejs")

app.set("view engine", "ejs")
app.listen(PORT, "localhost", (error) => {
    error ? console.log(error) : console.log(`server has been started on port: ${PORT}`)
})

const createPath = page => path.resolve(__dirname, "ejs-views", `${page}.ejs`)

app.get("/", (req, res)=>{
    res.render(createPath("index"))
});
app.get("/contacts", (req, res)=>{
    const contacts = [
        {name: "YouTube", link: "http://youtube.com"},
        {name: "Twitter", link: "http://twitter.com/YauhenKavalchuk"},
        {name: "GitHub", link: "http://twitter.com/YauhenKavalchuk"},
        {name: "GitHub", link: "http://twitter.com/YauhenKavalchuk"},
    ]
    res.render(createPath("contacts"),{contacts})
});
app.get("/about-us", (req, res)=>{
    res.render("/contacts");
    console.log("Redirectint to /contacts")
});
app.get("/posts", (req, res)=>{
    res.render(createPath("posts"))
});
app.get("/post/:id", (req, res)=>{
    res.render(createPath("post"))
})
app.get("/add-post", (req, res)=>{
    res.render(createPath("add-post"))
})
app.use((req, res)=>{
    res.render(404).sendFile(createPath("error"))
})
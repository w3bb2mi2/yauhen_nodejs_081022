const http = require("http");
const fs = require("fs")
const path = require("path")


const PORT = 3000;
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html")
    const createPath = page => path.resolve(__dirname, "views", `${page}.html`)

    let basePath = "";
    switch (req.url) {
        case "/": basePath = createPath("index");
            break;
        case "/about-us": 
            res.statusCode = 301;
            res.setHeader("Location", "/contacts");
            res.end();
            break;
        case "/contacts": basePath = createPath("contacts");
            break;
        default: basePath = createPath("error");
            res.statusCode = 400;
            break;
    }



    fs.readFile(basePath, (error, data) => {
        if (error) {
            console.log(error);
            res.end()
        } else {
            res.write(data);
            res.end()
        }
    })


});

server.listen(PORT, "localhost", (error) => {
    error ? console.log(error) : console.log(`server has been started on port: ${PORT}`)
})
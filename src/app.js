const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// __dirname = caminho do arquivo sem o nome 
// __filename = caminho completo do arquivo, com o nome do arquivo

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and view location
app.set("view engine", "hbs"); //padrão pasta views na pasta raiz do projeto
app.set("views", viewsPath); //muda diretório das views, padrão raiz/views
hbs.registerPartials(partialsPath); // partials = pedaços de view reutilizados

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//ira mostrar arquivo index.html
app.get("/", (req, res)=>{
    res.render("index", {
        title: "Weather",
        name: "Andrew Mead"
    });
});

app.get("/about", (req, res)=>{
    res.render("about", {
        title: "About me",
        name: "Andrew Mead"
    });
});

app.get("/help", (req, res)=>{
    res.render("help",{
        title: "Help",
        name: "Andrew Mead",
        message: "Hello"
    });
});

app.get("/example1", (req, res)=>{
    //express detecta objeto e converte para JSON
    //uso [] para passar array de objetos
    res.send([{
        name: "Andrew",
        age: 27
    }, {
        name: "Sarah",
        age: 27
    }]);
});

app.get("/example2", (req, res)=>{
    res.send("<h1>About page</h1>");
});

app.get("/weather", (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error
            });
        }
        
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error
                });
            }

            res.send({
                forecast: forecastData,
                location,
                adress: req.query.address
            });

        });

    });

});

app.get("/products", (req, res)=>{
    if(!req.query.search){
        //return vai parar função
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res)=>{
    res.render("404", {
        title: "404",
        name: "Andrew Mead",
        errorMessage: "Help article not found."
    });
});

// * = wildcard tudo
app.get("/*", (req, res)=>{
    res.render("404", {
        title: "404",
        name: "Andrew Mead",
        errorMessage: "Page not found."
    });
});

app.listen(3000, ()=>{
    console.log("Server is up on port 3000.");
});
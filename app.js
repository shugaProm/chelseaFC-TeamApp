const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const expressHbs = require("express-handlebars");
const expressFileupload = require("express-fileupload");
const reqFlash = require("req-flash");
const path = require("path");
const logger = require("morgan");
const app = express();

const port = 3030;

const chelseaDatabase = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "chelseadb"
});

chelseaDatabase.connect(err => {
    if (err) {
        throw err
     } console.log("connected to database");
});


global.chelseaDatabase = chelseaDatabase;


app.set("port", port);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
    extended: false
}));

app.engine(
	".hbs",
	expressHbs({
		defaultLayout: "layout",
		extname: ".hbs"
	})
);
app.set("view engine", ".hbs");

app.use(express.static(path.join(__dirname, "public")));

app.use(expressFileupload());


app.listen(port, () => {
    console.log(`server running on: ${port}`);
});

app.use(logger("short"));


var {
    getHomePage
} = require("./controller/indexController");

var {
    saveNewPlayer,
    getPlayerForEdit,
    deletePlayer
} = require("./controller/playerController");

app.get('/', getHomePage);

app.get('/edit-player/:id', getPlayerForEdit);

app.post('/save-player', saveNewPlayer);

app.get('/delete-player/:id', deletePlayer);

app.get('/contact', (req, res) => {
    res.render('contact');
});
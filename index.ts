import express, { Express} from "express";
import dotenv from "dotenv"
//import bodyParser from "body-parser";
import methodOverride from "method-override"
import *as database from "./config/database"
import adminRoutes from "./routes/admin/index.route";
import clientRoutes from "./routes/client/index.route";
import { systemConfig } from "./config/config";
const cookieParser = require('cookie-parser');
import path from "path"

dotenv.config()

database.connect();

const app: Express = express();
const port: number|string =process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));


app.use(express.static(`${__dirname}/public`));


// Sử dụng cookie-parser đúng cách
app.use(cookieParser("JHGJKLKLGFLJK"));


app.set("views",`${__dirname}/views`);
app.set("view engine","pug");

//tinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname,"node_modules","tinymce"))
)
//tinyMCE

//app local variabels
app.locals.prefixAdmin=systemConfig.prefixAdmin;

//client route
clientRoutes(app)
//admin route
adminRoutes(app)


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

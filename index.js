import { initServer } from "./configs/app.js";
import { config } from "dotenv"; 
import { connect } from "./configs/mongo.js";
import createCategories from "./helpers/create.category.js";
config()
initServer()
connect()
createCategories()

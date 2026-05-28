import { adminFeatch, userLoged} from "./UserLoged";


const express =require("express")

const logedUserRoutes = express.Router();


logedUserRoutes.route("/userFeatch").get(userLoged)
logedUserRoutes.route("/adminFeatch").get(adminFeatch)


export default logedUserRoutes;




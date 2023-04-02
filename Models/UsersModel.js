import { Sequelize } from "sequelize";
import db from "../Conifg/db.js";

const { DataTypes} = Sequelize

const Users = db.define(
    "ride_users",
    {
        username:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        fname:{
            type: DataTypes.STRING
        },
        lname:{
            type: DataTypes.STRING
        },
        pref:{
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        }
    },{
        timestamps:false,
    }
)

export default Users
import {Sequelize} from "sequelize";


export const Base = new Sequelize("nodejsTest", "root", "root", {
    host: "localhost",
    dialect: "mariadb"
});
Base.sync();

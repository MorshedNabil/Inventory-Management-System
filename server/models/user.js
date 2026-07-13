import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  role: {
    type: DataTypes.ENUM("admin", "seller"),
    defaultValue: "seller",
  },
});

export default User;

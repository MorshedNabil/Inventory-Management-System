import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js";
import Supplier from "./Supplier.js";
import Product from "./Product.js";

const PurchaseOrder = sequelize.define("PurchaseOrder", {
  purchaseDate: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  cost: { type: DataTypes.FLOAT, allowNull: false },
  paymentStatus: {
    type: DataTypes.ENUM("Paid", "Unpaid", "Partial"),
    allowNull: false,
    defaultValue: "Unpaid",
  },
});

PurchaseOrder.belongsTo(Supplier, { foreignKey: "supplierId", as: "supplier" });
Supplier.hasMany(PurchaseOrder, { foreignKey: "supplierId", as: "purchaseOrders" });

PurchaseOrder.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(PurchaseOrder, { foreignKey: "productId", as: "purchaseOrders" });

export default PurchaseOrder;

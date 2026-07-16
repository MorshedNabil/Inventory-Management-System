import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import AdminDashboard from "./components/pages/AdminDashboard";
import Products from "./components/pages/Products";
import Profile from "./components/pages/Profile";
import Sales from "./components/pages/Sales";
import Suppliers from "./components/pages/Suppliers";
import Purchase from "./components/pages/Purchase";
import RootLayout from "./components/layout/RootLayout";
import Root from "./components/Root";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Categories from "./components/pages/Categories";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Root />} />
          <Route path="login" element={<Login />} />
          <Route
            path="admindashboard"
            element={
              <ProtectedRoutes requireRole={"admin"}>
                <AdminDashboard />
              </ProtectedRoutes>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoutes requireRole={["admin"]}>
                <Profile />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/suppliers"
            element={
              <ProtectedRoutes requireRole={["admin"]}>
                <Suppliers />
              </ProtectedRoutes>
            }
          />

          <Route path="sales" element={<Sales />} />
          <Route
            path="/purchase"
            element={
              <ProtectedRoutes requireRole={["admin"]}>
                <Purchase />
              </ProtectedRoutes>
            }
          />
          <Route
            path="unauthorized"
            element={
              <h1 className="font-bold text-5xl text-red-800 mt-20 mx-auto">
                Unauthorized Access
              </h1>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

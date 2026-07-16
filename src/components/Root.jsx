import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



const Root=()=>{
    const {user} = useAuth();
    const navigate = useNavigate();

   useEffect(() => {
  if (user) {
    // Check if the user is authenticated and redirect accordingly
    if (user.role === "admin") {
      navigate("admindashboard");
    } else if (user.role === "seller") {
      // TODO: no seller-facing dashboard exists yet — pick a real destination for seller-role users.
      navigate("unauthorized");
    } else {
      navigate("login");
    }
  }
  else{
     navigate("login");
  }
}, [user, navigate]);

return null;
}

export default Root;
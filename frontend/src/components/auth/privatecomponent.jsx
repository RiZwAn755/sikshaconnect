import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function PrivateComponent() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    if (!userid) {
      setIsAuthorized(false);
      navigate("/landing");
      return;
    }

    axios
      .get(`${baseUrl}/api/auth/refresh`, { withCredentials: true })
      .then(() => setIsAuthorized(true))
      .catch(() => {
        setIsAuthorized(false);
        localStorage.removeItem("userid");
        navigate("/landing");
      });
  }, [navigate]);

  if (isAuthorized === null)  return null;

  return isAuthorized ? <Outlet /> : alert("login karo pahle");
}

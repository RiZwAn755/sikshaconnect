import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const isTokenValid = (accessToken) => {
    if (!accessToken || accessToken === "undefined") return false;
    try {
        const payload = accessToken.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        const expMs = (decoded.exp || 0) * 1000;
        return expMs > Date.now();
    } catch (e) {
        return false;
    }
};

const PrivateComponent = () => {
    const accessToken = Cookies.get("token");
    const valid = isTokenValid(accessToken);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        if (!valid && !alertShown) {
            
            alert("login karo pahle");
            setAlertShown(true);
            setShouldRedirect(true);
        }
    }, [valid, alertShown]);

    if (valid) return <Outlet />;
    if (shouldRedirect) return <Navigate to="/login" replace />;
    return null;
};

export default PrivateComponent;
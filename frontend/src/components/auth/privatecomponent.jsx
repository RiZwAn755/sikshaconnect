import {Navigate , Outlet} from 'react-router-dom';
import Cookies from "js-cookie";

const istokenValid = (accessToken) =>{
   if(!accessToken ||accessToken === 'undefined')return false;
    const expTime = JSON.parse(atob(accessToken.split('.')[1]));
    const ex = expTime.exp*1000;

    if(ex <= Date.now()){
        return false;
    }
    else return true;
}

const PrivateComponent = () =>{
     const accessToken = Cookies.get("token");
     return  istokenValid(accessToken) ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateComponent ;
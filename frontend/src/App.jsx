import Login from "./components/auth/login"
import Register from "./components/auth/register"
import Home from "./components/home/home"
import ForgotPassword from "./components/auth/forgotpassword"
import ResetPassword from "./components/auth/resetpassword"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import PayButton from "./components/payments/paybutton"
import Nav from "./components/utils/navbar"
import Footer from "./components/utils/footer"
import PrivateComponent from "./components/auth/privatecomponent"

function App() {
  return (
      <Router>
      <Nav />
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Register/>} />
        <Route path='/' element={<Home/>} />
        <Route path ="forgot-pass" element ={<ForgotPassword/>}/>
        <Route path ="/reset-password/:token" element ={<ResetPassword/>}/>

       < Route element = {<PrivateComponent/>}>
                <Route path='/paybutton' element={<PayButton amountvalue={25} />} />
       </Route>

      </Routes>
      <Footer />
    </Router>
  )
}

export default App;

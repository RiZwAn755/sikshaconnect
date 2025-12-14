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
import Landing from "./components/utils/landing"
import NotFound from "./components/utils/404"
import FriendList from "./components/friends/friendlist"
import Profile from "./components/user/profile"
import Logout from "./components/auth/logout"

function App() {
  return (
      <Router>
      <Nav />
      <Routes>
        <Route path = '/landing' element= {<Landing/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Register/>} />
        <Route path ="/forgot-pass" element ={<ForgotPassword/>}/>
        <Route path ="/reset-password/:token" element ={<ResetPassword/>}/>
        <Route path ="/*" element ={<NotFound/>}/>

       < Route element = {<PrivateComponent/>}>
                <Route path='/paybutton' element={<PayButton amountvalue={25} />} />
                 <Route path='/' element={<Home/>} />
                 <Route path='/friends' element={<FriendList/>} />
                 <Route path = '/profile' element = {<Profile/>} />
                 <Route path="/logout" element = {<Logout/>} />
       </Route>

      </Routes>
      <Footer />
    </Router>
  )
}

export default App;

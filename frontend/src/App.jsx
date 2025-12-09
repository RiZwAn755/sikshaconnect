import Login from "./components/auth/login"
import Register from "./components/auth/register"
import Home from "./components/home/home"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import PayButton from "./components/payments/paybutton"
import Nav from "./components/utils/navbar"
import Footer from "./components/utils/footer"

function App() {
  return (
    <Router>
      
      <Nav />
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Register/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/paybutton' element={<PayButton amountvalue={25} />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App;

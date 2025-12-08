import Login from "./components/auth/login"
import Register from "./components/auth/register"
import Home from "./components/home/home"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
function App() {

  return (
  
    <Router>
        <Routes>
          <Route path ='/login' element = {<Login/>} />
          <Route path = "/signup" element = {<Register/>} />
          <Route path = "/" element = {<Home/>} />

        </Routes>
    </Router>
        
  )
}

export default App

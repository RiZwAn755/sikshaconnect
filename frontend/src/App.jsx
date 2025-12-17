import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";

import Layout from "./components/layout/layout";
import PrivateComponent from "./components/auth/privatecomponent";

// Auth
const Login = lazy(() => import("./components/auth/login"));
const Register = lazy(() => import("./components/auth/register"));
const ForgotPassword = lazy(() => import("./components/auth/forgotpassword"));
const ResetPassword = lazy(() => import("./components/auth/resetpassword"));
const Logout = lazy(() => import("./components/auth/logout"));

// App pages
const Home = lazy(() => import("./components/home/home"));
const FriendList = lazy(() => import("./components/friends/friendlist"));
const Profile = lazy(() => import("./components/user/profile"));
const PayButton = lazy(() => import("./components/payments/paybutton"));

// Utils
const Landing = lazy(() => import("./components/utils/landing"));
const NotFound = lazy(() => import("./components/utils/404"));


function App() {
  return (
    <Router>
      <Routes>
        {/* Layout + Suspense boundary */}
        <Route element={<Layout />}>
      
          {/* Public routes */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgot-pass" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected routes */}
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<FriendList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/paybutton" element={<PayButton amountvalue={25} />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;

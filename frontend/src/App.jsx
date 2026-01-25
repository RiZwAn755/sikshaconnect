import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";

import Layout from "./components/layout/layout";
import PrivateComponent from "./components/auth/privatecomponent";

const Login = lazy(() => import("./components/auth/login"));
const Register = lazy(() => import("./components/auth/register"));
const ForgotPassword = lazy(() => import("./components/auth/forgotpassword"));
const ResetPassword = lazy(() => import("./components/auth/resetpassword"));
const Logout = lazy(() => import("./components/auth/logout"));

const Home = lazy(() => import("./components/home/home"));
const FriendList = lazy(() => import("./components/friends/friendlist"));
const Profile = lazy(() => import("./components/user/profile"));
const PayButton = lazy(() => import("./components/payments/paybutton"));

const Landing = lazy(() => import("./components/utils/landing"));
const NotFound = lazy(() => import("./components/utils/404"));
const PendingRequests = lazy(() => import("./components/friends/recievedrequests"));
const Friendrequests = lazy(() => import("./components/friends/sentrequests"));
const FriendshipDetails = lazy(() => import("./components/friends/friendshipdetails"));




function App() {
  return (
    <Router>
      <Routes>
        {/* for lazy load  */}
        <Route element={<Layout />}> 

          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgot-pass" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
          
           <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<FriendList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/paybutton" element={<PayButton amountvalue={25} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/pendingrequests" element={<PendingRequests />} />
            <Route path="/friendrequests" element={<Friendrequests />} />
            <Route path="/friendlist" element={<FriendList />} />
            <Route path="/friendship/:friendshipId" element={<FriendshipDetails />} />

          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;

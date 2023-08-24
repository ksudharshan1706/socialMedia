import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import "./index.css";
import Search from "./components/search/Search.js";
import { AuthContext } from "./context/Authcontext";
import Messenger from "./pages/messenger/Messenger";
import ProfileFriend from "./pages/profile/ProfileFriend";
function App() {
  const { user } = useContext(AuthContext);
  // console.log(user);
  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route
          path="/register"
          element={user ? <Navigate replace tos="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/messenger"
          element={user ? <Messenger /> : <Navigate replace to="/" />}
        />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profilefriend/:userId" element={<ProfileFriend />} />
        <Route path="/searchpage" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;

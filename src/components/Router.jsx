import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

export default function AppRouter({ isLoggedIn, userObj }) {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />} />
            <Route exact path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
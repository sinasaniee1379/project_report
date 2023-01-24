import { Navigate, Route, Routes } from "react-router";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Client from "./pages/client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import RequiredAuth from "./routes/RequiredAuth";
import NotFound from "./pages/notFound";
import { HashRouter } from "react-router-dom";

function App() {
  const { isDark } = useSelector((state) => state.user);
  const { isAuthenticated, isAdmin } = useSelector((state) => state.user);
  const html = document.querySelector("html");
  if (isDark) {
    html.className = "dark";
  } else {
    html.className = "";
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          !isAuthenticated ? (
            <Login />
          ) : isAdmin ? (
            <Navigate replace to={"/admin"} />
          ) : (
            <Navigate replace to={"/client"} />
          )
        }
      />
      <Route element={<RequiredAuth />}>
        <Route path="/">
          <Route path="/client" element={<Client />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

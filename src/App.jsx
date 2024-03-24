// import "./App.css";
import { Header, Footer } from "./components/index.js";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js";
import { logout, login } from "./store/authSlice.js";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? null : (
    <div className="min-h-screen h-full flex flex-wrap bg-slate-600 content-between">
      <div className="min-h-screen w-full flex flex-col flex-nowrap justify-between">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

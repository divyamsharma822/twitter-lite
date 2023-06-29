import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import LoginForm from "./components/User/LoginForm";
import SignUpForm from "./components/User/SignUpForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";

function App() {
    return (
        <>
            <ToastContainer />
            <React.Suspense fallback={<Loader />}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/signup' element={<SignUpForm />} />
                    <Route path='/login' element={<LoginForm />} />
                </Routes>
            </React.Suspense>
        </>
    );
}

export default App;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UnAuthorisedAccess = ({ message }) => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.warning(message ? message : "UnAuthorised Access", {
            position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
            navigate("/login");
        }, 5000);
    }, []);

    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen font-bold text-center text-md md:text-4xl'>
            {message ? <div>{message}</div> : <div>401 UnAuthorised Access. Login Again !</div>}
            <div className='text-md text-slate-600'>Redirecting to Login Page...</div>
        </div>
    );
};

export default UnAuthorisedAccess;

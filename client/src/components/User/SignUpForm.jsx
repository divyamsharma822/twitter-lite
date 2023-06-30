import React from "react";
import { BsTwitter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useRegisterMutation } from "../../api/user";

const SignUpForm = () => {
    const navigate = useNavigate();
    const [register] = useRegisterMutation();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            username: "",
            password: "",
        },
        onSubmit: (values) => {
            register({
                name: values.name,
                email: values.email,
                username: values.username,
                password: values.password,
            })
                .unwrap()
                .then((payload) => {
                    navigate("/home");
                    toast.success("SignUp Successful !", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                })
                .catch((error) => {
                    toast.error(error.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    formik.resetForm();
                });
        },
    });

    return (
        <>
            <ToastContainer />
            <div className='flex items-start justify-center w-screen h-screen bg-[#f4f7ff] overflow-scroll'>
                <div className='md:min-w-[500px] max-w-[525px] text-center bg-white rounded-lg relative py-12 px-5 sm:px-12 md:px-[60px] w-full my-3 mx-3 md:mx-auto'>
                    <div className='mb-10 text-center md:mb-16'>
                        <a href='/' className='flex flex-col items-center gap-3 mx-auto'>
                            <BsTwitter size={50} className='text-[#00b4db] m-2 md:m-4' />
                            <div className='text-lg font-medium text-black md:text-4xl bg-clip-text min-w-fit'>Join Twitter today</div>
                        </a>
                    </div>
                    <form className='w-full overflow-y-auto h-max' onSubmit={formik.handleSubmit}>
                        <div className='mb-6'>
                            <input
                                type='name'
                                placeholder='Name'
                                className='w-full rounded-md border bordder-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary'
                                {...formik.getFieldProps("name")}
                            />
                        </div>
                        <div className='mb-6'>
                            <input
                                type='username'
                                placeholder='Username'
                                className='w-full rounded-md border bordder-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary'
                                {...formik.getFieldProps("username")}
                            />
                        </div>
                        <div className='mb-6'>
                            <input
                                type='email'
                                placeholder='Email'
                                className='w-full rounded-md border bordder-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary'
                                {...formik.getFieldProps("email")}
                            />
                        </div>
                        <div className='mb-6'>
                            <input
                                type='password'
                                placeholder='Password'
                                className='w-full rounded-md border bordder-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary'
                                {...formik.getFieldProps("password")}
                            />
                        </div>
                        <div className='mb-10'>
                            <input
                                type='submit'
                                value='Sign In'
                                className='w-full rounded-md border bordder-[#E9EDF4] py-2 px-5 bg-[#00b4db] text-white text-base cursor-pointer font-bold hover:bg-[#00b3db94] outline-none focus-visible:shadow-none focus:border-primary'
                            />
                        </div>
                    </form>
                    <div className='text-center'>
                        Have an account already? &nbsp;
                        <span className='text-[#00b4db] cursor-pointer' onClick={() => navigate("/login", { replace: true })}>
                            Log In
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;

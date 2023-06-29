import React from "react";
import { BsTwitter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useLoginMutation } from "../../api/user";
import { toast } from "react-toastify";

const LoginForm = () => {
    const navigate = useNavigate();
    const [login] = useLoginMutation();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            login({
                email: values.email,
                password: values.password,
            })
                .unwrap()
                .then((payload) => {
                    window.sessionStorage.setItem("token",payload.token);
                    navigate("/");
                    toast.success("Login Successful !", {
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
            {/* <ToastContainer /> */}
            <div className='flex items-center justify-center w-screen h-screen bg-[#f4f7ff]'>
                <div className='md:min-w-[500px] max-w-[525px] text-center bg-white rounded-lg relative overflow-hidden py-12 px-5 sm:px-12 md:px-[60px] w-full mx-3 md:mx-auto'>
                    <div className='mb-10 text-center md:mb-16'>
                        <a href='/' className='flex flex-col items-center gap-3 mx-auto'>
                            <BsTwitter size={50} className='text-[#00b4db] m-2 md:m-4' />
                            <div className='text-lg font-medium text-black md:text-4xl bg-clip-text min-w-fit'>Sign in to Twitter</div>
                        </a>
                    </div>
                    <form className='w-full' onSubmit={formik.handleSubmit}>
                        <div className='mb-6'>
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                className='w-full rounded-md border bordder-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary'
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        </div>
                        <div className='mb-6'>
                            <input
                                type='password'
                                name='password'
                                placeholder='Password'
                                className='w-full rounded-md border bordder-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary'
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        </div>
                        <div className='mb-10'>
                            <input
                                type='submit'
                                value='Log In'
                                className='w-full rounded-md border bordder-[#E9EDF4] py-2 px-5 bg-[#00b4db] text-white text-base cursor-pointer font-bold hover:bg-[#00b3db94] outline-none focus-visible:shadow-none focus:border-primary'
                            />
                        </div>
                    </form>
                    <div className='text-center'>
                        Don't have an account?{" "}
                        <span className='text-[#00b4db] cursor-pointer' onClick={() => navigate("/signup", { replace: true })}>
                            Sign up
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;

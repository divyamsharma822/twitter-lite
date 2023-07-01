import React from "react";
import { BsTwitter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
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
            formik.setSubmitting(true);
            register({
                name: values.name,
                email: values.email,
                username: values.username,
                password: values.password,
            })
                .unwrap()
                .then((payload) => {
                    formik.setSubmitting(false);
                    navigate("/home");
                    window.sessionStorage.setItem("token", payload.token);
                    toast.success("SignUp Successful !", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                })
                .catch((error) => {
                    formik.setSubmitting(false);
                    toast.error(error.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    formik.resetForm();
                });
        },
    });

    return (
        <>
            <div className='flex items-start justify-center w-screen h-screen bg-[#1b222c] overflow-scroll'>
                <div className='md:min-w-[500px] max-w-[525px] text-center bg-[#12151c] rounded-lg relative py-12 px-5 sm:px-12 md:px-[60px] w-full my-3 mx-3 md:mx-auto'>
                    <div className='mb-10 text-center md:mb-16'>
                        <a href='/' className='flex flex-col items-center gap-3 mx-auto'>
                            <BsTwitter size={50} className='text-[#00b4db] m-2 md:m-4' />
                            <div className='text-lg font-medium text-white md:text-4xl bg-clip-text min-w-fit'>Join Twitter today</div>
                        </a>
                    </div>
                    <form className='w-full overflow-y-auto h-max' onSubmit={formik.handleSubmit}>
                        <div className='mb-6'>
                            <input
                                type='name'
                                placeholder='Name'
                                className='form-input'
                                {...formik.getFieldProps("name")}
                            />
                        </div>
                        <div className='mb-6'>
                            <input
                                type='username'
                                placeholder='Username'
                                className='form-input'
                                {...formik.getFieldProps("username")}
                            />
                        </div>
                        <div className='mb-6'>
                            <input
                                type='email'
                                placeholder='Email'
                                className='form-input'
                                {...formik.getFieldProps("email")}
                            />
                        </div>
                        <div className='mb-6'>
                            <input
                                type='password'
                                placeholder='Password'
                                className='form-input'
                                {...formik.getFieldProps("password")}
                            />
                        </div>
                        <div className='mb-10'>
                            <input
                                type='submit'
                                disabled={formik.isSubmitting}
                                value='Sign In'
                                className='w-full rounded-md py-2 px-5 bg-[#00b3dbcc] text-white text-base cursor-pointer font-bold hover:bg-[#00b3db94] outline-none focus-visible:shadow-none focus:border-primary'
                            />
                        </div>
                    </form>
                    <div className='text-center text-white'>
                        Have an account already ? &nbsp;
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

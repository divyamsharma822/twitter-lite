import React, { useEffect, useRef, useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import { RxAvatar } from "react-icons/rx";
import { BiSolidDownArrow } from "react-icons/bi";
import { useLogoutMutation } from "../api/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader/Loader";

const Header = ({ data, isLoading, isFetching }) => {
    const [dropdown, setdropdown] = useState(false);
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const ref = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setdropdown(false);
            }
        }

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);

    const handleLogout = async () => {
        setdropdown(false);
        await logout()
            .unwrap()
            .then((payload) => {
                window.sessionStorage.clear();
                navigate("/login");
                toast.success("Logout Successful !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((error) => {
                toast.error(error.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    return (
        <div className='sticky z-10 bg-[#06141d] top-0 flex items-center justify-between w-full px-5 py-4 md:px-10'>
            <div className='flex items-center gap-7'>
                <BsTwitter size={35} className='text-[#1da1f2]' />
                <div className='hidden md:flex gap-2 rounded-[14px] bg-[#1b2730] items-center p-2'>
                    <FaHashtag size={20} className='text-[#808f9d] mx-2' />
                    <input
                        type={"text"}
                        placeholder='Explore'
                        className=' h-6 w-full font-normal py-2 bg-transparent placeholder:text-[#808f9d] text-white text-base cursor-pointer outline-none focus-visible:shadow-none focus:border-0'
                    />
                </div>
            </div>
            <div className='flex items-center justify-end gap-7'>
                {isLoading || isFetching ? (
                    <Loader />
                ) : (
                    <div
                        className='relative bg-[#2a3843] rounded-full pl-2 pr-4 gap-3 py-1 flex items-center justify-between text-[#c7d6e5] cursor-pointer'
                        onClick={() => setdropdown(!dropdown)}
                        ref={ref}>
                        <RxAvatar size={30} />
                        <div className='font-medium truncate w-[120px]'>{data?.name && data?.name}</div>
                        <BiSolidDownArrow size={10} />
                        {dropdown && (
                            <div className='absolute top-[110%] right-0 w-full bg-[#2a3843] flex flex-col gap-0 rounded-xl p-2'>
                                <div className='w-full p-2 rounded-md hover:bg-[#1da1f2] hover:text-white font-medium' onClick={() => navigate("/")}>
                                    Profile
                                </div>
                                <div className='w-full p-2 rounded-md hover:bg-[#1da1f2] hover:text-white font-medium' onClick={handleLogout}>
                                    Log Out
                                </div>
                            </div>
                        )}
                    </div>
                )}
                <CgMenuGridO size={35} className='text-white' />
            </div>
        </div>
    );
};

export default Header;

import React, { useState } from "react";
import { TbPhotoFilled } from "react-icons/tb";
import { AiFillPlayCircle } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { useCreateTweetMutation } from "../api/tweet";
import { toast } from "react-toastify";

const FeedInput = () => {
    const [createTweet] = useCreateTweetMutation();
    const [text, settext] = useState("");

    const handleSubmit = () => {
        if (text) {
            createTweet({ description: text })
                .unwrap()
                .then((payload) => {
                    toast.success("Created", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    settext("");
                })
                .catch((error) => {
                    toast.error(error.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    settext("");
                });
        } else {
            toast.error("Field can't be empty", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
            <div className='w-full rounded-xl bg-[#1b2730] p-3 text-[#939ba7] mb-3'>
                <input
                    type={"text"}
                    placeholder={"What's Happening?"}
                    className='bg-[#28343e] text-white p-4 w-full rounded-lg resize-none hover:resize focus:resize focus:ring-[#1da0f272] ring-1 focus:outline-none'
                    rows={2}
                    value={text}
                    maxLength={260}
                    onChange={(e) => settext(e.target.value)}
                />
                <div className='flex flex-wrap justify-around mt-2 md:mt-3 md:mb-3'>
                    <div className='flex items-center gap-3 py-2 md:px-8 md:py-3 rounded-full md:[border:2px_solid_#2f3d49] hover:shadow-[0_0_10px_#20da97] max-w-[150px] md:flex-1 cursor-pointer'>
                        <TbPhotoFilled size={25} className='drop-shadow-[0_0_10px_#20da97] text-[#20da9697]' />
                        <div className='hidden text-sm font-medium md:flex'>Photo</div>
                    </div>
                    <div className='flex items-center gap-3 py-2 md:px-8 md:py-3 rounded-full md:[border:2px_solid_#2f3d49] hover:shadow-[0_0_10px_#3b82f6] max-w-[150px] md:flex-1 cursor-pointer'>
                        <AiFillPlayCircle size={25} className='drop-shadow-[0_0_10px_#3b82f6] text-[#3b83f6c4]' />
                        <div className='hidden text-sm font-medium md:flex'>Video</div>
                    </div>
                    <div className='flex items-center gap-3 py-2 md:px-5 md:py-3 rounded-full md:[border:2px_solid_#2f3d49] hover:shadow-[0_0_10px_#f36667] max-w-[150px] md:flex-1 cursor-pointer'>
                        <FaUpload size={25} className='drop-shadow-[0_0_10px_#f36667] text-[#f36666d1]' />
                        <div className='hidden text-sm font-medium md:flex'>Attachment</div>
                    </div>
                    <div className='flex items-center gap-3 py-2 md:px-7 md:py-3 rounded-full md:[border:2px_solid_#2f3d49] hover:shadow-[0_0_10px_#f9c052] max-w-[150px] md:flex-1 cursor-pointer'>
                        <BsCalendar2WeekFill size={25} className='drop-shadow-[0_0_10px_#f9c052] text-[#f9c152cd]' />
                        <div className='hidden text-sm font-medium md:flex'>Schedule</div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FeedInput;

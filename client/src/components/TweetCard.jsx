import React, { useEffect, useRef, useState } from "react";
import { formatTimeToNow } from "../utils/utils";
import { AiFillHeart } from "react-icons/ai";
import { FaRetweet, FaCommentDots } from "react-icons/fa";
import { PiShareNetworkBold } from "react-icons/pi";
import { SlOptions } from "react-icons/sl";
import { BsDot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDeleteTweetMutation, useEditTweetMutation } from "../api/tweet";
import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";

const TweetCard = ({ tweet }) => {
    const [readMore, setreadMore] = useState(false);
    const [dropdown, setdropdown] = useState(false);
    const [edit, setedit] = useState(false);
    const [editedText, seteditedtext] = useState(tweet.description);
    const [deleteTweet] = useDeleteTweetMutation();
    const [editTweet] = useEditTweetMutation();
    const navigate = useNavigate();
    const optionsref = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (optionsref.current && !optionsref.current.contains(event.target)) {
                setdropdown(false);
            }
        }

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [optionsref]);

    const textTruncate = (text) => {
        if (text.length > 200 && !readMore) {
            return (
                <>
                    <div className={`mt-3 mb-2 transition duration-300 cursor-text text-[#d4d4d4] leading-[20px] tracking-[0.3px] text-[14px] md:text-[16px]`}>{text.substr(0, 200)}...</div>
                    <div className='text-start my-1 text-[#1da1f2] cursor-pointer' onClick={() => setreadMore(true)}>
                        Read more
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className={`mt-3 mb-2 transition duration-300 cursor-text text-[#d4d4d4] leading-[20px] tracking-[0.3px] text-[14px] md:text-[16px]`}>{text}</div>
                    {text.length > 200 && (
                        <div className='text-start text-[#1da1f2] cursor-pointer my-1' onClick={() => setreadMore(false)}>
                            Read less
                        </div>
                    )}
                </>
            );
        }
    };

    const handleDelete = () => {
        deleteTweet({ tweetId: tweet._id })
            .unwrap()
            .then((payload) => {
                navigate("/home");
                toast.success("Deleted !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((error) => {
                toast.error(error.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };

    const handleEdit = (id) => {
       
            editTweet({ body: editedText, tweetId: id })
                .unwrap()
                .then((payload) => {
                    toast.success("Edit Successful", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setedit(false);
                })
                .catch((error) => {
                    toast.error(error.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setedit(false);
                });
      
    };

    return (
        <div className='relative w-full rounded-xl bg-[#1b2730] p-3 text-[#939ba7]'>
            <div className='flex items-start gap-4'>
                <img src='https://picsum.photos/200' alt='' className='w-10 rounded-full md:mt-1 md:w-[50px] aspect-square' width={200} />
                <div className='flex flex-col items-start w-full'>
                    <div className='flex flex-col items-start gap-1 md:items-center md:gap-3 md:flex-row'>
                        <div className='flex items-center gap-0'>
                            <div className='font-medium text-white cursor-pointer text-md md:text-xl'>{tweet?.author?.name}</div>
                            <BsDot className='flex md:hidden' />
                            <div className='flex text-sm md:hidden'>{formatTimeToNow(new Date(tweet.createdAt))}</div>
                        </div>
                        <div className='text-md'>@{tweet?.author?.username}</div>
                    </div>
                    <div className='hidden text-sm md:block'>{formatTimeToNow(new Date(tweet.createdAt))}</div>
                    {!edit ? (
                        textTruncate(tweet?.description)
                    ) : (
                        <div className='relative flex items-end w-full gap-2 mt-3'>
                            <textarea rows={5} value={editedText} onChange={(e) => seteditedtext(e.target.value)} className='flex flex-grow p-2 rounded-md bg-[#0000005a] ring-white ring-2' />
                            <div className='absolute flex flex-row items-center gap-1 px-3 py-2 bg-green-600 rounded-md cursor-pointer right-2 bottom-2 h-fit hover:scale-[0.95]' onClick={() => handleEdit(tweet._id)}>
                                <TiTick size={20} className='text-white rounded-md' />
                                <div className='font-medium text-white'>Save</div>
                            </div>
                        </div>
                    )}
                    <div className='flex w-full gap-2 mt-4 text-white md:gap-3'>
                        <div className='flex items-center justify-center flex-1 gap-3 py-2 rounded-xl cursor-pointer md:px-8 md:py-3 bg-[#28343e] hover:bg-[#ffffff23]'>
                            <AiFillHeart size={22} />
                            <div className='hidden text-sm font-medium md:flex'>Like</div>
                        </div>
                        <div className='flex items-center justify-center flex-1 gap-3 py-2 rounded-xl cursor-pointer md:px-8 md:py-3 bg-[#28343e] hover:bg-[#ffffff23]'>
                            <FaRetweet size={25} />
                            <div className='hidden text-sm font-medium md:flex'>Retweet</div>
                        </div>
                        <div className='flex items-center justify-center flex-1 gap-3 py-2 rounded-xl cursor-pointer md:px-8 md:py-3 bg-[#28343e] hover:bg-[#ffffff23]'>
                            <FaCommentDots size={20} />
                            <div className='hidden text-sm font-medium md:flex'>Comment</div>
                        </div>
                        <div className='flex items-center justify-center gap-3 px-4 py-2 bg-transparent border-2 cursor-pointer rounded-xl md:py-3 [border:2px_solid_#2f3d49] hover:bg-[#00000012]'>
                            <PiShareNetworkBold size={20} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute p-2 top-3 right-5 hover:bg-[#cfcfcf34] rounded-full' onClick={() => setdropdown(!dropdown)} ref={optionsref}>
                <SlOptions size={15} />
                {dropdown && (
                    <div className='absolute top-[110%] right-0 bg-[#2a3843] flex justify-end flex-col gap-0 rounded-xl p-2 shadow-xl'>
                        <div className='p-2 rounded-md hover:bg-[#1da1f2] hover:text-white font-medium cursor-pointer ' onClick={() => setedit(true)}>
                            Edit
                        </div>
                        <div className='p-2 rounded-md hover:bg-[#1da1f2] hover:text-white font-medium cursor-pointer' onClick={handleDelete}>
                            Delete
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TweetCard;

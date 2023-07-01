import React from "react";

const ProfileWidget = ({ data, isLoading, isFetching }) => {

    return (
        <div className='sticky top-20 hidden lg:flex rounded-xl bg-[#1b2730] text-[#939ba7] h-[370px] mx-3 w-[20%] min-w-[250px] flex-col justify-start items-center'>
            <div className='bg-[#1da0f27d] h-[30%] w-full rounded-t-xl'></div>
            <img src='https://picsum.photos/80' alt='' className='rounded-full aspect-square mt-[-40px] ring-8 ring-[#ffffff9d]' width={80} />
            <div className='flex flex-col mt-[20px] items-center gap-2 w-full'>
                {isLoading || isFetching ? (
                    <div>LOADING...</div>
                ) : (
                    <>
                        <div className='font-medium text-white cursor-pointer text-md md:text-xl'>{data.name}</div>
                        <div className='text-md'>@{data.username}</div>
                        <div className='w-full [border-bottom:2px_solid_#2f3d49] my-2'></div>
                        <div className='flex justify-around w-full gap-2'>
                            <div className='flex flex-col items-center gap-2'>
                                <div className='font-medium text-white text-md'>{data.following}</div>
                                <div className='font-medium text-md'>Following</div>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <div className='font-medium text-white text-md'>{data.followers}</div>
                                <div className='font-medium text-md'>Followers</div>
                            </div>
                        </div>
                    </>
                )}
                <div className='w-full [border-bottom:2px_solid_#2f3d49] my-2'></div>
                <div className='text-[#1a90d8] pb-5 pt-1 cursor-pointer'>Find new people</div>
            </div>
        </div>
    );
};

export default ProfileWidget;

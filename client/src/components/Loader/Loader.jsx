import React from "react";

const Loader = () => {
    return (
        <div className='flex justify-center w-full h-10'>
            <div
                className='flex justify-center text-center  h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]'
                role='status'>
                <span className=' !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>Loading...</span>
            </div>
        </div>
    );
};

export default Loader;

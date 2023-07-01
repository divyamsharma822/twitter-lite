import React from "react";

const FeaturesWidget = () => {
    return (
        <div className='sticky top-20 rounded-xl bg-[#1b2730] p-6 text-[#939ba7] h-min mx-3 w-[20%] hidden xl:flex flex-col'>
            <div className='mb-2 text-lg font-bold text-[#1c628f]'>Features</div>
            <ul className='space-y-3 list-disc list-inside'>
                <li>Login / logout with JWT</li>
                <li>Registration</li>
                <li>Tweet create, edit, delete</li>
                <li>Fully responsive</li>
            </ul>
            <div className='my-2 text-lg font-bold text-[#1c628f]'>Features In-progress</div>
            <ul className='space-y-3 list-disc list-inside'>
                <li>Follow / UnFollow</li>
            </ul>
        </div>
    );
};

export default FeaturesWidget;

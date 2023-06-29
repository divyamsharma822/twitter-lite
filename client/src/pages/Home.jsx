import React from "react";
import Feed from "../components/Feed";
import Header from "../components/Header";
import ProfileWidget from "../components/ProfileWidget";
import FeaturesWidget from "../components/FeaturesWidget";

const Home = () => {

    
    return (
        <div className='bg-[#06141d] h-screen w-screen overflow-y-scroll overflow-hidden'>
            <Header />
            <div className='flex justify-center'>
                <ProfileWidget />
                <Feed />
                <FeaturesWidget />
            </div>
        </div>
    );
};

export default Home;

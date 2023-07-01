import React from "react";
import Feed from "../components/Feed";
import Header from "../components/Header";
import ProfileWidget from "../components/ProfileWidget";
import FeaturesWidget from "../components/FeaturesWidget";
import { useGetDetailsQuery } from "../api/tweet";
import Loader from "../components/Loader/Loader";

const Home = () => {

    const { data, isLoading, isFetching } = useGetDetailsQuery();

    if(isLoading || isFetching) {
        return <Loader />
    }
    
    return (
        <div className='bg-[#06141d] h-screen w-screen overflow-y-scroll overflow-hidden'>
            <Header data={data} isFetching={isFetching} isLoading={isLoading} />
            <div className='flex justify-center'>
                <ProfileWidget data={data} isFetching={isFetching} isLoading={isLoading} />
                <Feed />
                <FeaturesWidget />
            </div>
        </div>
    );
};

export default Home;

import React from "react";
import Feed from "../components/Feed";
import Header from "../components/Header";
import ProfileWidget from "../components/ProfileWidget";
import FeaturesWidget from "../components/FeaturesWidget";
import { useGetDetailsQuery } from "../api/tweet";
import Loader from "../components/Loader/Loader";
import UnAuthorisedAccess from "../components/ErrorPages/UnAuthorisedAccess";

const Home = () => {
    const { data, isLoading, isFetching, error } = useGetDetailsQuery();

    if (isLoading || isFetching) {
        return <Loader />;
    }

    if (error) {
        return <UnAuthorisedAccess message={error?.data?.message} />;
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

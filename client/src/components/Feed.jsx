import React, { useState } from "react";
import FeedInput from "./FeedInput";
import TweetCard from "./TweetCard";
import { useGetTweetsQuery } from "../api/tweet";
import ReactPaginate from "react-paginate";

const Feed = () => {
    const [page, setpage] = useState(1);

    let { data, isLoading, isFetching, refetch } = useGetTweetsQuery({ page: page, size: 5 });

    const useHandlePageClick = async (data) => {
        setpage(data.selected + 1);
        refetch();
    };

    return (
        <div className='mx-3 mt-2 mb-4 w-full lg:w-[70%] xl:w-[50%] max-w-[700px] overflow-hidden'>
            <FeedInput />
            <div className='flex flex-col gap-3'>
                {!isLoading || !isFetching ? (
                    <>
                        {data?.tweets.length !== 0 ? (
                            data?.tweets?.map((tweet, index) => <TweetCard key={index} className='pagination' tweet={tweet} />)
                        ) : (
                            <div className='my-5 text-2xl text-center text-white'>No tweets to shown</div>
                        )}

                        <div className='pagination'>
                            <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={Math.ceil(data.totalDocuments / 5)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                onPageChange={useHandlePageClick}
                                forcePage={page - 1}
                                pageClassName={"page-item bg-[#1c628f] text-white aspect-square p-2 rounded-md"}
                                pageLinkClassName={"page-link "}
                                previousClassName={"page-item bg-[#1b2730] text-white p-2 rounded-md"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item bg-[#1b2730] text-white p-2 rounded-md"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                containerClassName={"flex gap-3 justify-center"}
                                activeClassName={"active bg-[#1da1f2] text-white aspect-square p-2 rounded-md"}
                                subContainerClassName={"pages pagination "} /* as this work same as bootstrap class */
                            />
                        </div>
                    </>
                ) : (
                    <div className='text-xl text-center text-white'>LOADING...</div>
                )}
            </div>
        </div>
    );
};

export default Feed;

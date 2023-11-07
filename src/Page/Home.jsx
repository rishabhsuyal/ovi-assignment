import React, { useEffect, useState } from 'react'
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchArea from "../Component/SearchArea/SearchArea"
import "./Home.css";
import TextResponse from '../Component/NoRes/NoRes';
import Container from '../Component/Container/Container';
function Home() {

    const abortController = new AbortController()
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(20);
    const [hasMore, sethasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    var searchURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&text=${search}&page=${page}&safe_search=3&per_page=20&format=json&nojsoncallback=1`
    var recentURL = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_API_KEY}&page=${page}&safe_search=3&per_page=20&format=json&nojsoncallback=1`
    var url = search ==="" ? recentURL : searchURL;


    useEffect(() => {
        handleFetch();
    // eslint-disable-next-line
    }, [])


    useEffect(() => {
        onSearchChange();
        return ()=>{
            abortController.abort()
        };
        // eslint-disable-next-line
    }, [search])

    function onSearchChange(){
        setLoading(true)
        axios.get(url,{
            signal: abortController.signal
        }).then((res) => {
            setData(res.data.photos.photo)
            setTotal(res.data.total)
        })
            .catch(err => console.log(err))
            .finally(setLoading(false));
    }


    function handleFetch() {
        if (data.length >= total) { sethasMore(false); return; }
        setPage(prev => prev + 1);
        axios.get(url)
            .then((res) => {
                setData((prev) => [...prev, ...res.data.photos.photo])
                setTotal(res.data.total)
            })
            .catch(err => console.log(err))
    }


    function handleImg(src) {
        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("img01");
        modal.style.display = "block";
        modalImg.src = src;
    }

    function handleCancel() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    return (
        <div className='h-screen'>
            <SearchArea setSearch={setSearch} />
            {
                loading && <TextResponse txt={"LOADING"}/>
            }
            {
                !loading && data.length > 0 &&
                <InfiniteScroll
                    dataLength={data.length}
                    next={handleFetch}
                    hasMore={hasMore}
                    loader={<TextResponse txt={"LOADING"} />}
                    endMessage={<h4 className='text-white '>Ending</h4>}
                >
                    {
                            <Container data={data} handleImg={handleImg} />
                    }
                </InfiniteScroll>
            }
            {
                data.length === 0 && !loading && search!=="" && <TextResponse txt={"BETTER LUCK NEXT TIME"} />
            }
            <div id="myModal" class="modal">
                <span onClick={handleCancel} class="close">&times;</span>
                <img alt='bg' class="modal-content" id="img01" />
                <div id="caption"></div>
            </div>
        </div>
    )
}

export default Home
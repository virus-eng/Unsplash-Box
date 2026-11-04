"use client"
export const dynamic = 'force-dynamic';
import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function SearchPage(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchText, setSearchText] = useState(searchParams.get("term"));
    const [searchResults, setSearchResults] = useState([]);
    const [pageNo, setPageNo] = useState(1);

    async function fetchSearchResults(searchTerm, page){
        if(searchTerm.length < 1) return;
        let response = await fetch(`/api/search?term=${searchTerm}&page=${page}`);
        response = await response.json();
        if(page == 1) setSearchResults(response);
        else setSearchResults(searchResults.concat(response));
        setPageNo(page);
    }

    function searchImage(imageId){
        router.push(`/image/${imageId}`);
    }

    useEffect(()=>{fetchSearchResults(searchParams.get("term"), 1)}, []);

    return(
        <div className="search-page">
            <div className="top-gradiant">
            <div className="search-bar-div">
          <input onKeyUp={
             (e)=>{
                if(e.key != 'Enter') return;
                router.push(`/search?term=${searchText}`);
                fetchSearchResults(searchText, 1);
            }
          } value={searchText} placeholder="Enter your keywords..." type="text" className="search-bar" onChange={(e)=>{setSearchText(e.target.value)}} />
          
          <button onClick={
            ()=>{
                router.push(`/search?term=${searchText}`);
                fetchSearchResults(searchText, 1);
            }}  className="search"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="7" stroke="#E5E7EB" strokeWidth="2"/>
<path d="M20 20L17 17" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
</svg>
</button>
        </div>  
            </div>

            <div className="search-results">
              {searchResults.map((imageObj)=>{return <img key={imageObj.id} onClick={()=>{searchImage(imageObj.id)}} src={imageObj.display} alt="" />})}
              <button onClick={()=>{fetchSearchResults(searchText, pageNo + 1);}} className="view-more">View more</button>
            </div>
        </div>
    )
}

export default SearchPage;
'use client'
import styles from "./page.module.css";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  function loadSearchPage(){
    if(searchText.length < 1) return;
    router.push(`/search?term=${searchText}`);
  }

  return (
    <main className="home">
      <div className="left-bg bg-img"></div>
      <div className="search-box">
        <h1 className="search-title">Search</h1>
        <p className="search-desc">Search high-resolution images from Unsplash</p>
        <div className="search-bar-div">
          <input onKeyUp={(e)=>{if(e.key == 'Enter') loadSearchPage()}} value={searchText} placeholder="Enter your keywords..." type="text" className="search-bar" onChange={(e)=>{setSearchText(e.target.value)}} />
          <button onClick={loadSearchPage} className="search"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="7" stroke="#E5E7EB" strokeWidth="2"/>
<path d="M20 20L17 17" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
</svg>
</button>
        </div>  
      </div>
      <div className="right-bg bg-img"></div>
    </main>
  );
}

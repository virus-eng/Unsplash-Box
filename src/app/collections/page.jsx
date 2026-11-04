'use client'
export const dynamic = 'force-dynamic';
import React from "react";
import { useEffect, useState } from "react";
import Collection from "@/components/Collection";
import { useSelector } from "react-redux";

function Collections(){
    const [collectionList, setCollectionList] = useState(-1);
    const refreshCollectionList = useSelector((state)=>{return state.refreshCollectionList.value});

    async function fetchCollections(){
        let response = await fetch('/api/collections');
        response = await response.json();  
        if(response !== 0) setCollectionList(response);
        else alert("failed to fetch your collections")
    }

    useEffect(()=>{fetchCollections()}, [refreshCollectionList]);

    return(
        <div className="collections">
            <h1 className="collections-title">Collections</h1>
            <p className="collections-desc">Explore the world through collections of beautiful <br></br> photos free to use under the Unsplash License.</p>
            <div className="collections-list">
                {collectionList != -1 ? collectionList.map((collection)=>{return <Collection key={collection._id} collectionId={collection._id} type={"tile"} name={collection.name} images={collection.images}/>}) : undefined}
                <Collection type={"button"}/>
            </div>
        </div>
    )
}

export default Collections;
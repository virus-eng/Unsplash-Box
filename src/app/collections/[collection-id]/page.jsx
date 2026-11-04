'use client'
import React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function CollectionPage() {
  const params = useParams();
  const [collectionData, setCollectionData] = useState(-1);
  const router = useRouter();

  async function fetchCollectionData(){
    let response = await fetch(`/api/collections/${params["collection-id"]}`);
    response = await response.json();
    if(response != 0) setCollectionData(response);
  }

  useEffect(()=>{fetchCollectionData()}, []);

  return (
    <div className="search-page">
        <h1>{collectionData != -1 ? collectionData.name : "Collection"}</h1>
      <div className="search-results">
        {collectionData != -1 ? Object.keys(collectionData.images).map((imageId)=>{return <img key={imageId} onClick={()=>{router.push(`/image/${imageId}`)}} src={collectionData.images[imageId]} alt="" />}) : undefined}
      </div>
    </div>
  );
}

export default CollectionPage;

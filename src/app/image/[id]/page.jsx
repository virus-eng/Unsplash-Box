"use client";
export const dynamic = 'force-dynamic';
import React from "react";
import { useParams } from "next/navigation";
import CollectionTile from "@/components/CollectionTile";
import { useState, useEffect } from "react";
import AddImage from "@/components/AddImage";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

function ImagePage() {
  const params = useParams();
  const [imageData, setImageData] = useState(-1);
  const [collectionList, setCollectionList] = useState([]);
  const [showAddImage, setShowAddImage] = useState(0);
  const refreshImagePageCollectionList = useSelector((state)=>{return state.refreshImagePageCollectionList.value});

  async function fetchImageData(){
    let response = await fetch(`/api/image/${params.id}`);
    response = await response.json();
    setImageData(response); 
  }

  async function fetchCollections(){
    let response = await fetch('/api/collections');
    response = await response.json();  
    if(response !== 0) setCollectionList(response);
    else alert("failed to fetch your collections")
  }

  useEffect(()=>{fetchImageData()}, []);
  useEffect(()=>{fetchCollections()}, [refreshImagePageCollectionList]);

  return (
    <div className="image-page">
      <img src={imageData != -1 ? imageData.display : undefined} alt="" />
      <div className="image-page-right">
        <div className="user-box">
          <img src={imageData != -1 ? imageData.uploaded_by.pic : undefined} alt="" />
          <p>{imageData != -1 ? imageData.uploaded_by.username : "Username"}</p>
        </div>

        <p className="date">Published on {imageData != -1 ? imageData.date : undefined}</p>
        <div className="image-actions">
          <button onClick={()=>{setShowAddImage(1)}}>+ Add to Collection</button>
          <a download={"image"} href={imageData != -1 ? imageData.download : undefined}>Download</a>
        </div>

        <div className="saved-collections">
            <h1>Collections</h1>
            <div>
               {collectionList.map((collection)=>{if(params.id in collection.images == true) return <CollectionTile key={collection._id} type={0} collectionId={collection._id} imageId={params.id} name={collection.name} images={collection.images}/>})}
            </div>
        </div>
      </div>
      {showAddImage == 1 && createPortal(<AddImage collectionList={collectionList} imageId={params.id} showAddImage={{"state" : showAddImage, "setter" : setShowAddImage}} />, document.body)}
    </div>
  );
}

export default ImagePage;

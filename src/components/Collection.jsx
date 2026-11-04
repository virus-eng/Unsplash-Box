"use client"
export const dynamic = 'force-dynamic';
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setter } from "@/Redux/addCollectionPopupSlice/addCollectionPopupSlice";
import AddCollection from "./AddCollection";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

function Collection(prop){    // prop.collectionId,  prop.name, prop.owner, prop.images, prop.type
    const router = useRouter();
    const [imageList, setImageList] = useState(prop.type == "tile" && Object.keys(prop.images));
    const addCollectionPopup = useSelector((state)=>{return state.addCollectionPopup.value});
    const dispatch = useDispatch();

    return(
        <>
        {prop.type == "tile" ? <div onClick={()=>{router.push(`/collections/${prop.collectionId}`)}} className="collection-tile">
            {imageList.length >= 1 ? <div className="collection-images">
                <img src={prop.images[imageList[0]]} alt="" />
                {Object.keys(prop.images).length >= 2 ? <div>
                    <img src={prop.images[imageList[1]]} alt="" />
                    {Object.keys(prop.images).length >= 3 ? <img src={prop.images[imageList[2]]} alt="" /> : undefined}
                </div> : undefined}
            </div> : <div className="no-image-msg">No images..</div>}

            <div className="collection-info">
                <h1>{prop.name}</h1>
                <p>{`${imageList.length} ${imageList.length > 1 ? "photos" : "photo"}`}</p>
            </div>
        </div> : <div onClick={()=>{dispatch(setter(1))}} className="collection-tile collection-add">+ <br /> Add new Collection</div>}
        {addCollectionPopup == 1 && createPortal(<AddCollection/>, document.body)}
        </>
    )
}

export default Collection
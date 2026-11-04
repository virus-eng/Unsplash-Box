"use client"
export const dynamic = 'force-dynamic';
import React from "react";
import { useDispatch } from "react-redux";
import { refreshImagePageCollectionList } from "@/Redux/refreshImagePageCollectionListReducer/reducer";

function CollectionTile(prop){
    const dispatch = useDispatch();

    async function collectionAction(){
        let response = undefined;
        if(prop.type == 0) response = await fetch(`/api/collections/${prop.collectionId}/images/${prop.imageId}`, {method : 'DELETE'});  // Remove
        else response = await fetch(`/api/collections/${prop.collectionId}/images/${prop.imageId}`, {method : 'PUT'});    // Add to Collection
        response = await response.json();
        if(response == 1) dispatch(refreshImagePageCollectionList());
        else alert("failed to perform the action");
    }

    return(
        <div className="image-collection-tile">
            <img src={(()=>{for(let i in prop.images) return prop.images[i]})()} alt="" />
            <div>
                <h3>{prop.name}</h3>
                <p>{Object.keys(prop.images).length > 1 ? `${Object.keys(prop.images).length} photos`: `${Object.keys(prop.images).length} photo`}</p>
            </div>
            <button onClick={collectionAction}>{prop.type == 0 ? <pre>-   Remove</pre> : <pre>+   Add to Collection</pre>}</button>
        </div>
    )
}

export default CollectionTile;
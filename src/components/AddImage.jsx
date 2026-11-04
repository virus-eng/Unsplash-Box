import React from "react";
import { useDispatch } from "react-redux";
import { refreshImagePageCollectionList } from "@/Redux/refreshImagePageCollectionListReducer/reducer";
import CollectionTile from "./CollectionTile";

function AddImage(prop){
    return(
        <div className="popup-bg">
            <div className="addImage">
                <h1>Add to Collections</h1>
                <div className="add-image-search">
                    <input placeholder="Search collections" type="text" />
                    <button><svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="7" stroke="#E5E7EB" strokeWidth="2"/>
<path d="M20 20L17 17" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
</svg></button>
                </div>
                <p>All matches</p>
                <div className="add-image-collection-list">
                {prop.collectionList.map((collection)=>{if(prop.imageId in collection.images == false) return <CollectionTile key={collection._id} imageId={prop.imageId} type={1} collectionId={collection._id} name={collection.name} images={collection.images}/>})}
                </div>
                <button onClick={()=>{prop.showAddImage.setter(0)}}>Cancel</button>
            </div>
        </div>
    )
}

export default AddImage;
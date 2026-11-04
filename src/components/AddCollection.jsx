"use client"
export const dynamic = 'force-dynamic';
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setter } from "@/Redux/addCollectionPopupSlice/addCollectionPopupSlice";
import { refreshCollectionList } from "@/Redux/refreshCollectionListReducer/refreshCollectionList";

function AddCollection(){
    const [collectionName, setCollectionName] = useState("");
    const [nameError, setNameError] = useState(0);
    const dispatch = useDispatch();

    async function saveCollection(){
        if(collectionName.length < 1){
            setNameError(1);
            return;
        }

        setNameError(0);
        let response = await fetch('/api/collections', {method : 'POST', headers : {'Content-Type' : 'application/json'}, body : JSON.stringify({"name" : collectionName})});
        response = await response.json();

        if(response == 1){
            dispatch(refreshCollectionList());
            dispatch(setter(0));
        }
        else alert("failed to perform the operation");
    }

    return(
        <div className="popup-bg">
        <div className="add-collection-popup">
            <h1>Add Collection</h1>
            <input value={collectionName} placeholder="Name your collection..." type="text" onChange={(e)=>{setCollectionName(e.target.value)}}/>
            {nameError == 1 && <p>Please enter a valid name</p>}
            <div>
                <button onClick={saveCollection} className="collection-save">Save</button>
                <button onClick={()=>{dispatch(setter(0))}} className="collection-cancel">Cancel</button>
            </div>
        </div>
        </div>
    )
}

export default AddCollection;
"use client"
export const dynamic = 'force-dynamic';
import React from "react";
import { store } from "@/Redux/store";
import { Provider } from "react-redux";

function ReduxWrapper({children}){
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxWrapper;
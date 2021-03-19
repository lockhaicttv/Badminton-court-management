import HeaderCourtMangement from '../HeadFoot/HeaderCourtMangement'
import React, {Component} from "react";
import {Route} from "react-router-dom";
import CourtManager from './Court';
import CourtAdmin from "./CourtAdmin";


const Court = () => {
        return (
            <div>
                <HeaderCourtMangement/>
                <Route exact path="/home/court" component={CourtManager}/>
                <Route path="/home/admin" component={CourtAdmin}/>
            </div>
        )
}

export default Court;
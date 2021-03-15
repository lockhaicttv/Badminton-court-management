import HeaderCourtMangement from '../HeadFoot/HeaderCourtMangement'
import React, {Component} from "react";
import {Route} from "react-router-dom";
import CourtManager from './Court';
import CourtAdmin from "./CourtAdmin";
import Switch from "react-bootstrap/Switch";

export default class Court extends Component {
    render() {
        return (
            <div>
                <HeaderCourtMangement/>
                <Route exact path="/home/court" component={CourtManager}/>
                <Route path="/home/admin" component={CourtAdmin}/>
            </div>
        )
    }
}
import Header from '../../Component/HeadFoot/Header'
import React, {Component} from "react";
import { Route } from "react-router-dom";
import CourtManager from './Court'
export default class Court extends Component {
    render(){
        return(
            <div>
                <Header />
                <Route path="/home/court" component={CourtManager}/>
            </div>
        )
    }
}
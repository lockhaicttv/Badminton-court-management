import {useRecoilState, useSetRecoilState} from "recoil";
import {accountIdState, authenticationState} from "../Store/atom";
import {Redirect, Route} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ls from '../Utils/localStorage'

const LoginRoute = ({component: Component, ...rest}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authentication, setAuthentication] = useRecoilState(authenticationState);
    const setAccountId = useSetRecoilState(accountIdState);

    useEffect(()=>{
        if (ls.getAuthenticate()!==null) {
            setAuthentication(ls.getAuthenticate())
            setAccountId(ls.getAuthenticate().account_id);
        }
    },[])


    return (
        <Route
            {...rest}
            render={(props) => {
                return (authentication.isAuthenticated === true) ?
                    (authentication.role==='customer')?
                        <Redirect to='/customer' />: <Redirect to='/'/>
                    :
                    (
                        <Component {...props}/>
                    )
            }
            }
        />
    );
}

export default LoginRoute;
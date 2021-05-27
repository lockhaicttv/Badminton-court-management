import HeaderCourtMangement from "../HeadFoot/HeaderCourtMangement";
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import CourtManager from "./Court";
import CourtAdmin from "./CourtAdmin";
import Shoppage from "./Shoppage";
import { accountIdState, courtIdState } from "../../Store/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import callApi from "../../Utils/apiCaller";
import Statistics from "./Statistics";
import AddInfo from "../LoginPage/Register/AddInfo";
import CourtHomePage from "./CourtHomePage";
import CourtBooking from "./CourtBooking";

const Court = () => {
  const account_id = useRecoilValue(accountIdState);
  console.log(account_id);
  const setCourtInfo = useSetRecoilState(courtIdState);
  const shopPageRoute = `/home/shop-page/${account_id}`;

  const loadCourtInfo = () => {
    callApi(`court/get-by-account-id/${account_id}`, "get", null).then(
      (res) => {
        console.log(res.data);
        setCourtInfo(res.data);
      }
    );
  };

  useEffect(() => {
    loadCourtInfo();
  }, []);

  return (
    <div>
      <HeaderCourtMangement />
      <Route exact path='/home' component={CourtHomePage}/>
      <Route exact path="/home/court" component={CourtManager} />
      <Route exact path='/home/court-booking' component={CourtBooking} />
      <Route path="/home/admin" component={CourtAdmin} />
      <Route path='/home/statistic' component={Statistics} />
      <Route
        exact
        path={`/home/shop-page/${account_id}`}
        component={Shoppage}
      />
      <Route exact path='/add-info/:account_id' component={AddInfo}/>
    </div>
  );
};

export default Court;

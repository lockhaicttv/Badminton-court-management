import CourtArea from "./CourtArea";
import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import callApi from "../../../Utils/apiCaller";
import { Container } from "react-bootstrap";
import Bill from "./Bill";
import { accountIdState, areasState, courtIdState } from "../../../Store/atom";
import { useHistory } from "react-router";
import Banner from "../Shoppage/Banner";

function CourtManger() {
  const history = useHistory();
  const [areas, setAreas] = useRecoilState(areasState);
  const [idBill, setIdBill] = useState("");
  const account_id = useRecoilValue(accountIdState);
  const [CourtId, setCourtId] = useRecoilState(courtIdState);

  const loadCourtInfo = () => {
    let item = [];
    callApi(`court/get-by-account-id/${account_id}`, "get", null).then(
      (res) => {
        console.log(res.data);
        if (res.data !== null) {
          if (typeof res.data === "object") {
            console.log("ok");
            callApi(`court_area/?court_id=${res.data._id}`, "get", null).then(
              (res) => {
                item = res.data;
                console.log(item);
                let initAreasState = [];
                let initBillState = [];
                initAreasState = res.data;
                initBillState.push({});
                setAreas(initAreasState);
              }
            );
          }
        } else {
          history.push("/add-info");
        }
      }
    );
  };

  useEffect(() => {
    loadCourtInfo();
    let court_id = `60207b5a3dd41d22d8861cd0`;
  }, []);

  const allCourt = areas.map((item, key) => {
    return <CourtArea isUse={item.status} idCourtArea={item.area} key={key} />;
  });
  return (
    <div className="row justify-content-between p-3 m-0 bg-light">
      <div
        className="row flex-wrap justify-content-start col-lg-7"
        style={{ overflow: "scroll", height: "85vh" }}
      >
        {allCourt}
      </div>

      <div className="container row col-lg-5">
        <Bill />
      </div>
    </div>
  );
}

export default CourtManger;

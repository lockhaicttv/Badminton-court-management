import { Button } from "react-bootstrap";
import React, { useCallback, useState } from "react";
import Clock from "react-digital-clock";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import AddService from "./AddService";
import { areasState, billDetailState, billState } from "../../../Store/atom";
import {
  faClock,
  faHome,
  faLightbulb,
  faPlus,
  faPlusSquare,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import callApi from "../../../Utils/apiCaller";
import ReactStopwatch from "react-stopwatch";

function CourtArea(props) {
  const [area, setArea] = useRecoilState(areasState);
  const [isShowModal, setIsShowModal] = useState(false);
  const [bill, setBill] = useRecoilState(billState);
  const setBillDetail = useSetRecoilState(billDetailState);
  const [idBill, setIdBill] = useState("");

  function handleOpen() {
    let newArea = [...area];

    let index = newArea.findIndex((x) => x.area === props.idCourtArea);
    // console.log(newArea[index]._id)
    let _id = newArea[index]._id;
    let status = !newArea[index].status;
    let temp = {
      _id: newArea[index]._id,
      area: newArea[index].area,
      status: true,
      description: newArea[index].description,
      court_id: newArea[index].court_id,
    };

    newArea[index] = temp;
    setArea(newArea);

    callApi(
      `court_area/update-status/?_id=${_id}&status=true`,
      "put",
      null
    ).then((res) => {
      console.log(res.data.message);
    });

    let newBill = {
      time_check_in: new Date().getDate(),
      time_check_out: null,
      status: false,
      court_area_id: newArea[index]._id,
    };
    callApi(`court_bill`, "post", newBill).then((res) => {
      console.log(res.data);
    });
  }

  function handleShowModal() {
    let index = area.findIndex((x) => x.area === props.idCourtArea);
    let idCourtArea = area[index]._id;

    callApi(`court_bill/get-by-court_area/${idCourtArea}`, "get", null).then(
      (res) => {
        setIdBill(res.data._id);
      }
    );

    setIsShowModal(!isShowModal);
  }

  async function handleShowBill() {
    let index = area.findIndex((x) => x.area === props.idCourtArea);
    let idCourtArea = area[index]._id;

    await callApi(
      `court_bill/get-by-court_area/${idCourtArea}`,
      "get",
      null
    ).then((res) => {
      console.log(res.data);
      setBill((prevState) => {
        return { ...prevState, ...res.data };
      });
      callApi(
        `court_bill_detail/get-by-bill-id/${res.data._id}`,
        "get",
        null
      ).then((res2) => {
        setBillDetail(res2.data);
      });
    });
    console.log(bill);
    // callApi(`court_bill_detail/get-by-bill-id/${bill._id}`, 'get', null)
    //     .then((res) => {
    //         setBillDetail(res.data);
    //     });
  }

  //console.log(court)
  if (props.isUse === false) {
    return (
      <div className="m-2">
        <div className="court court-background"></div>
        <Button
          variant="outline-dark"
          onClick={handleOpen}
          className="col-lg-4 offset-lg-4"
        >
          <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
          Bật
        </Button>
      </div>
    );
  } else {
    return (
      <div className="m-2">
        <div className="court court-background" onClick={handleShowBill}></div>
        <div className="justify-content-center bg-dark m-auto"></div>
        <div className="justify-content-center">
          {/*<Button className="btn-danger "*/}
          {/*        onClick={handleClick}*/}
          {/*>*/}
          {/*    Thanh toán*/}
          {/*</Button>*/}

          <div className="col-lg-12">
            <Button variant="outline-dark" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
              Thêm
            </Button>

            <ReactStopwatch
              seconds={0}
              minutes={0}
              hours={0}
              limit="99:99:99"
              onChange={({ hours, minutes, seconds }) => {
                // setUseTime(`${hours}: ${minutes}: ${seconds}`)
                // console.log(useTime)
              }}
              onCallback={() => console.log("Finish")}
              render={({ formatted, hours, minutes, seconds }) => {
                return (
                  <div className="btn btn-danger">
                    <span>{formatted}</span>
                  </div>
                );
              }}
            />
            <AddService
              handleClose={handleShowModal}
              isShow={isShowModal}
              idBill={idBill}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CourtArea;

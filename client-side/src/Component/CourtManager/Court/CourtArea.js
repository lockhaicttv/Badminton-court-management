import {Button} from "react-bootstrap";
import React, {useCallback, useState} from "react";
import {useEffect} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import AddService from "./AddService";
import {areasState, billDetailState, billState, isShowBillState, timeCheckInState} from "../../../Store/atom";
import {
    faLightbulb,
    faPlusSquare,
    faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import callApi from "../../../Utils/apiCaller";
import Watch from "./Watch";

function CourtArea(props) {
    const [area, setArea] = useRecoilState(areasState);
    const [isShowModal, setIsShowModal] = useState(false);
    const [bill, setBill] = useRecoilState(billState);
    const setBillDetail = useSetRecoilState(billDetailState);
    const [idBill, setIdBill] = useState("");
    const setIsShowBill = useSetRecoilState(isShowBillState);

    useEffect(() => {

    }, [])

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
            price_total: 0,
            description: newArea[index].description,
            court_id: newArea[index].court_id,
        };

        newArea[index] = temp;
        setArea(newArea);

        callApi(
            `court_area/update-status/?_id=${_id}&status=true`,
            "put",
            null
        )
            .then((res) => {
                console.log(res.data.message);
            });

        let newBill = {
            time_check_in: new Date(),
            time_check_out: null,
            status: false,
            court_area_id: newArea[index]._id,
        };
        callApi(`court_bill`, "post", newBill).then((res) => {
            console.log(res.data);
        });
        props.reloadCourt();
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

    function handleShowBill() {
        let index = area.findIndex((x) => x.area === props.idCourtArea);
        let idCourtArea = area[index]._id;

        callApi(
            `court_bill/get-by-court_area/${idCourtArea}`,
            "get",
            null
        ).then((res) => {
            console.log(res.data);
            setBill((prevState) => {
                return {...prevState, ...res.data};
            });
            callApi(
                `court_bill_detail/get-by-bill-id/${res.data._id}`,
                "get",
                null
            ).then((res2) => {
                setBillDetail(res2.data);
            });
        });
       setIsShowBill(true);
    }

    if (props.isUse === false) {
        return (
            <div className="m-2">
                <div className="court court-background"/>
                <Button
                    variant="outline-dark"
                    onClick={handleOpen}
                    className="col-lg-4 offset-lg-4"
                >
                    <FontAwesomeIcon icon={faLightbulb} className="mr-2"/>
                    Bật
                </Button>
            </div>
        );
    } else {
        return (
            <div className="m-2">
                <div className="court court-background" onClick={handleShowBill}/>
                <div className="justify-content-center bg-dark m-auto"/>
                <div className="justify-content-center">
                    {/*<Button className="btn-danger "*/}
                    {/*        onClick={handleClick}*/}
                    {/*>*/}
                    {/*    Thanh toán*/}
                    {/*</Button>*/}

                    <div className="col-lg-12">
                        <Button variant="outline-dark" onClick={handleShowModal}>
                            <FontAwesomeIcon icon={faPlusSquare} className="mr-2"/>
                            Thêm
                        </Button>
                        <div className="btn btn-danger">
                            <Watch court_area_id={props._id}/>
                        </div>
                        <AddService
                            handleClose={handleShowModal}
                            isShow={isShowModal}
                            idBill={idBill}
                            reloadBill={handleShowBill}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CourtArea;

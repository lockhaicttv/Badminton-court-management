import React, {useState, useEffect} from "react";
import {Form, Button, Row, Col, Modal} from "react-bootstrap";
import callApi from "../../../Utils/apiCaller";
import {useSetRecoilState} from "recoil/es/recoil";
import {accountIdState} from "../../../Store/atom";

const AddInfo = () => {
    return(
        <div>
            Vui lòng thêm thông tin
        </div>
    )
}

export default AddInfo;
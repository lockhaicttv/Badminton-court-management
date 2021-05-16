import React, { useState, useEffect } from "react";
import { accountIdState, courtIdState, courtState } from "../../../Store/atom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { Button, Card, Modal } from "react-bootstrap";
import FileBase64 from "react-file-base64";
import callApi from "../../../Utils/apiCaller";
import EditBanner from "./EditBanner";
import usePortal from "react-useportal/dist/usePortal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEdit } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [showEditLogo, setShowEditLogo] = useState(false);
  const [banner, setBanner] = useState({});
  const account_id = useRecoilValue(accountIdState);
  const [courtInfo, setCourtInfo] = useRecoilState(courtIdState);

  useEffect(() => {
    callApi(`court/get-by-account-id/${account_id}`, "get", null).then(
      (res) => {
        setCourtInfo(res.data);
        console.log(courtInfo);
      }
    );
  }, []);

  const handleClose = () => {
    setIsShowModal(!isShowModal);
  };

  const handleCloseEditLogo = () => {
    setShowEditLogo(!showEditLogo);
  };

  const handleEditBanner = () => {
    console.log(courtInfo._id, banner);
    callApi(`court/edit-image/banner/${courtInfo._id}`, "put", banner).then(
      (res) => {
        setCourtInfo((preventDefault) => {
          return {
            ...preventDefault,
            banner: banner,
          };
        });
      }
    );
  };

  const handleEditLogo = () => {
    callApi(
      `court/edit-image/logo/${courtInfo._id}`,
      "put",
      courtInfo.logo
    ).then((res) => {
      console.log(res.data);
    });
  };

  const getBannerBase64 = (image) => {
    setBanner(image);
  };

  const getLogoBase64 = (image) => {
    setCourtInfo((preventDefault) => {
      return {
        ...preventDefault,
        logo: image,
      };
    });
  };

  const modalEditBanner = (
    <Modal show={isShowModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa banner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card.Img variant="top" src={courtInfo.banner.base64} />
          <label className="btn btn btn-secondary">
              <FileBase64 onDone={getBannerBase64}/>
              <FontAwesomeIcon icon={faEdit}/>
              <i>Thay ảnh</i>
          </label>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleEditBanner}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const modalEditLogo = (
    <Modal show={showEditLogo} onHide={handleCloseEditLogo}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa Logo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card.Img variant="top" src={courtInfo.logo.base64} />
          <label className="btn btn btn-secondary">
              <FileBase64 onDone={getLogoBase64}/>
              <FontAwesomeIcon icon={faEdit}/>
              <i>Thay ảnh</i>
          </label>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleEditLogo}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="banner pb-5">
      <img src={courtInfo.banner.base64} width="100%" height="300px" />
      <div className="logo rounded-circle">
        <div className="position-relative">
          <img
            src={courtInfo.logo.base64}
            width="150px"
            height="150px"
            className="rounded-circle"
          />
          <button
            className="edit-logo rounded-circle btn btn-light"
            width="24px"
            height="48px"
          >
            <FontAwesomeIcon icon={faCamera} onClick={handleCloseEditLogo} />
          </button>
        </div>
      </div>
      <Button
        variant="outline-dark"
        className="edit-banner rounded"
        onClick={handleClose}
      >
        <FontAwesomeIcon icon={faEdit} className="" />
      </Button>
      {modalEditBanner}
      {modalEditLogo}
    </div>
  );
};

export default Banner;

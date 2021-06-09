import React from 'react';

const Footer = () => {
    return (
        <div className='mt-5'>
            <div className="text-center text-lg-start bg-light text-muted">
                <section
                    className="d-flex justify-content-between justify-content-lg-between p-4 border-bottom"
                >
                    <div>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </section>
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>Hệ thống quản lý sân cầu lông
                                </h6>
                                <p>
                                    Giúp bạn quản lý dữ liệu kinh doanh sân cầu lông, đăng bán sản phẩm. Mua bán giao dịch
                                    online trên hệ thống có tích hợp chatbot
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Tenical
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">ReactJS</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">NodeJS</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">MongoDB</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Flask</a>
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Useful Links
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">Pricing</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Settings</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Orders</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Help</a>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Liên hệ & Báo cáo sai phạm
                                </h6>
                                <p><i className="fas fa-home me-3"></i>Đại học Cần Thơ</p>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    info@example.com
                                </p>
                                <p><i className="fas fa-phone me-3"></i> + 84 234 567 88</p>
                                <p><i className="fas fa-print me-3"></i> + 84 234 567 89</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                    © 2021 Copyright:
                    <a className="text-reset fw-bold" href="https://mdbootstrap.com/"> LeMinhChien</a>
                </div>
            </div>
        </div>
    )
}
export default Footer;
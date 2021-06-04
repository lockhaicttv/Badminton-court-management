import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import {totalCartState} from "../../../Store/selector";
import {useRecoilValue, useRecoilState} from "recoil";
import Button from "react-bootstrap/Button";
import {
    accountIdState,
    authenticationState,
    cartState, courtState,
} from "../../../Store/atom";
import callApi from "../../../Utils/apiCaller";
import ls from "../../../Utils/localStorage";
import Paypal from "./Paypal";
import {PayPalButton} from "react-paypal-button-v2";

const PriceTotal = () => {
    const priceTotal = useRecoilValue(totalCartState);
    const authentication = useRecoilValue(authenticationState);
    const user_id = useRecoilValue(accountIdState);
    const court_id = ls.getItem('court_id');
    const cart = ls.getItem("cart");
    const [recoilCart, setRecoilCart] = useRecoilState(cartState);
    const [bill, setBill] = useState({
        pay_time: new Date(),
        description: "",
        price_total: priceTotal.subTotal,
        status: "Chưa thanh toán",
        user_id: "",
        court_id: "",
    });
    const [billDetail, setBillDetail] = useState([]);
    const courtInfo = useRecoilValue(courtState)
    const [emailId, setEmailID] = useState('')

    useEffect(() => {
        let description = `Đã mua ${cart.length} sản phẩm. Bấm vào để xem chi tiết`;
        let status = "Đã thanh toán";

        setBill({
            pay_time: new Date(),
            description: description,
            price_total: priceTotal.subTotal,
            status: status,
            user_id: user_id,
        });
        setBillDetail(cart);

        getCourtInfo()
    }, []);

    const getCourtInfo = () => {
        callApi(`court/get-by-id/${court_id}`, 'get', null)
            .then(res => {
                setEmailID(res.data.email_id)
            })
    }

    const addBill = () => {
        callApi("user_bill", "post", {
            bill: {...bill, user_id: user_id, court_id: court_id},
            bill_details: billDetail,
        })
            .then((res) => {
                setRecoilCart([]);
                ls.setItem("cart", JSON.stringify([]));
                alert(res.data);
            })
            .catch(() => {
                alert("Thanh toán thất bại");
            });
    };

    const handlePay = () => {
        console.log(bill);
        if (cart.length === 0) {
            alert("Giỏ hàng của bạn đang rỗng!!");
            return;
        }

        if (authentication.isAuthenticated) {
            addBill();
        } else {
            alert("Vui lòng đăng nhập trước khi thanh toán");
        }
    };

    const transactionSuccess = async (details, data) => {
        return callApi("user_bill", "post", {
            bill: {
                ...bill,
                user_id: user_id,
                court_id: court_id,
                payment_data: data
            },
            bill_details: billDetail,

        })
            .then((res) => {
                console.log('có call')
                setRecoilCart([]);
                ls.setItem("cart", JSON.stringify([]));
                alert(res.data);
            })
            .catch((err) => {
                console.log(err)
                alert("Thanh toán thất bại");
            });
    }

    return (
        <div style={{width: "18rem"}}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <div className="justify-content-around">
                            <div>Tạm tính</div>
                            <div>{Number(priceTotal.subTotal).toLocaleString()} VND</div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="justify-content-around">
                            <div className="text-danger">Thành tiền</div>
                            <div>{Number(priceTotal.subTotal).toLocaleString()} VND</div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
            {(authentication.isAuthenticated) ?
                <Paypal
                    toPay={priceTotal.subTotal}
                    email_id={emailId}
                    transactionSuccess={transactionSuccess}
                    // // transactionCancel={transactionCancel}
                />
                :
                <Button
                    onClick={handlePay}
                    size='lg'
                    style={{
                        color: 'dark'
                    }}
                    block
                >
                    Thanh toán
                </Button>
            }
        </div>
    );
}
export default PriceTotal;

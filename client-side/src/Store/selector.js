import {selector} from "recoil";
import {cartState} from "./atom";
import {forEach} from "react-bootstrap/ElementChildren";

export const totalCartState = selector({
    key:'totalCartState',
    get: ({get})=>{
        console.log(get(cartState))
        const cart=get(cartState);
        let subTotal = 0;
        let quantity = 0;
        if (cart!==null) {
            cart.forEach((x) => {
                    quantity += x.quantity * 1;
                    subTotal += x.quantity * x.price;
                }
            )
        }
        return {
            subTotal,
            quantity
        }
    }
})
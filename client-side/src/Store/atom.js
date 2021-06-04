import {atom} from 'recoil';

export const authenticationState = atom({
    key: 'authenticationState',
    default: {
        isAuthenticated: false,
        role: ''
    }
})

export const accountIdState = atom({
    key: 'accountIdState',
    default: ''
});

export const courtIdState = atom({
    key: 'courtIdState',
    default: ''
});

export const courtState = atom({
    key: 'courtState',
    default: {}
})

export const realTimeState = atom({
    key: 'realTimeState',
    default: 1
});


export const areasState = atom({
    key: 'areasState',
    default: []
});

export const categoryState = atom({
    key: 'categoryState',
    default: []
});

export const billState = atom({
    key: 'billState',
    default: []
});

export const billDetailState = atom({
    key: 'billDetailState',
    default: []
});

//For shopping cart
export const cartState = atom({
    key: 'cartState',
    default: []
})

export const searchProductState = atom({
    key: 'searchProductState',
    default: []
})

export const timeCheckInState = atom({
    key: 'timeCheckInState',
    default: ''
})

export const isShowBillState = atom({
    key: 'isShowBillState',
    default: false
})

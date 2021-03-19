import {atom} from 'recoil';

export const accountIdState = atom({
    key: 'accountIdState',
    default: 'ádasda'
});

export const courtIdState = atom({
    key: 'courtIdState',
    default: ''
});

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
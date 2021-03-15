import {atom} from 'recoil';

export const accountIdState = atom({
    key: 'accountIdState',
    default: '6019f135b7409a239c8564e7'
});

export const courtIdState = atom({
    key: 'courtIdState',
    default: '60207b5a3dd41d22d8861cd0'
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
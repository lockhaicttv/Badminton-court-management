import { atom } from 'recoil';

const defaultCourt = [
    {
        id: 0,
        isUse: false,
        timeCheckIn: null,
        timeCheckOut: null
    },
    {
        id: 1,
        isUse: false,
        timeCheckIn: null,
        timeCheckOut: null
    },
    {
        id: 2,
        isUse: false,
        timeCheckIn: null,
        timeCheckOut: null
    }
]
export const courtState = atom({
    key:'courtState',
    default: defaultCourt
});

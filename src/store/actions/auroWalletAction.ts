import { TWalletData } from "types/aurawallet";

export const setWalletData = (payload: TWalletData) => ({
    type: 'SET_WALLET_DATA',
    payload,
}) 
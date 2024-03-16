import { AuroWalletAcctionType, TWalletData } from 'types/aurawallet';


export const initAuroWalletData: TWalletData = {
    userAddress: '',
    userPubKey: null,
    accountExists: false,
    isConnecting: true,
    loadingZkClient: true,
};

export const auroWalletReducer = (
    state = initAuroWalletData,
    action: AuroWalletAcctionType,
) => {
    switch (action.type) {
        case "SET_WALLET_DATA": {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
}
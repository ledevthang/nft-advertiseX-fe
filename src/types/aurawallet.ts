import { PublicKey } from 'o1js';

export type TWalletData = {
    userAddress: string;
    userPubKey: null | PublicKey;
    accountExists: boolean;
    isConnecting: boolean;
    loadingZkClient: boolean;
};

interface SetWalletData {
    type: "SET_WALLET_DATA",
    payload: TWalletData
}

export type AuroWalletAcctionType = SetWalletData
import { useDispatch } from 'react-redux'
import { setWalletData } from 'store/actions/auroWalletAction'
import { PublicKey, fetchAccount, TokenId } from 'o1js';
import { LocalStorageKey, LocalStorageValue } from 'common/constant';

const useAuroWallet = () => {
    const dispatch = useDispatch()

    async function connectWallet () {
        dispatch(setWalletData({
            isConnecting: true,
            userAddress: '',
            userPubKey: null,
            accountExists: false,
            loadingZkClient: false
        }))

        try {
            const mina = (window as any).mina
            if (mina === null) {
                throw new Error('You have to install Auro wallet first!')
            }

            const address: string = (await mina.requestAccounts())[0];
            const publicKey = PublicKey.fromBase58(address);

            const res = await fetchAccount({ publicKey });
            const accountExists = res.error == null;

            dispatch(setWalletData({
                userAddress: address, userPubKey: TokenId.toBase58(TokenId.derive(publicKey)), accountExists: accountExists, isConnecting: false,
                loadingZkClient: false
            }))

            localStorage.setItem(LocalStorageKey.IsConnected, LocalStorageValue.IsConnectedNo);

        } catch (error) {
            console.log(error);
            dispatch(setWalletData({
                userAddress: '',
                userPubKey: null,
                accountExists: false,
                isConnecting: false,
                loadingZkClient: false
            }))
            localStorage.setItem(LocalStorageKey.IsConnected, LocalStorageValue.IsConnectedNo);
        }


    }
    async function disconnectWallet () {
        localStorage.setItem(LocalStorageKey.IsConnected, LocalStorageValue.IsConnectedNo);
        window.location.reload();
    }

    return {
        connectWallet,
        disconnectWallet
    }

}

export default useAuroWallet
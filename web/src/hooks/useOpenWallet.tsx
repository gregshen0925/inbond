import { useState } from 'react';

const useOpenWallet = () => {
  const [connectModalOn, setConnectModalOn] = useState<boolean>(false);
  const [walletInfoModalOn, setWalletInfoModalOn] = useState<boolean>(false);

  return {
    connectModalOn,
    setConnectModalOn,
    walletInfoModalOn,
    setWalletInfoModalOn,
  };
};

export default useOpenWallet;

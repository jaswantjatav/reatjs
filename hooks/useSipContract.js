import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SIPContractABI from 'abis/SocialImpactRunner.json';

const SIP_CONTRACT_ADDRESS = '0x050De9CCaa981DbfB629CAeCE5627c8ac27A4e09';
const POLYGON_RPC_URL = 'https://polygon-mainnet.g.alchemy.com/v2/wZFKN1XlPQsIWCrhHVXS8HzIMiFfDpKp';

export const useSipContract = () => {
  const [provider, setProvider] = useState();
  const [sipContract, setSipContract] = useState();
  
  useEffect(() => {
    const _provider = new ethers.providers.JsonRpcProvider(POLYGON_RPC_URL);
    const _sipContract = new ethers.Contract(SIP_CONTRACT_ADDRESS, SIPContractABI, _provider);

    setProvider(_provider);
    setSipContract(_sipContract);
  }, []);

  return { provider, sipContract };
}

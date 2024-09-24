import { Contract, BrowserProvider } from "ethers"; // Directly import needed functions
import tokenAContractAbi from "../ABI/tokenA.json";
import tokenBContractAbi from "../ABI/tokenB.json";
import dexContractAbi from "../ABI/dex.json";

let provider, signer;

const getProviderAndSigner = async () => {
  if (!provider) {
    provider = new BrowserProvider(window.ethereum); // Web3Provider import
    await provider.send("eth_requestAccounts", []); // MetaMask connection
    signer = await provider.getSigner();
  }
  return { provider, signer };
};

const getContract = async (address, abi) => {
  const { signer } = await getProviderAndSigner(); // Ensure MetaMask connection is established once
  return new Contract(address, abi, signer);
};

// Instantiate Token A Contract
const tokenAContract = async () => {
  return await getContract(
    process.env.REACT_APP_TOKEN_A_ADDRESS,
    tokenAContractAbi
  );
};

// Instantiate Token B Contract
const tokenBContract = async () => {
  return await getContract(
    process.env.REACT_APP_TOKEN_B_ADDRESS,
    tokenBContractAbi
  );
};

// Instantiate DEX Contract
const dexContract = async () => {
  return await getContract(process.env.REACT_APP_DEX_ADDRESS, dexContractAbi);
};

export { tokenAContract, tokenBContract, dexContract };

import { useState } from "react";
import "./App.css";
import WalletInfo from "./components/WalletInfo";
import DexStat from "./components/DexStat";
import { Box } from "@mui/material";

function App() {
  const [account, setAccount] = useState();

  const handleConnect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  };
  return (
    <>
      <WalletInfo accountAddress={account} handleConnect={handleConnect} />
      <Box>
        <DexStat />
      </Box>
    </>
  );
}

export default App;

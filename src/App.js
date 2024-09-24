import { useEffect, useState } from "react";
import "./App.css";
import WalletInfo from "./components/WalletInfo";
import DexStat from "./components/DexStat";
import { Box } from "@mui/material";
import AddLiquidity from "./components/AddLiquidity";
import SwapTokens from "./components/SwapTokens";
import RemoveLiquidity from "./components/RemoveLiquidity";

function App() {
  const [account, setAccount] = useState();
  const [owner, setOwner] = useState();

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

  useEffect(() => {
    handleConnect();
  }, []);
  return (
    <>
      <WalletInfo accountAddress={account} handleConnect={handleConnect} />
      <Box display="flex">
        <DexStat setOwner={setOwner} />
        <Box>
          {" "}
          <AddLiquidity />
          <RemoveLiquidity />
        </Box>
        <Box>
          <SwapTokens />

          {owner &&
            account &&
            owner.toLowerCase() === account.toLowerCase() && (
              <AddLiquidity isOwner={true} />
            )}
        </Box>
      </Box>
    </>
  );
}

export default App;

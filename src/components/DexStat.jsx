import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import "./styles.css"; // Import your external CSS
import { dexContract } from "../configs/contract.config";

const DexStat = () => {
  // State variables to store statistics
  const [dexStats, setDexStats] = useState({
    FEE_DENOMINATOR: 0,
    FEE_MULTIPLIER: 0,
    FEE_PERCENTAGE: 0,
    owner: "",
    tokenA: "",
    tokenB: "",
    tokenABalance: 0,
    tokenBBalance: 0,
    totalLiquidity: 0,
  });

  const [userAddress, setUserAddress] = useState("");
  const [userLiquidity, setUserLiquidity] = useState(0);

  const getDEXStats = async () => {
    const dex = await dexContract();
    console.log("dex", dex);
    const totalLiquidity = await dex.totalLiquidity();
    console.log("total", totalLiquidity);
  };

  useEffect(() => {
    getDEXStats();
  }, []);

  return (
    <Card className="dex-card">
      <CardContent>
        <Typography className="dex-title" variant="h6">
          DEX Statistics
        </Typography>
        <div className="dex-stats">
          <Typography variant="body1">
            FEE_DENOMINATOR: {dexStats.FEE_DENOMINATOR}
          </Typography>
          <Typography variant="body1">
            FEE_MULTIPLIER: {dexStats.FEE_MULTIPLIER}
          </Typography>
          <Typography variant="body1">
            FEE_PERCENTAGE: {dexStats.FEE_PERCENTAGE}%
          </Typography>
          <Typography variant="body1">Owner: {dexStats.owner}</Typography>
          <Typography variant="body1">Token A: {dexStats.tokenA}</Typography>
          <Typography variant="body1">Token B: {dexStats.tokenB}</Typography>
          <Typography variant="body1">
            Token A Balance: {dexStats.tokenABalance}
          </Typography>
          <Typography variant="body1">
            Token B Balance: {dexStats.tokenBBalance}
          </Typography>
          <Typography variant="body1">
            Total Liquidity: {dexStats.totalLiquidity}
          </Typography>
        </div>

        {/* User Liquidity Section */}
        <div className="user-liquidity">
          <Typography variant="h6" className="liquidity-title">
            Check User Liquidity
          </Typography>
          <TextField
            label="User Address"
            variant="outlined"
            fullWidth
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            className="user-address"
          />
          <Button
            variant="contained"
            color="primary"
            // onClick={handleFetchUserLiquidity}
            style={{ marginTop: "16px" }}
          >
            Fetch User Liquidity
          </Button>

          {userLiquidity !== 0 && (
            <Typography variant="body1" style={{ marginTop: "12px" }}>
              User Liquidity: {userLiquidity}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DexStat;

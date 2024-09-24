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

const DexStat = ({ setOwner }) => {
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
    try {
      const dex = await dexContract();

      // Fetch all DEX statistics
      const FEE_DENOMINATOR = (await dex.FEE_DENOMINATOR()).toString();
      const FEE_MULTIPLIER = (await dex.FEE_MULTIPLIER()).toString();
      const FEE_PERCENTAGE = (await dex.FEE_PERCENTAGE()).toString();
      const owner = await dex.owner();
      const tokenA = await dex.tokenA();
      const tokenB = await dex.tokenB();
      const tokenABalance = (await dex.tokenABalance()).toString();
      const tokenBBalance = (await dex.tokenBBalance()).toString();
      const totalLiquidity = (await dex.totalLiquidity()).toString();

      // Update the state with the fetched values
      setOwner(owner);

      setDexStats({
        FEE_DENOMINATOR,
        FEE_MULTIPLIER,
        FEE_PERCENTAGE,
        owner,
        tokenA,
        tokenB,
        tokenABalance,
        tokenBBalance,
        totalLiquidity,
      });
    } catch (error) {
      console.error("Error fetching DEX stats:", error);
    }
  };

  const handleFetchUserLiquidity = async () => {
    try {
      const dex = await dexContract();
      const liquidity = await dex.userLiquidity(userAddress);
      setUserLiquidity(liquidity.toString());
    } catch (error) {
      console.error("Error fetching user liquidity:", error);
    }
  };

  useEffect(() => {
    getDEXStats();
  }, []);

  return (
    <Card className="dex-card">
      <CardContent>
        <Typography
          className="dex-title"
          variant="h6"
          color="primary"
          textAlign="center"
          fontWeight="bold"
        >
          DEX Statistics
        </Typography>
        <div className="dex-stats">
          <Typography variant="body1">
            <span className="stat-heading"> FEE_DENOMINATOR:</span>{" "}
            {dexStats.FEE_DENOMINATOR}
          </Typography>
          <Typography variant="body1">
            <span className="stat-heading">FEE_MULTIPLIER:</span>{" "}
            {dexStats.FEE_MULTIPLIER}
          </Typography>
          <Typography variant="body1">
            <span className="stat-heading">FEE_PERCENTAGE:</span>{" "}
            {dexStats.FEE_PERCENTAGE}%
          </Typography>
          <Typography variant="body1">
            <span className="stat-heading">Owner:</span> {dexStats.owner}
          </Typography>
          <Typography variant="body1">
            <span className="stat-heading">Token A:</span> {dexStats.tokenA}
          </Typography>
          <Typography variant="body1">
            <span className="stat-heading">Token B:</span> {dexStats.tokenB}
          </Typography>
          <Typography variant="body1">
            <span className="stat-heading">Token A Balance:</span>{" "}
            {dexStats.tokenABalance}
          </Typography>
          <Typography variant="body1">
            <span className="stat-heading">Token B Balance:</span>{" "}
            {dexStats.tokenBBalance}
          </Typography>
          <Typography variant="body1">
            <span className="stat-heading">Total Liquidity:</span>{" "}
            {dexStats.totalLiquidity}
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
            onClick={handleFetchUserLiquidity}
            style={{ marginTop: "16px" }}
          >
            Fetch User Liquidity
          </Button>

          {userLiquidity !== 0 && (
            <Typography variant="body1" style={{ marginTop: "12px" }}>
              <span className="stat-heading">User Liquidity:</span>{" "}
              {userLiquidity}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DexStat;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import "./styles.css"; // Import your external CSS
import { dexContract } from "../configs/contract.config";
import { parseUnits, formatUnits } from "ethers"; // For ethers v6.x

const AddLiquidity = ({ isOwner = false }) => {
  const [tokenAAmount, setTokenAAmount] = useState(0);
  const [tokenBAmount, setTokenBAmount] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState("");

  const handleAddLiquidity = async () => {
    try {
      const dex = await dexContract();

      // Call the smart contract function to add liquidity

      const tokenAAmountInWei = parseUnits(tokenAAmount.toString(), 18);
      const tokenBAmountInWei = parseUnits(tokenBAmount.toString(), 18);

      let transaction;

      if (isOwner) {
        transaction = await dex.init(tokenAAmountInWei, tokenBAmountInWei);
      } else {
        transaction = await dex.addLiquidity(
          tokenAAmountInWei,
          tokenBAmountInWei
        );
      }

      console.log("transaction", transaction);

      setTransactionStatus("Transaction sent: " + transaction.hash);

      // Wait for transaction to be mined
      await transaction.wait();

      setTransactionStatus("Liquidity added successfully!");
    } catch (error) {
      console.error("Error adding liquidity:", error);
      setTransactionStatus("Failed to add liquidity.");
    }
  };

  return (
    <Card className="add-liquidity-card">
      <CardContent>
        <Typography
          className="add-liquidity-title"
          variant="h6"
          color="primary"
          textAlign="center"
          fontWeight="bold"
          mt={3}
        >
          {isOwner ? "Initialize Liquidity" : " Add Liquidity"}
        </Typography>

        <TextField
          label="Token A Amount"
          type="number"
          variant="outlined"
          fullWidth
          value={tokenAAmount}
          onChange={(e) => setTokenAAmount(e.target.value)}
          className="token-amount"
          style={{ marginBottom: "20px" }}
        />

        <TextField
          label="Token B Amount"
          type="number"
          variant="outlined"
          fullWidth
          value={tokenBAmount}
          onChange={(e) => setTokenBAmount(e.target.value)}
          className="token-amount"
          style={{ marginBottom: "20px" }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddLiquidity}
        >
          {isOwner ? "Initialize Liquidity" : "Add Liquidity"}
        </Button>

        {transactionStatus && (
          <Typography
            variant="body1"
            className="transaction-status"
            style={{ marginTop: "16px" }}
          >
            {transactionStatus}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AddLiquidity;

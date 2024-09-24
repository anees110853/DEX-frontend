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
import { parseUnits } from "ethers"; // For ethers v6.x

const SwapTokens = () => {
  const [amount, setAmount] = useState(0);
  const [isTokenAtoB, setIsTokenAtoB] = useState(true);
  const [transactionStatus, setTransactionStatus] = useState("");

  const handleSwap = async () => {
    try {
      const dex = await dexContract();
      const amountInWei = parseUnits(amount.toString(), 18);

      const transaction = await dex.swap(amountInWei, isTokenAtoB);
      console.log("transaction", transaction);
      setTransactionStatus("Transaction sent: " + transaction.hash);

      await transaction.wait();
      setTransactionStatus("Tokens swapped successfully!");
    } catch (error) {
      console.error("Error swapping tokens:", error);
      setTransactionStatus("Failed to swap tokens.");
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
          Swap Tokens
        </Typography>

        <TextField
          label="Amount to Swap"
          type="number"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="token-amount"
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setIsTokenAtoB(!isTokenAtoB)}
        >
          Switch to {isTokenAtoB ? "Token B" : "Token A"}
        </Button>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSwap}
          style={{ marginTop: "10px" }}
        >
          Swap Tokens
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

export default SwapTokens;

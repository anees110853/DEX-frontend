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

const RemoveLiquidity = ({ isOwner = false }) => {
  const [amountToRemove, setAmountToRemove] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState("");

  const handleRemoveLiquidity = async () => {
    try {
      const dex = await dexContract();
      const amountToRemoveInWei = parseUnits(amountToRemove.toString(), 18);

      const transaction = await dex.removeLiquidity(amountToRemoveInWei);
      console.log("transaction", transaction);
      setTransactionStatus("Transaction sent: " + transaction.hash);

      await transaction.wait();
      setTransactionStatus("Liquidity removed successfully!");
    } catch (error) {
      console.error("Error removing liquidity:", error);
      setTransactionStatus("Failed to remove liquidity.");
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
          Remove Liquidity
        </Typography>

        <TextField
          label="Amount to Remove"
          type="number"
          variant="outlined"
          fullWidth
          value={amountToRemove}
          onChange={(e) => setAmountToRemove(e.target.value)}
          className="token-amount"
          style={{ marginTop: "16px", marginBottom: "20px" }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRemoveLiquidity}
          style={{ marginBottom: "30px" }}
        >
          Remove Liquidity
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

export default RemoveLiquidity;

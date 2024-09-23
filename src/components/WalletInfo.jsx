import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "./styles.css"; // Import external CSS for styling

const WalletInfo = ({ accountAddress, handleConnect }) => {
  const defaultAddress = "0x0000000000000000000000000000000000000000";

  return (
    <Card className="wallet-card">
      <CardContent>
        <Typography className="wallet-title" variant="h6" component="div">
          Connected Address
        </Typography>
        <Typography className="wallet-address" variant="body1" component="p">
          {accountAddress ? accountAddress : defaultAddress}
        </Typography>
      </CardContent>
      <Button
        className="connect-button"
        variant="contained"
        color="primary"
        onClick={handleConnect}
      >
        {accountAddress ? "Reconnect Wallet" : "Connect Wallet"}
      </Button>
    </Card>
  );
};

export default WalletInfo;

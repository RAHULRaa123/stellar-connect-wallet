import React, { useState } from "react";
import { checkConnection, retrievePublicKey, getBalance } from "./Freighter";

const Header = ({ setPubKey }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState("0");

  const connectWallet = async () => {
    try {
      const allowed = await checkConnection();

      if (!allowed) {
        alert("Permission denied");
        return;
      }

      const key = await retrievePublicKey();
      const bal = await getBalance();

      setPublicKey(key);
      setPubKey(key); // 🔥 MOST IMPORTANT
      setBalance(Number(bal).toFixed(2));
      setConnected(true);

      console.log("Connected:", key);

    } catch (e) {
      console.error(e);
      alert("Connection failed");
    }
  };

  return (
    <div>
      <h2>Stellar dApp</h2>

      {publicKey && (
        <>
          <div>{`${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`}</div>
          <div>Balance: {balance} XLM</div>
        </>
      )}

      <button onClick={connectWallet}>
        {connected ? "Connected" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Header;
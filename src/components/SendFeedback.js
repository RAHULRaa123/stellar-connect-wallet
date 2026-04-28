import React, { useState, useContext } from "react";
import { pubKeyData } from "../App";
import { sendFeedback } from "./Soroban";

function SendFeedback() {
  const [fbData, setFbData] = useState("");
  const [fbId, setFbId] = useState(null);
  const pubKey = useContext(pubKeyData);

  const handleCreateFeedback = async () => {
    console.log("pubKey:", pubKey);

    if (!pubKey) {
      alert("Pehle wallet connect karo");
      return;
    }

    if (!fbData.trim()) {
      alert("Feedback likho");
      return;
    }

    try {
      const result = await sendFeedback(pubKey, fbData);
      setFbId(result);
      setFbData(""); // input clear
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction failed");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-green-300 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Create Feedback</h2>

      <input
        type="text"
        placeholder="Enter your feedback"
        value={fbData}
        onChange={(e) => setFbData(e.target.value)}
        className="p-2 rounded mb-2 w-full"
      />

      <button
        onClick={handleCreateFeedback}
        className="bg-orange-700 text-white p-2 rounded"
      >
        Create
      </button>

      <div className="mt-4 text-center">
        <h3 className="font-semibold">Feedback Id:</h3>
        <p>{fbId !== null ? fbId : "No Feedback Yet"}</p>
      </div>
    </div>
  );
}

export default SendFeedback;
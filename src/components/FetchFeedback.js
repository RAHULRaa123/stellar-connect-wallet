import React, { useState, useContext } from "react";
import { pubKeyData } from "../App";
import { fetchFeedback } from "./Soroban";

function FetchFeedback() {
  const [fbData, setFbData] = useState(null);
  const [fbId, setFbId] = useState("");
  const pubKey = useContext(pubKeyData);

  const handleFetchFeedback = async () => {
    if (!pubKey) {
      alert("Pehle wallet connect karo");
      return;
    }

    if (!fbId) {
      alert("Feedback ID daalo");
      return;
    }

    try {
      const result = await fetchFeedback(pubKey, Number(fbId));
      setFbData(result);
    } catch (error) {
      console.error(error);
      setFbData(null);
      alert("Invalid ID ya data exist nahi karta");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-orange-300 rounded-lg">

      <h2 className="text-xl font-bold mb-2">Check Feedback</h2>

      <input
        type="text"
        placeholder="Enter Feedback ID"
        value={fbId}
        onChange={(e) => setFbId(e.target.value)}
        className="p-2 rounded mb-2 w-full"
      />

      <button
        onClick={handleFetchFeedback}
        className="bg-orange-700 text-white p-2 rounded"
      >
        Fetch
      </button>

      <div className="mt-4 text-center">
        <h3 className="font-semibold">Feedback:</h3>

        {fbData ? (
          <>
            <p>ID: {fbData.fb_id}</p>
            <p>Message: {fbData.message}</p>
          </>
        ) : (
          <p>No Data</p>
        )}
      </div>

    </div>
  );
}

export default FetchFeedback;
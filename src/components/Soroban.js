import {
  Contract,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  nativeToScVal,
  scValToNative,
  rpc as StellarRpc,
} from "@stellar/stellar-sdk";

import { userSignTransaction } from "./Freighter";

/* ================= Config ================= */

const RPC_URL = "https://soroban-testnet.stellar.org:443";
const NETWORK = Networks.TESTNET;

// Tumhara caller contract address
const CONTRACT_ADDRESS = "CBGOBZLELYYHDOWYV7ZHHF4BP2DTPGYFRGAQDGJQZKCBNIXLLXD7UAQB";

const server = new StellarRpc.Server(RPC_URL);

const TX_PARAMS = {
  fee: BASE_FEE,
  networkPassphrase: NETWORK,
};

/* ================= Core Function ================= */

async function contractInt(caller, fnName, values) {
  const sourceAccount = await server.getAccount(caller);
  const contract = new Contract(CONTRACT_ADDRESS);

  const builder = new TransactionBuilder(sourceAccount, TX_PARAMS);

  if (Array.isArray(values)) {
    builder.addOperation(contract.call(fnName, ...values));
  } else if (values !== undefined && values !== null) {
    builder.addOperation(contract.call(fnName, values));
  } else {
    builder.addOperation(contract.call(fnName));
  }

  const tx = builder.setTimeout(30).build();

  const preparedTx = await server.prepareTransaction(tx);
  const xdr = preparedTx.toXDR();

  const signed = await userSignTransaction(xdr, caller);

  const signedTx = TransactionBuilder.fromXDR(
    signed.signedTxXdr,
    NETWORK
  );

  const send = await server.sendTransaction(signedTx);

  for (let i = 0; i < 10; i++) {
    const res = await server.getTransaction(send.hash);

    if (res.status === "SUCCESS") {
      if (res.returnValue) {
        return scValToNative(res.returnValue);
      }
      return null;
    }

    if (res.status === "FAILED") {
      throw new Error("Transaction failed");
    }

    await new Promise((r) => setTimeout(r, 1000));
  }

  throw new Error("Transaction timeout");
}

/* ================= Contract Functions ================= */

// OLD functions (keep them)
async function sendFeedback(caller, feedbackText) {
  try {
    const value = nativeToScVal(feedbackText, { type: "string" });
    const result = await contractInt(caller, "send_feedback", value);
    return Number(result);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchFeedback(caller, feedbackId) {
  try {
    const value = nativeToScVal(feedbackId);
    const result = await contractInt(caller, "fetch_feedback", value);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ================= NEW FUNCTION (IMPORTANT FIX) ================= */

async function sendFeedbackAndReward(caller, feedbackText) {
  try {
    const values = [
      nativeToScVal(CONTRACT_ADDRESS, { type: "address" }),
      nativeToScVal(CONTRACT_ADDRESS, { type: "address" }),
      nativeToScVal(caller, { type: "address" }),
      nativeToScVal(feedbackText, { type: "string" }),
    ];

    const result = await contractInt(
      caller,
      "send_feedback_and_reward",
      values
    );

    return Number(result);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* ================= Exports ================= */

export { sendFeedback, fetchFeedback, sendFeedbackAndReward };
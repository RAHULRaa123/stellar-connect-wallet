# 🚀 Stellar Connect Wallet Mini dApp

## 🔗 Live Demo  
https://stellar-connect-wallet-l4vw.vercel.app  

---

## 📌 Description  
This is a complete **end-to-end Stellar Mini dApp** built on the **Stellar Testnet** using Freighter Wallet.  

The application allows users to:
- Connect their wallet  
- Send XLM transactions  
- Interact with deployed smart contracts  
- Store and fetch anonymous feedback on-chain  

This project demonstrates full-stack Web3 development including frontend, smart contract, testing, deployment, and advanced contract interactions.

---

## 🟢 Features  

### Level 1
- Connect Freighter Wallet  
- Disconnect Wallet  
- Display XLM Balance  
- Send XLM  
- Transaction Status  

### Level 2
- Smart Contract Integration  
- Send Feedback to Blockchain  
- Fetch Feedback from Blockchain  
- Transaction Tracking  

### Level 3
- Loading states (UI feedback)  
- Error handling  
- Fully deployed app (Vercel)  
- Clean UI  

### 🟢 Level 4 (Advanced Features)
- Inter-contract call (Caller → Feedback Contract)  
- Custom Token Contract (Mint + Balance)  
- On-chain interaction between multiple contracts  
- Production-ready contract structure  

---

## 🧠 Smart Contracts  

### 📌 Feedback Contract  
**Contract Address:**  
CBXTSVTRCTXSJYYTGGV6G5R3F4EI73B3QW3SZ2MAZXMFEW445VQW7MOJ  

**Functions**
- `send_feedback`  
- `fetch_feedback`  

---

### 📌 Token Contract  
**Contract Address:**  
CCUNRZQPLTIPELMXVCIMDLZP3B4RLXJCGB3NPWHDUNFJNVATKAGIRPAJ  

**Functions**
- `mint`  
- `balance`  

---

### 📌 Caller Contract (Inter-Contract)  
**Contract Address:**  
CCRR3NARGJ6UYRKW7N42KVN6KL6VXEHXA7AHYMB7URS7T7FIE35XCLJC  

**Function**
- `send_feedback_and_reward`  
  → Calls `send_feedback` in Feedback Contract  

---

## 🔗 Level 4 Transaction Proof  

**Transaction Hash:**  
f498be49a48fd79f2fe7f4ff6a53ec09df5f911ed631ae34f2e18bde448c480c  

🔗 Explorer:  
https://stellar.expert/explorer/testnet/tx/f498be49a48fd79f2fe7f4ff6a53ec09df5f911ed631ae34f2e18bde448c480c  

---

## 📸 Level 4 Proof  

### ✅ Inter-contract call success  
![Inter Contract](./inter-contract-success.png)

### ✅ Fetch feedback from blockchain  
![Fetch Feedback](./fetch-feedback.png)

---

## ⚙️ CI/CD Pipeline  

This project includes a **GitHub Actions CI/CD pipeline** that automatically runs on every push to the main branch.

### ✅ Features:
- Automatic workflow execution  
- Continuous Integration setup  
- Ensures project consistency  

![CI/CD](./ci-cd.png)

---

## ✅ Result  

Successfully executed inter-contract call, minted tokens, and stored data on-chain:

```bash
2
"FINAL SUCCESS"
```
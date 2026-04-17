import { signTransaction, setAllowed, getAddress } from '@stellar/freighter-api';
import * as StellarSdk from '@stellar/stellar-sdk';

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

const checkConnection = async () => {
  return await setAllowed();
};

const retrievePublicKey = async () => {
  const { address } = await getAddress();
  return address;
};

const getBalance = async () => {
  await setAllowed();

  const { address } = await getAddress();

  const account = await server.loadAccount(address);

  const nativeBalance = account.balances.find(
    (bal) => bal.asset_type === 'native'
  );

  return nativeBalance ? nativeBalance.balance : '0';
};

const userSignTransaction = async (xdr, signWith) => {
  return await signTransaction(xdr, {
    networkPassphrase: StellarSdk.Networks.TESTNET, // ✅ FIX HERE
    accountToSign: signWith,
  });
};

export {
  checkConnection,
  retrievePublicKey,
  getBalance,
  userSignTransaction,
};
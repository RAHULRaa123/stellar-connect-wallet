import { StellarWalletsKit } from '@creit.tech/stellar-wallets-kit';

const kit = new StellarWalletsKit({
  network: 'TESTNET'
});

export const connectWallet = async () => {
  try {
    const { address } = await kit.openModal();
    return address;
  } catch (err) {
    console.log(err);
  }
};
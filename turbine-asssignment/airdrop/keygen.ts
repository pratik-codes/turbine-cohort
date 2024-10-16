import { Keypair } from "@solana/web3.js";
import base58 from "bs58";

// Generate a new random keypair
let kp = Keypair.generate();

// Get the public key in base58 format
const wallet = kp.publicKey.toBase58();
console.log(`You've generated a new Solana wallet: ${wallet}`);

// Secret key (Uint8Array) in base58 format
const secretKeyBase58 = base58.encode(kp.secretKey);
console.log(`Your secret key in base58: ${secretKeyBase58}`);

// Decoding the secret key from base58 back to Uint8Array
const secretKeyBytes = base58.decode(secretKeyBase58);
console.log(`This is your wallet in bytes: ${secretKeyBytes}`);

// Restore the keypair from the decoded secret key
const restoredKeypair = Keypair.fromSecretKey(secretKeyBytes);
console.log(`Restored keypair's secret key: [${restoredKeypair.secretKey}]`);

const secretKeyBytesTurbinWallet = base58.decode("31CYP1gqjJ2mACcPu1ttEZBZr3HR345KFKDNGYn5ue7GwesCTq4gdkHv7XQaYLnmbdUqjbG8NY3e39ytLWmCHPxD");

const restoredKeypairTurbinWallet = Keypair.fromSecretKey(secretKeyBytesTurbinWallet);

const newWallet = restoredKeypairTurbinWallet.publicKey.toBase58();

console.log(`Restored turbin-3 keypair's secret key: [${restoredKeypairTurbinWallet.secretKey}]`);

console.log(`Restored turbin-3 keypair's public key: [${newWallet}]`);
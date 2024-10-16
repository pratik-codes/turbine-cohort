import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// FLOW OF THE PROGRAM:
// 1. Initialize Connection to Solana Cluster
//    └── Connect to the Solana blockchain(Devnet, Testnet, Mainnet) using the `connection` object.

// 2. Generate Keypair
//    └── Create or load the payer's `keypair` to be used for signing transactions and paying fees.

// Mint Account: A standard Solana account that holds the token - specific data such as the mint authority, freeze authority, and token supply.It is not a PDA and is simply an account that follows the SPL Token Program's rules.
// 3. Create Token Mint Account
//    └── Allocate space and create a token mint account on Solana.
//        └── Assign a unique public key for the mint account.
//        └── Set up a Program Derived Address(PDA) to manage the mint's data securely.

// 4. Assign Mint Authority
//    └── Assign`keypair.publicKey` as the mint authority.
//        └── This public key will have permission to mint(create) new tokens in the future.

// 5. Specify Freeze Authority
//    └── Pass `null` to indicate no freeze authority.
//        └── No account will have the power to freeze / unfreeze token accounts associated with the mint.

// 6. Set Token Decimals
//    └── Define the token precision(number of decimal places) by setting`decimals`.
//        └── For example, `0` means no fractional values, ideal for NFTs or whole - number tokens.

// 7. Submit Transaction
//    └── Send the transaction to the Solana network, paying for account rent and transaction fees using the `keypair`.

// 8. Token Mint Account Created
//    └── A new token mint account is created with the following data:
//        └── Public Key of Mint Account
//        └── Mint Authority
//        └── Freeze Authority(if any)
//        └── Token Decimals
//    └── This mint account now exists on the Solana blockchain and can be used to mint tokens.



// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
  try {
    const mint = await createMint(connection, keypair, keypair.publicKey, null, 6);
    console.log("address", mint.toBase58());
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`)
  }
})()

// ouput: 
// 4nnxB1TSfSf1PDHqavQdq12joMYH6PN3fREJ1qawEa7L
// https://explorer.solana.com/address/4nnxB1TSfSf1PDHqavQdq12joMYH6PN3fREJ1qawEa7L?cluster=devnet

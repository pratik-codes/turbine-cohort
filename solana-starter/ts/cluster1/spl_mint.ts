// 1. Start Program(Async Function)
//    └── The program is initiated inside an asynchronous function.

// 2. Try Block Begins
//    └── Attempt the following steps, with error handling in case something goes wrong.

// 3. Create or Retrieve ATA(Associated Token Account)
//    └── Call `getOrCreateAssociatedTokenAccount`:
//        └── Parameters:
// - `connection`: Connection to the Solana cluster(devnet, testnet, mainnet).
//            - `keypair`: The keypair of the user, which will sign the transaction and pay the fees.
//            - `mint`: The public key of the token mint for which the ATA is being created.
//            - `keypair.publicKey`: The user’s public key, which will own the ATA.
//    └── The function checks if an ATA already exists for the user and mint:
//        └── If ATA exists: Retrieve the existing account.
//        └── If ATA does not exist: Create a new ATA.
//    └── Output: ATA is either retrieved or created.
//    └── Log the ATA's address using `console.log(ata.address.toBase58())`.

// 4. Mint Tokens to ATA
//    └── Call `mintTo`:
//        └── Parameters:
// - `connection`: Connection to the Solana cluster.
//            - `keypair`: The keypair that has minting authority.
//            - `mint`: The mint account for the token.
//            - `ata.address`: The ATA address to which tokens will be minted.
//            - `keypair.publicKey`: The mint authority, which must sign the minting transaction.
//            - `token_decimals`: The amount of tokens to mint, considering the decimal precision.
//    └── Mint a specified amount of tokens to the user's ATA.
//    └── Output: Transaction ID(TxID) of the minting process.
//    └── Log the mint transaction ID using`console.log(mintTx)`.

// 5. Catch Block(Error Handling)
//    └── If any errors occur during the ATA creation or minting process, catch the error.
//    └── Log the error using`console.log`.

// 6. End Program
//    └── The asynchronous program completes its execution.


import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("4nnxB1TSfSf1PDHqavQdq12joMYH6PN3fREJ1qawEa7L");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair.publicKey, token_decimals);
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()


// output: 
// Your ata is: AdHZ9Uv1tAToXHdDFg265Y9ufgEH76pCq5DW3vGq1ab9
// Your mint txid: 2K51kEJhk3Eg4Wvz6oppYoDwhgDtsuueiLJyMufubtE3HMPkwgWaXUxpYNcMcobQq2nFGrtPGuS3p1L8wpPxCSDi
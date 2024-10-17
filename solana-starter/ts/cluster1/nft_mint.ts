import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
  let tx = await createNft(umi, {
    mint,
    name: "Pratik NFT",
    symbol: "#",
    uri: "https://devnet.irys.xyz/LdZpY92GhDFZTMbKYaTiPA6doTgaAVG7VTxcxg3Fh1t",
    sellerFeeBasisPoints: percentAmount(1)
  });
  let result = await tx.sendAndConfirm(umi);
  const signature = base58.encode(result.signature); console.log("Mint Address: ", mint.publicKey);
  console.log("Signature: ", signature);
})();

// Mint Address:  3CsnXGhGdSHufPdwD76vdkVZf2Kbqf8Gi3xzxRYpk7TY
// Signature:  2QjuC7GWVH8EVBiwLL7jeaj6FpQeTip3TXYjWapedF7vPW7K2mzR64RZxpwK5Xhv91JRCG2aZtRE7J3mi5JaAWdv
//
// mint - https://explorer.solana.com/address/3CsnXGhGdSHufPdwD76vdkVZf2Kbqf8Gi3xzxRYpk7TY?cluster=devnet
// tx - https://explorer.solana.com/tx/2QjuC7GWVH8EVBiwLL7jeaj6FpQeTip3TXYjWapedF7vPW7K2mzR64RZxpwK5Xhv91JRCG2aZtRE7J3mi5JaAWdv?cluster=devnet

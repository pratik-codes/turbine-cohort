import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {

    const image = await readFile("/Users/pratik/code/personal/turbine/solana-starter/ts/generug.png");
    const genImg = createGenericFile(image, "rug", {
      contentType: "image/png"
    });

    const [uri] = await umi.uploader.upload([genImg]);

    console.log("Your image URI: ", uri);
  }
  catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();

// OUTPUT:
// Mint Address:  DdY8VvJTwtGP4BH7S3h65XHCXhNjj8d1bxe5vR943jie
// https://devnet.irys.xyz/3XbotbJPPqiniJVH6dS1ziedSswVdUkHimZsXdWkpSCe

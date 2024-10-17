import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    const image = "https://devnet.irys.xyz/3XbotbJPPqiniJVH6dS1ziedSswVdUkHimZsXdWkpSCe";

    const metadata = {
      name: "Pratik NFT",
      symbol: "#",
      description: "A nft created by Pratik",
      image: image,
      attributes: [
        { trait_type: 'Background', value: 'Blue' },
        { trait_type: 'Eyes', value: 'Glowing' }
      ],
      properties: {
        files: [
          {
            type: "image/png",
            uri: image
          },
        ]
      },
      creators: ["FLKwcEaLf5F67vh6QKTRYc7gXU1fdWmma9Dx5jry1Sbs"]
    };

    // Create a generic file for the metadata
    const file = createGenericFile(JSON.stringify(metadata), 'metadata.json');

    // Upload the metadata to irys and get the URI
    const myUri = await umi.uploader.upload([file]);

    console.log("Your metadata URI: ", myUri);
  }
  catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();

// Your metadata URI:  [ 'https://devnet.irys.xyz/LdZpY92GhDFZTMbKYaTiPA6doTgaAVG7VTxcxg3Fh1t' ]
// {"name":"Pratik NFT","symbol":"#","description":"A nft created by Pratik","image":"https://devnet.irys.xyz/3XbotbJPPqiniJVH6dS1ziedSswVdUkHimZsXdWkpSCe","attributes":[{"trait_type":"Background","value":"Blue"},{"trait_type":"Eyes","value":"Glowing"}],"properties":{"files":[{"type":"image/png","uri":"https://devnet.irys.xyz/3XbotbJPPqiniJVH6dS1ziedSswVdUkHimZsXdWkpSCe"}]},"creators":["FLKwcEaLf5F67vh6QKTRYc7gXU1fdWmma9Dx5jry1Sbs"]}




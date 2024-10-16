import base58 from 'bs58';

const phantomPrivateKeyBase58 = "31CYP1gqjJ2mACcPu1ttEZBZr3HR345KFKDNGYn5ue7GwesCTq4gdkHv7XQaYLnmbdUqjbG8NY3e39ytLWmCHPxD";

const privateKeyBytes = base58.decode(phantomPrivateKeyBase58);

console.log(Array.from(privateKeyBytes));

import { CeramicClient } from "@ceramicnetwork/http-client";
import KeyDidResolver from "key-did-resolver";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { randomBytes } from "@stablelib/random";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { DID } from "dids";

// set ceramic node URL
const API_URL = "https://ceramic-clay.3boxlabs.com";

// generate seed
const seed = randomBytes(32);
console.log(seed, 'seed');


// create provider
const provider = new Ed25519Provider(seed);

// conncet to a Ceramic node
const ceramic = new CeramicClient(API_URL);

// set provider to ceramic
ceramic.did?.setProvider(provider);

const ceramicProvider = async() => await ceramic.did?.authenticate();
ceramicProvider();

// DID methods to authenticate writes
const resolver = {
  ...KeyDidResolver.getResolver(),
  ...ThreeIdResolver.getResolver(ceramic),
};

// create a DID instance
const did = new DID({ resolver });

console.log(did,'did');


// set DID instance
ceramic.did = did;

const doc = await TileDocument.create(ceramic, { broadcast: "Hello" });
console.log(doc, 'doc');


export const users: any = { doc };

import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./icpass.did.js";

export { idlFactory } from "./icpass.did.js";
// CANISTER_ID is replaced by webpack based on node environment
export const canisterId = "kqaaa-aaaam-abqwa-cai";

/**
 * @deprecated since dfx 0.11.1
 * Do not import from `.dfx`, instead switch to using `dfx generate` to generate your JS interface.
 * @param {string | import("@dfinity/principal").Principal} canisterId Canister ID of Agent
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig} | { agent?: import("@dfinity/agent").Agent; actorOptions?: import("@dfinity/agent").ActorConfig }} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./icpass.did.js")._SERVICE>}
 */
export const createActor = async (canisterId, options = {}) => {
  console.warn(`Deprecation warning: you are currently importing code from .dfx. Going forward, refactor to use the dfx generate command for JavaScript bindings.

See https://internetcomputer.org/docs/current/developer-docs/updates/release-notes/ for migration instructions`);
  const agent = new HttpAgent({
    ...options.agentOptions,
    host: "https://icp0.io",
  });
  // Fetch root key for certificate validation during development
  // if (process.env.DFX_NETWORK !== "ic") {
  if("ic" == "ic"){
    agent.fetchRootKey().catch((err) => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }

  const idlFactory_ = ({ IDL }) => {
    const NewProfile = IDL.Record({
      "show_wallet_number" : IDL.Bool,
      "fullname" : IDL.Text,
      "system_notification" : IDL.Bool,
      "email_notification" : IDL.Bool,
    });
    const UserId__1 = IDL.Principal;
    const UserId = IDL.Principal;
    const Profile = IDL.Record({
      "id" : UserId,
      "show_wallet_number" : IDL.Bool,
      "fullname" : IDL.Text,
      "system_notification" : IDL.Bool,
      "email_notification" : IDL.Bool,
    });
    return IDL.Service({
      "create" : IDL.Func([NewProfile], [], ["call"]),
      "get" : IDL.Func([UserId__1], [Profile], ["query"]),
      "getOwnId" : IDL.Func([], [UserId__1], ["query"]),
      "healthcheck" : IDL.Func([], [IDL.Bool], []),
      "search" : IDL.Func([IDL.Text], [IDL.Vec(Profile)], ["query"]),
      "update" : IDL.Func([Profile], [], []),
    });
  };
  // Creates an actor with using the candid interface and the HttpAgent
  const canisterId_ = "rswqv-kqaaa-aaaam-abqwa-cai";
  return Actor.createActor(idlFactory_, {
    agent,
    canisterId: canisterId_,
    ...(options ? options.actorOptions : {}),
  });
};

/**
 * A ready-to-use agent for the icpass canister
 * @type {import("@dfinity/agent").ActorSubclass<import("./icpass.did.js")._SERVICE>}
 */
export const icpass = createActor(canisterId);

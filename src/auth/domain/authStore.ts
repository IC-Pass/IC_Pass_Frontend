import { defineStore } from "pinia";
import { ref, toRaw} from "vue";
import { AuthClient } from "@dfinity/auth-client";
import type { ActorMethod, ActorSubclass, Identity } from "@dfinity/agent";
import { createActor, canisterId } from "@/common/declarations/icpass_backend";
import { useHomeStore } from "@/home/domain/homeStore";

export type StoredKey = string | any;
export class AuthClientStorage {
  async get(key: string): Promise<StoredKey | null> {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  async set(key: string, value: StoredKey): Promise<void>{
    await localStorage.setItem(key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    await localStorage.removeItem(key);
  }
}

declare const ECDSA_KEY_LABEL = "ECDSA";
declare const ED25519_KEY_LABEL = "Ed25519";
declare type BaseKeyType = typeof ECDSA_KEY_LABEL | typeof ED25519_KEY_LABEL;

const defaultOptions = {
  createOptions: {
    keyType: "Ed25519" as BaseKeyType,
    storage: new AuthClientStorage(),
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider: "https://identity.ic0.app/#authorize"
  },
};

function actorFromIdentity(identity: Identity) {
  return createActor(canisterId, {
    agentOptions: {
      identity,
    },
  });
}

export const useAuthStore = defineStore("auth", () => {
  const homeStore = useHomeStore();

  const isReady = ref(false);

  const isAuthenticated = ref(false);

  const authClient = ref<AuthClient | null>(null);

  const identity = ref<Identity | null>(null);

  const whoamiActor = ref<ActorSubclass<
    Record<string, ActorMethod<unknown[], unknown>>
  > | null>(null);

  async function init() {
    authClient.value = await AuthClient.create(defaultOptions.createOptions);

    isAuthenticated.value = await authClient.value.isAuthenticated();

    identity.value = isAuthenticated.value
      ? authClient.value.getIdentity()
      : null;

    whoamiActor.value = identity.value
      ? await actorFromIdentity(identity)
      : null;
    isReady.value = true;
  }

  async function login() {
    const client = toRaw(authClient.value);
    client?.login({
      ...defaultOptions.loginOptions,
      onSuccess: async () => {
        isAuthenticated.value = await client.isAuthenticated();
        identity.value = isAuthenticated.value
          ? client.getIdentity()
          : null;
        whoamiActor.value = identity.value
          ? await actorFromIdentity(identity.value)
          : null;
        homeStore.isWelcomePass = false;
      },
    });
  }
  async function localCreateActor() {
    const profile = {
      show_wallet_number: true,
      fullname: "Vladys",
      system_notification: false,
      email_notification: false,
    };
    try {
      await whoamiActor.value.create(profile).catch((e) => {
        console.log(e);
      });
      const principal = await whoamiActor.value.getOwnId();
    } catch (e) {
      console.log(e);
    }
  }

  async function logout() {
    const client = toRaw(authClient.value);
    await client?.logout();
    isAuthenticated.value = false;
    identity.value = null;
    whoamiActor.value = null;
  }

  return {
    init,
    localCreateActor,
    login,
    isReady,
    isAuthenticated,
    authClient,
    identity,
    whoamiActor,
  };

});

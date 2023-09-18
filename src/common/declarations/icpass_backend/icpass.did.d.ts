import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface NewProfile {
  'show_wallet_number' : boolean,
  'fullname' : string,
  'system_notification' : boolean,
  'email_notification' : boolean,
}
export interface Profile {
  'id' : UserId,
  'show_wallet_number' : boolean,
  'fullname' : string,
  'system_notification' : boolean,
  'email_notification' : boolean,
}
export type UserId = Principal;
export type UserId__1 = Principal;
export interface _SERVICE {
  'create' : ActorMethod<[NewProfile], undefined>,
  'get' : ActorMethod<[UserId__1], Profile>,
  'getOwnId' : ActorMethod<[], UserId__1>,
  'healthcheck' : ActorMethod<[], boolean>,
  'search' : ActorMethod<[string], Array<Profile>>,
  'update' : ActorMethod<[Profile], undefined>,
}

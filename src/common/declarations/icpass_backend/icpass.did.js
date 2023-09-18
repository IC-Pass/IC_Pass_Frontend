export const idlFactory = ({ IDL }) => {
    const NewProfile = IDL.Record({
      'show_wallet_number' : IDL.Bool,
      'fullname' : IDL.Text,
      'system_notification' : IDL.Bool,
      'email_notification' : IDL.Bool,
    });
    const UserId__1 = IDL.Principal;
    const UserId = IDL.Principal;
    const Profile = IDL.Record({
      'id' : UserId,
      'show_wallet_number' : IDL.Bool,
      'fullname' : IDL.Text,
      'system_notification' : IDL.Bool,
      'email_notification' : IDL.Bool,
    });
    return IDL.Service({
      'create' : IDL.Func([NewProfile], [], []),
      'get' : IDL.Func([UserId__1], [Profile], ['query']),
      'getOwnId' : IDL.Func([], [UserId__1], ['query']),
      'healthcheck' : IDL.Func([], [IDL.Bool], []),
      'search' : IDL.Func([IDL.Text], [IDL.Vec(Profile)], ['query']),
      'update' : IDL.Func([Profile], [], []),
    });
  };
  export const init = ({ IDL }) => { return []; };
  
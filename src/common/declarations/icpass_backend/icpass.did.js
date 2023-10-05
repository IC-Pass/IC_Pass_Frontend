export const idlFactory = ({ IDL }) => {
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
  const newPassword = IDL.Record({
    "id": IDL.Principal,
    "tagId": IDL.nat8,
    "link": IDL.text,
    "password": IDL.text,
    "usernameEmail": IDL.text,
    "notes": IDL.text,
    "mediaId": IDL.nat8
  });
  return IDL.Service({
    "addNewAccount": IDL.Func([newPassword], [], ["variant"]),
    "create" : IDL.Func([NewProfile], [], []),
    "get" : IDL.Func([UserId__1], [Profile], ["query"]),
    "getOwnId" : IDL.Func([], [UserId__1], ["query"]),
    "healthcheck" : IDL.Func([], [IDL.Bool], []),
    "search" : IDL.Func([IDL.Text], [IDL.Vec(Profile)], ["query"]),
    "update" : IDL.Func([Profile], [], []),
  });
};
export const init = ({ IDL }) => [];

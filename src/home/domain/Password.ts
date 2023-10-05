export type Password = {
  template: string;
  usernameEmail: string;
  password: string;
  link: string;
  tag: {
    value: string | null;
    label: string;
    icon?: string;
  };
  notes: string;
};

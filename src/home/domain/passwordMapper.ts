import type { Password } from "@/home/domain/Password";
import { useAuthStore } from "@/auth/domain/authStore";
const authStore = useAuthStore();
export const passwordFromDto = async (input: string) => {

};

export const passwordToDto = async(input: Password):Promise<string> => {
  return "";
};

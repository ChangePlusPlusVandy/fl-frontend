import {
  User,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { create } from "zustand";
import { useFirebase } from "../firebase";
import { generateHmacSignature } from "../utils/signature";
import { API_SECRET, API_URL } from "@env";

export interface CreateUserProps {
  username: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  type: "Default" | "Staff" | "Family";
}

export interface SignInProps {
  emailAddress: string;
  password: string;
}

interface AuthStore {
  user: User | null;
  createAccount: ({
    username,
    emailAddress,
    password,
    type,
  }: CreateUserProps) => Promise<void>;
  signIn: ({ emailAddress, password }: SignInProps) => Promise<void>;
  logout: () => Promise<void>;
}

const firebase = useFirebase();
const auth = getAuth(firebase);

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  createAccount: async ({
    username,
    emailAddress,
    password,
    type,
  }: CreateUserProps) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        emailAddress,
        password
      );
      const body = JSON.stringify({
        firebaseUserId: user.uid,
        emailAddress: emailAddress,
        name: username,
        type: type,
      });
      const data = await fetch(`${API_URL}user/`, {
        method: "POST",
        headers: {
          "Friends-Life-Signature": generateHmacSignature(body, API_SECRET),
          "Content-Type": "application/json",
        },
        body: body,
      });
      console.log(await data.json());
      set({ user });
    } catch (e) {
      console.log(e);
    }
  },
  signIn: async ({ emailAddress, password }: SignInProps) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        emailAddress,
        password
      );
      set({ user });
    } catch (error) {
      console.log(error);
    }
  },
  logout: async () => {
    try {
      await signOut(auth);

      if (auth.currentUser === null) {
        console.log("Logged out");
      } else {
        console.log("Logout failed");
      }

      set({ user: null });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useAuthStore;

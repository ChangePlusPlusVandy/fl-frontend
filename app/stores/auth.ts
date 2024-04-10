import {
  User,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { create } from "zustand";
import { useFirebase } from "../firebase";
import { auth } from "../firebase";
import { generateHmacSignature } from "../utils/signature";
import { API_SECRET, API_URL } from "@env";
import { Alert } from "react-native";

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
  userId: string | null;
  createAccount: ({
    username,
    emailAddress,
    password,
    type,
  }: CreateUserProps) => Promise<void>;
  signIn: ({ emailAddress, password }: SignInProps) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuthState: () => Promise<void>;
  checkApproved: () => Promise<void>;
}

const firebase = useFirebase();

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  userId: null,
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
    } catch (e) {
      Alert.alert("Invalid sign up. Please try again.");
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

      const userData = await fetch(`${API_URL}user/firebase/${user.uid}`, {
        method: "GET",
        headers: {
          "Friends-Life-Signature": generateHmacSignature(
            JSON.stringify({ firebaseId: user.uid }),
            API_SECRET
          ),
        },
      });
      const userId = (await userData.json())._id;

      set({ user });
      set({ userId });
    } catch (error) {
      Alert.alert("Invalid credentials. Please try again.");
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
      set({ userId: null });
    } catch (error) {
      console.log(error);
    }
  },
  initializeAuthState: async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is logged in
        try {
          const userData = await fetch(`${API_URL}user/firebase/${user.uid}`, {
            method: "GET",
            headers: {
              "Friends-Life-Signature": generateHmacSignature(
                JSON.stringify({ firebaseId: user.uid }),
                API_SECRET
              ),
            },
          });
          const userId = (await userData.json())._id;

          set({ user, userId });
        } catch (error) {
          console.error("Failed to fetch user data", error);
          // Handle error, e.g., by setting user to null or showing an error message
        }
      } else {
        // User is logged out
        set({ user: null, userId: null });
      }
    });
  },
  checkApproved: async () => {
    try {
      if (useAuthStore.getState().userId !== null) {
        const response = await fetch(
          `${API_URL}user/${useAuthStore.getState().userId}`,
          {
            method: "GET",
            headers: {
              "Friends-Life-Signature": generateHmacSignature(
                JSON.stringify({ userId: useAuthStore.getState().userId }),
                API_SECRET
              ),
            },
          }
        );
        const user = await response.json();
        if (!user.approved) {
          alert("Your account is not approved yet. Please wait for approval.");
          await useAuthStore.getState().logout();
        }
      }
    } catch (error) {
      console.error("Error checking if user is approved:", error);
    }
  },
}));

useAuthStore.getState().initializeAuthState();
useAuthStore.getState().checkApproved();

export default useAuthStore;

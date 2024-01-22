import { firebase, FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";

export interface CreateUserProps {
    username: string
    emailAddress: string
    password: string
    confirmPassword: string
    type: 'Default' | 'Staff' | 'Family'
}

export interface SignInProps {
    emailAddress: string
    password: string
}

interface AuthStore {
    user: FirebaseAuthTypes.User | null;
    createAccount: ({ username, emailAddress, password, type }: CreateUserProps) => Promise<void>;
    signIn: ({ emailAddress, password }: SignInProps) => Promise<void>;
    logout: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    createAccount: async ({ username, emailAddress, password, type }: CreateUserProps) => {
        try {
            const { user } = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password);
            await fetch('api_url', {
                method: 'POST',
                body: JSON.stringify({
                    firbaseUserId: user.uid,
                    name: username,
                    type: type,
                }),
            });
            set({ user });
        } catch (e) {
            console.log(e);
        }
    },
    signIn: async ({ emailAddress, password }: SignInProps) => {
        try {
            const { user } = await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            set({ user });
        } catch (error) {
            console.log(error);
        }
    },
    logout: async () => {
        try {
            await firebase.auth().signOut();
            set({ user: null });
        } catch (error) {
            console.log(error);
        }
    },
}));

export default useAuthStore;
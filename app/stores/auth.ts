import { User, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { create } from "zustand";
import { useFirebase } from "../firebase";

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
    user: User | null;
    createAccount: ({ username, emailAddress, password, type }: CreateUserProps) => Promise<void>;
    signIn: ({ emailAddress, password }: SignInProps) => Promise<void>;
    logout: () => Promise<void>;
}

const firebase = useFirebase();
const auth = getAuth(firebase);

const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    createAccount: async ({ username, emailAddress, password, type }: CreateUserProps) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, emailAddress, password);
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
            const { user } = await signInWithEmailAndPassword(auth, emailAddress, password);
            set({ user });
        } catch (error) {
            console.log(error);
        }
    },
    logout: async () => {
        try {
            await signOut(auth);

            if (auth.currentUser === null) {
                console.log('Logged out');
            } else {
                console.log('Logout failed');
            }

            set({ user: null });
        } catch (error) {
            console.log(error);
        }
    },
}));

export default useAuthStore;
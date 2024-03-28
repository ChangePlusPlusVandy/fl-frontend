import useAuthStore from "../stores/auth";
import { generateHmacSignature } from "./signature";
import { API_SECRET, API_URL } from "@env";

const { logout } = useAuthStore();
const { userId } = useAuthStore();

export const checkApproved = async () => {
  try {
    const response = await fetch(`${API_URL}user/${userId}`, {
      method: "GET",
      headers: {
        "Friends-Life-Signature": generateHmacSignature(
          JSON.stringify({ userId: userId }),
          API_SECRET
        ),
      },
    });
    const user = await response.json();
    if (!user.approved) {
      alert("Your account is not approved yet. Please wait for approval.");
      await logout();
    }
  } catch (error) {
    console.error("Error checking if user is approved:", error);
  }
};

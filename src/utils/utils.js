import { googleLogout } from "@react-oauth/google";

export const logOut = () => {
  googleLogout();
  localStorage.removeItem("profile");
  window.location = "/login"
};

export function truncateString(str, maxLength) {
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}
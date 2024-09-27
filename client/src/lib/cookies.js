import { goto } from "$app/navigation";
import Cookies from "universal-cookie";

export const cookies = new Cookies(null, { path: "/" });

export const get_current_user = () => {
  try {
    /** @type {import("./types.js").User} */
    const user = JSON.parse(cookies.get("user"));
    return user;
  } catch (_e) {
    return undefined;
  }
};

export const logout = () => {
  for (const name of ["token", "user"]) {
    cookies.remove(name);
  }

  goto("/", { invalidateAll: true });
};

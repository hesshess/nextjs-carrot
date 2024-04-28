import { redirect } from "next/navigation";
import { getUserSession } from "./session";

export function authWithUserSession() {
  const userSession = getUserSession();
  if (!userSession) {
    redirect("/log-in");
  } else {
    return userSession;
  }
}

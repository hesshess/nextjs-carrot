import { User } from "@prisma/client";
import { cookies } from "next/headers";
import "server-only";

export function createUserSession(user: User) {
  cookies().set("user-session", JSON.stringify(user));
}

export function getUserSession() {
  const sessionData = cookies().get("user-session")?.value;
  return sessionData ? JSON.parse(sessionData) : undefined;
}

export function deleteUserSession() {
  cookies().delete("user-session");
}

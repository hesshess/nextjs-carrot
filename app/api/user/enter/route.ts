import { createUserSession, deleteUserSession } from "@lib/server/session";
import { NextRequest, NextResponse } from "next/server";
import client from "@lib/server/client";
interface RequestBody {
  email: string;
  type: "create-account" | "log-in";
}
interface RequestError {
  code: string;
  message: string;
}
export async function POST(req: NextRequest) {
  const { email, type } = (await req.json()) as RequestBody;

  let user = undefined;
  try {
    switch (type) {
      case "create-account":
        user = await client?.user.create({
          data: {
            email: email,
            name: email,
          },
        });
        break;
      case "log-in":
        user = await client?.user.findUnique({ where: { email: email } });
        if (user === null) throw { code: "OVERLAP" };
        break;
    }
  } catch (_error: unknown) {
    const error = _error as RequestError;
    let errorMessage = "Something error";
    if (error) {
      console.log(error);
      if (error.code === "OVERLAP") {
        errorMessage = "Error";
      }
    }

    return NextResponse.json({ ok: false, errorMessage: errorMessage });
  }
  if (user) {
    deleteUserSession();
    createUserSession(user);
    return NextResponse.json({ ok: true });
  }
}

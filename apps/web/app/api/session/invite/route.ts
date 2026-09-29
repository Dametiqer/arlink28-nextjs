// Accept a staff invite and sign in as the new account (the API returns a token).
import type { NextRequest } from "next/server";
import { startSession } from "@/utils/server/session";

export function POST(req: NextRequest) {
  return startSession(req, "/api/v1/users/invite/accept");
}

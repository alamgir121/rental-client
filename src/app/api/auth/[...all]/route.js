import { auth } from "@/lib/auth";
import { ensureMongoConnection } from "@/lib/mongo";
import { toNextJsHandler } from "better-auth/next-js";

const { GET: authGET, POST: authPOST } = toNextJsHandler(auth);

async function withDatabase(handler) {
  try {
    await ensureMongoConnection();
  } catch {
    return Response.json(
      { message: "Database unavailable. Please try again." },
      { status: 503 },
    );
  }
  return handler();
}

export const GET = (request) => withDatabase(() => authGET(request));
export const POST = (request) => withDatabase(() => authPOST(request));

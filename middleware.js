/*import { NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://present-drake-52558.upstash.io",
  token: process.env.UPSTASH_TOKEN,
});

const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
});*/

export default async function middleware(request) {
  /*const ip = request.ip ?? "127.0.0.1";
  const { success, pending, limit, reset, remaining } = await rateLimit.limit(
    ip
  );

  return success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/blocker", request.url));*/
}

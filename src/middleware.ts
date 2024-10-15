import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest) {
  const res = NextResponse.next()
  const cookie = req.cookies.get("sessionId")
  const themeCookie = req.cookies.get("Theme")

  if (!cookie) {
    res.cookies.set("sessionId", crypto.randomUUID())
  }
  if (!themeCookie) {
    res.cookies.set("Theme", "dark")
  }
  return res
}
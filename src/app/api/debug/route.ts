import { NextResponse } from "next/server";

export async function GET() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  return NextResponse.json({
    domain: domain || "NOT SET",
    tokenLength: token ? token.length : 0,
    tokenPreview: token ? token.substring(0, 8) + "..." : "NOT SET",
  });
}

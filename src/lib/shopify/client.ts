import { GraphQLClient } from "graphql-request";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!domain || !storefrontAccessToken) {
  console.warn(
    "Shopify environment variables not set. Using mock data fallback."
  );
}

const endpoint = domain
  ? `https://${domain}/api/2024-01/graphql.json`
  : "";

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken || "",
    "Content-Type": "application/json",
  },
});

export const isShopifyConfigured = Boolean(domain && storefrontAccessToken);

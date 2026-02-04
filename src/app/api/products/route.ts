import { NextResponse } from "next/server";
import { GraphQLClient } from "graphql-request";

const GET_PRODUCTS = `
  query GetProducts($first: Int = 20) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          vendor
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 2) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    return NextResponse.json({ error: "Shopify not configured" }, { status: 500 });
  }

  try {
    const client = new GraphQLClient(`https://${domain}/api/2024-01/graphql.json`, {
      headers: {
        "X-Shopify-Storefront-Access-Token": token,
        "Content-Type": "application/json",
      },
    });

    const data = await client.request<{ products: { edges: { node: any }[] } }>(GET_PRODUCTS, { first: 20 });

    const products = data.products.edges.map((edge) => {
      const p = edge.node;
      const price = parseFloat(p.priceRange.minVariantPrice.amount);
      const compareAtPrice = p.compareAtPriceRange?.minVariantPrice?.amount
        ? parseFloat(p.compareAtPriceRange.minVariantPrice.amount)
        : null;

      return {
        id: p.id,
        handle: p.handle,
        title: p.title,
        vendor: p.vendor,
        price,
        compareAtPrice: compareAtPrice && compareAtPrice > price ? compareAtPrice : null,
        images: p.images.edges.map((e: any) => e.node.url),
        variants: p.variants.edges.map((e: any) => ({
          id: e.node.id,
          title: e.node.title,
          available: e.node.availableForSale,
          price: parseFloat(e.node.price.amount),
        })),
        isNew: p.tags.some((t: string) => t.toLowerCase() === "new"),
        isSale: compareAtPrice !== null && compareAtPrice > price,
      };
    });

    return NextResponse.json({ products, count: products.length });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

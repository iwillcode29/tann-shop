import { NextResponse } from "next/server";
import { GraphQLClient } from "graphql-request";

const GET_PRODUCT = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
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
      images(first: 10) {
        edges {
          node {
            url
          }
        }
      }
      options {
        id
        name
        values
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
            }
            compareAtPrice {
              amount
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params;
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    return NextResponse.json({ error: "Shopify not configured", product: null }, { status: 500 });
  }

  try {
    const client = new GraphQLClient(`https://${domain}/api/2024-01/graphql.json`, {
      headers: {
        "X-Shopify-Storefront-Access-Token": token,
        "Content-Type": "application/json",
      },
    });

    const data = await client.request<{ product: any }>(GET_PRODUCT, { handle });

    if (!data.product) {
      return NextResponse.json({ product: null });
    }

    const p = data.product;
    const price = parseFloat(p.priceRange.minVariantPrice.amount);
    const compareAtPrice = p.compareAtPriceRange?.minVariantPrice?.amount
      ? parseFloat(p.compareAtPriceRange.minVariantPrice.amount)
      : null;

    const product = {
      id: p.id,
      handle: p.handle,
      title: p.title,
      description: p.description,
      vendor: p.vendor,
      tags: p.tags,
      price,
      compareAtPrice: compareAtPrice && compareAtPrice > price ? compareAtPrice : null,
      images: p.images.edges.map((e: any) => e.node.url),
      options: p.options.map((o: any) => ({
        id: o.id,
        name: o.name,
        values: o.values,
      })),
      variants: p.variants.edges.map((e: any) => ({
        id: e.node.id,
        title: e.node.title,
        available: e.node.availableForSale,
        price: parseFloat(e.node.price.amount),
        compareAtPrice: e.node.compareAtPrice ? parseFloat(e.node.compareAtPrice.amount) : null,
        options: e.node.selectedOptions,
      })),
      isNew: p.tags.some((t: string) => t.toLowerCase() === "new"),
      isSale: compareAtPrice !== null && compareAtPrice > price,
    };

    return NextResponse.json({ product });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message, product: null }, { status: 500 });
  }
}

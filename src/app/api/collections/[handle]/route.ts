import { NextResponse } from "next/server";
import { GraphQLClient } from "graphql-request";

const GET_COLLECTION_PRODUCTS = `
  query GetCollectionProducts($handle: String!, $first: Int = 50) {
    collection(handle: $handle) {
      id
      title
      description
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
    return NextResponse.json(
      { error: "Shopify not configured" },
      { status: 500 }
    );
  }

  try {
    const client = new GraphQLClient(
      `https://${domain}/api/2024-01/graphql.json`,
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await client.request<{
      collection: {
        id: string;
        title: string;
        description: string;
        products: { edges: { node: any }[] };
      } | null;
    }>(GET_COLLECTION_PRODUCTS, { handle, first: 50 });

    if (!data.collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    const products = data.collection.products.edges.map((edge) => {
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
        compareAtPrice:
          compareAtPrice && compareAtPrice > price ? compareAtPrice : null,
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

    return NextResponse.json({
      collection: {
        title: data.collection.title,
        description: data.collection.description,
      },
      products,
      count: products.length,
    });
  } catch (error: any) {
    console.error("Collection API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

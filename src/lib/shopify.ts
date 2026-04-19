const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Shopify API error: ${res.status} ${text}`);
    }

    const json = await res.json();

    if (json.errors) {
      throw new Error(json.errors.map((e: { message: string }) => e.message).join("\n"));
    }

    return json.data;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

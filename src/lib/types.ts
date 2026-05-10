export interface ShopifyImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale?: boolean;
  priceV2: Money;
  selectedOptions?: { name: string; value: string }[];
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  productType?: string;
  tags?: string[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice?: Money;
  };
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants: {
    edges: { node: ProductVariant }[];
  };
  options?: { name: string; values: string[] }[];
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products?: {
    edges: { node: Product }[];
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2: Money;
    product: {
      title: string;
      handle: string;
      images: {
        edges: { node: ShopifyImage }[];
      };
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
  };
  lines: {
    edges: { node: CartLine }[];
  };
}

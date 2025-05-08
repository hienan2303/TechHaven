import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const getAllStripeProducts = async (): Promise<Stripe.Product[]> => {
    let allProducts: Stripe.Product[] = [];
    let hasMore = true;
    let startingAfter: string | undefined = undefined;
  
    while (hasMore) {
      const response: Stripe.ApiList<Stripe.Product> = await stripe.products.list({
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
  
      allProducts = [...allProducts, ...response.data];
      hasMore = response.has_more;
  
      if (hasMore) {
        startingAfter = response.data[response.data.length - 1].id;
      }
    }
  
    return allProducts;
  };
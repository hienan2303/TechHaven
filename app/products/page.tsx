import { ProductList } from "@/components/product-list";
import { getAllStripeProducts } from "@/lib/stripe"; // assuming you wrote this function

export default async function ProductsPage() {
  const products = await getAllStripeProducts(); // this fetches all pages

  return (
    <div className="pb-8">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
        All Products
      </h1>
      <ProductList products={products} />
    </div>
  );
}

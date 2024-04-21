import { db } from "../../lib/database/db";

export default async function FetchPage() {
  const products = await db.query.products.findMany({
    columns: {
      id: true,
      greenSealURL: true,
      upc: true,
      name: true,
      description: true,
      imageUrl: true,
      productUrl: true,
      certifiedSince: true,
      companyName: true,
      companyLink: true,
      brand: true,
    },
    with: {
      category: {
        columns: {
          name: true,
        },
      },
    },
  });

  console.log(products);

  return <></>;
}

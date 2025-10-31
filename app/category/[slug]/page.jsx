// app/category/[slug]/page.jsx
import React from "react";
// import MinimalHeaderClient from "@/components/MinimalHeaderClient";
import CategoryProductsClient from "@/components/CategoryProductsClient";

export const dynamicParams = true;

// Required for static export
export async function generateStaticParams() {
  // Add your category slugs here
  return [
    { slug: "healthy-nuts" },
    { slug: "namkeens" },
    { slug: "organic-snacks" },
    { slug: "packages" },
    { slug: "combo-packs" },
    { slug: "snacks" },
    { slug: "nuts" },
  ];
}

export default function CategoryPage({ params }) {
  const slug = params?.slug ?? "";

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {/* Client-side product loader */}
        <CategoryProductsClient identifier={slug} />
      </main>
    </div>
  );
}

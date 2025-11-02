// app/category/[id]/page.jsx
import React from "react";
import CategoryProductsClient from "@/components/CategoryProductsClient";

export const dynamicParams = true;

// Required for static export
export async function generateStaticParams() {
  // Add your category IDs here
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "69" },
    { id: "70" },
    { id: "71" },
    { id: "72" },
    { id: "73" },
    { id: "74" },
    { id: "76" },
    { id: "77" },
    { id: "78" },
    { id: "79" },
    { id: "80" },
    { id: "82" },
  ];
}

export default function CategoryPage({ params }) {
  const id = params?.id ?? "";

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {/* Client-side product loader */}
        <CategoryProductsClient identifier={id} />
      </main>
    </div>
  );
}
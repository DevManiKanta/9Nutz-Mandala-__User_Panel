// app/category/[id]/[subcategory]/page.jsx
import React from "react";
import Footer from "@/components/Footer";
import CategoryProductsClient from "@/components/CategoryProductsClient";

export const dynamicParams = true;

// Required for static export
export async function generateStaticParams() {
  // Add your category/subcategory combinations here
  return [
    { id: "1", subcategory: "1" },
    { id: "69", subcategory: "1" },
    { id: "70", subcategory: "1" },
    { id: "71", subcategory: "1" },
    { id: "72", subcategory: "1" },
    { id: "73", subcategory: "1" },
  ];
}

export default function SubcategoryPage({ params }) {
  const id = params?.id ?? "";
  const subcategory = params?.subcategory ?? "";

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">
        {/* Breadcrumb top area (optional) */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-4">
            <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
            <span className="text-gray-300">/</span>
            <a href={`/category/${id}`} className="text-gray-500 hover:text-gray-700">Category {id}</a>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{subcategory}</span>
          </div>
        </div>

        {/* Client-side product loader */}
        <CategoryProductsClient identifier={`${id}/${subcategory}`} />
      </main>
      <Footer />
    </div>
  );
}
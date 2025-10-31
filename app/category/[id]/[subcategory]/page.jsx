import React from "react";
import Footer from "@/components/Footer";
import CategoryProductsClient from "@/components/CategoryProductsClient";
import { CATEGORIES_API_URL } from "@/lib/api";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const res = await fetch(CATEGORIES_API_URL, { cache: "force-cache" });
    const json = await res.json().catch(() => null);
    const cats = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    const pairs = [];
    for (const c of cats) {
      const id = c?.id ?? c?._id ?? c?.category_id;
      const subs = Array.isArray(c?.subcategories) ? c.subcategories : Array.isArray(c?.children) ? c.children : [];
      if (!id || subs.length === 0) continue;
      for (const s of subs) {
        const subId = s?.id ?? s?._id ?? s?.category_id;
        if (subId) pairs.push({ id: String(id), subcategory: String(subId) });
      }
    }
    return pairs.length ? pairs : [{ id: "1", subcategory: "1" }];
  } catch {
    return [{ id: "1", subcategory: "1" }];
  }
}

export default function SubcategoryPage({ params }) {
  const id = params?.id ?? "";
  const subcategory = params?.subcategory ?? "";
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-4">
            <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
            <span className="text-gray-300">/</span>
            <a href={`/category/${id}`} className="text-gray-500 hover:text-gray-700">Category {id}</a>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{subcategory}</span>
          </div>
        </div>
        <CategoryProductsClient identifier={`${id}/${subcategory}`} />
      </main>
      <Footer />
    </div>
  );
}



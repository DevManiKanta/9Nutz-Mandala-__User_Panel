import React from "react";
import CategoryProductsClient from "@/components/CategoryProductsClient";
import { CATEGORIES_API_URL } from "@/lib/api";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const res = await fetch(CATEGORIES_API_URL, { cache: "force-cache" });
    const json = await res.json().catch(() => null);
    const rows = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
    const ids = rows
      .map((r) => r && (r.id ?? r._id ?? r.category_id))
      .filter((v) => v !== undefined && v !== null)
      .map((v) => ({ id: String(v) }));
    return ids.length ? ids : [{ id: "1" }];
  } catch {
    return [{ id: "1" }];
  }
}

export default function CategoryPage({ params }) {
  const id = params?.id ?? "";
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <CategoryProductsClient identifier={String(id)} />
      </main>
    </div>
  );
}

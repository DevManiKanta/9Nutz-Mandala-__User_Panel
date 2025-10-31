// // app/product/[id]/page.jsx
// // Server component (no "use client")
// import React from "react";
// import Link from "next/link";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { useProducts } from "@/contexts/ProductContext";

// // Required by `output: "export"` for dynamic routes.
// // Returning an empty array is acceptable if you don't want to pre-generate any product pages.
//   // const { products } = useProducts() || { products: [] };

//   // console.log("Products",products)
// export async function generateStaticParams() {
//   return [
//     { id: "42" },
//     { id: "40" },
//     { id: "43" }, 
//   ];
// }
// export default function ProductPage({ params }) {
//   const { id } = params;
//   const product = {
//     id,
//     title: `Product ${id}`,
//     price: 999,
//     shortDesc: "This is a static placeholder product page. Replace with real data when ready.",
//     image: "/placeholder-1200x800.png",
//   };

//   return (
//     <div>
//       <Header/>
//     <main className="min-h-screen w-full bg-white">
//       {/* Simple hero */}
//       <section className="w-full bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 py-12">
//           <div className="rounded-xl overflow-hidden shadow-lg">
//             <div className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] relative bg-gray-200">
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-full object-cover"
//                 // onError={(e) => (e.currentTarget.src = "/placeholder-1200x800.png")}
//               />
//             </div>

//             <div className="p-6 md:p-8 bg-white">
//               <div className="max-w-3xl mx-auto text-center">
//                 <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3">{product.title}</h1>
//                 <p className="text-gray-600 mb-4">{product.shortDesc}</p>

//                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//                   <div className="text-2xl font-semibold">₹{Number(product.price).toLocaleString()}</div>
//                   <Link href="/" className="inline-block px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
//                     Back to shop
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Basic details area */}
//       <section className="max-w-6xl mx-auto px-4 py-12">
//         <div className="prose max-w-none">
//           <h2>About this product</h2>
//           <p>
//             This page displays static data and a static image for product <strong>{product.id}</strong>. Replace the `product` object
//             with real data or wire it to your context / API when you're ready.
//           </p>
//         </div>
//       </section>
//     </main>
//     <Footer/>
//     </div>
//   );
// }

// import React from "react";
// import ProductPageClient from "@/app/product/ProductPageClient";
// import apiAxios from "@/lib/api";
// export async function generateStaticParams() {
//   // fetch all product ids from your API/database
//   const res = await fetch("/product/show");
//   const products = await res.json();

//   return products.map((p) => ({ id: String(p.id) }));
// }


// export default function ProductPage({ params }) {
//   const { id } = params || {};
//   return <ProductPageClient id={String(id || "")} />;
// }

import React from "react";
import ProductPageClient from "@/app/product/ProductPageClient";

export const dynamicParams = false;

export async function generateStaticParams() {
  const PRODUCTS_URL = process.env.NEXT_PUBLIC_PRODUCTS_URL || "https://9nutsapi.nearbydoctors.in/public/api/product/show";
  const CATEGORIES_URL = process.env.NEXT_PUBLIC_CATEGORIES_URL || "https://9nutsapi.nearbydoctors.in/public/api/category/show";
  const API_BASE_FROM_PRODUCTS = PRODUCTS_URL.replace(/\/product\/show.*/, "");

  async function fetchJson(url) {
    try {
      const res = await fetch(url, { cache: "force-cache" });
      const data = await res.json().catch(() => null);
      return data;
    } catch {
      return null;
    }
  }

  const ids = new Set();

  // 1) Collect from products list
  const prodJson = await fetchJson(PRODUCTS_URL);
  const prodRows = Array.isArray(prodJson?.data) ? prodJson.data : Array.isArray(prodJson) ? prodJson : [];
  for (const r of prodRows) {
    const v = r && (r.id ?? r.product_id ?? r._id);
    if (v !== undefined && v !== null) ids.add(String(v));
  }

  // 2) Collect from categories -> online-categories/show-category/{id}
  const catJson = await fetchJson(CATEGORIES_URL);
  const catRows = Array.isArray(catJson?.data) ? catJson.data : Array.isArray(catJson) ? catJson : [];
  const catIds = catRows
    .map((c) => c && (c.id ?? c._id ?? c.category_id))
    .filter((v) => v !== undefined && v !== null)
    .slice(0, 50); // cap to reasonable number

  await Promise.all(
    catIds.map(async (cid) => {
      const url = `${API_BASE_FROM_PRODUCTS}/online-categories/show-category/${encodeURIComponent(String(cid))}`;
      const detail = await fetchJson(url);
      const products = Array.isArray(detail?.data?.products) ? detail.data.products : Array.isArray(detail?.products) ? detail.products : [];
      for (const p of products) {
        const v = p && (p.id ?? p.product_id ?? p._id);
        if (v !== undefined && v !== null) ids.add(String(v));
      }
    })
  );

  const out = Array.from(ids).map((id) => ({ id }));
  return out.length ? out : [{ id: "1" }];
}

export default function ProductPage({ params }) {
  const { id } = params || {};
  return <ProductPageClient id={String(id || "")} />;
}

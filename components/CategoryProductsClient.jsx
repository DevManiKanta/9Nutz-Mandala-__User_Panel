"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft } from "lucide-react";

const API_BASE = "https://9nutsapi.nearbydoctors.in/public/api";

/** helper to turn backend image path into full URL */
function toFullImageUrl(img) {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) return img;
  const base = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/+$/, "");
  if (!base) return img;
  if (img.startsWith("/")) return `${base}${img}`;
  return `${base}/${img}`;
}

export default function CategoryProductsClient({ identifier }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);

  // missing isAdding state — add it here
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, openCart } = useCart() || {};
  const router = useRouter();

  // Keep handler and cart behavior unchanged
  const handleAddToCart = useCallback(
    (productToAdd) => {
      if (!productToAdd) return;
      const stockVal = Number(productToAdd?.stock ?? Infinity);
      if (!Number.isNaN(stockVal) && stockVal <= 0) return;
      setIsAdding(true);

      try {
        if (typeof addItem === "function") {
          addItem({ ...productToAdd, quantity: 1 });
        } else {
          window.dispatchEvent(
            new CustomEvent("productAddToCart", {
              detail: { product: productToAdd, quantity: 1 },
            })
          );
        }

        if (typeof openCart === "function") openCart();
        else window.dispatchEvent(new CustomEvent("openCart"));
      } catch (err) {
        // keep silent to preserve behaviour
      } finally {
        // small timeout for UX only
        setTimeout(() => setIsAdding(false), 600);
      }
    },
    [addItem, openCart]
  );

  useEffect(() => {
    if (!identifier) {
      setError("No category identifier provided");
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      setCategory(null);

      async function doFetch(url, opts = {}) {
        try {
          const res = await fetch(url, { ...opts, headers: { "Content-Type": "application/json" } });
          const text = await res.text();
          try {
            const json = JSON.parse(text || "{}");
            return { ok: res.ok, status: res.status, json };
          } catch {
            return { ok: res.ok, status: res.status, json: null, raw: text };
          }
        } catch (err) {
          return { ok: false, error: err };
        }
      }

      try {
        const tryUrl = `${API_BASE}/online-categories/show-category/${encodeURIComponent(identifier)}`;
        const attempt = await doFetch(tryUrl);
        if (cancelled) return;

        if (attempt.ok && attempt.json && attempt.json.data) {
          setCategory(attempt.json.data);
          setLoading(false);
          return;
        }

        const listUrl = `${API_BASE}/category/show`;
        const list = await doFetch(listUrl);
        if (cancelled) return;

        const rows = Array.isArray(list.json?.data) ? list.json.data : [];
        const numericId = String(identifier).match(/^\d+$/) ? Number(identifier) : null;
        let found = null;

        if (numericId !== null) found = rows.find((r) => Number(r.id) === numericId);
        if (!found) {
          const slugLower = String(identifier).toLowerCase();
          found = rows.find((r) => {
            const maybeSlug = (r.slug ?? "").toLowerCase();
            const name = (r.name ?? r.title ?? "").toLowerCase();
            return maybeSlug === slugLower || name === slugLower;
          });
        }

        if (found) {
          const detailUrl = `${API_BASE}/online-categories/show-category/${found.id}`;
          const detail = await doFetch(detailUrl);
          if (cancelled) return;
          if (detail.ok && detail.json && detail.json.data) {
            setCategory(detail.json.data);
            setLoading(false);
            return;
          }
          setCategory(found);
          setLoading(false);
          return;
        }

        throw new Error("Category not found by identifier");
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || String(err));
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [identifier]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error)
    return <div className="py-12 text-center text-red-600">Error: {error}</div>;
  if (!category)
    return <div className="py-12 text-center text-gray-500">Category not found</div>;
  const products = Array.isArray(category.products) ? category.products : [];
  const formatPrice = (val) => {
    if (val == null || val === "") return "0.00";

    // If object with nested price, attempt common paths (non-invasive)
    if (typeof val === "object") {
      // try to find numeric-like property
      const tryKeys = ["price", "selling_price", "mrp", "amount", "value"];
      for (const k of tryKeys) {
        if (val[k] != null) return formatPrice(val[k]);
      }
      return "0.00";
    }

    if (typeof val === "string") {
      // remove anything but digits, dot, and minus sign
      const cleaned = val.replace(/[^0-9.\-]/g, "");
      const n = Number(cleaned);
      return Number.isFinite(n) ? n.toFixed(2) : "0.00";
    }

    const n = Number(val);
    return Number.isFinite(n) ? n.toFixed(2) : "0.00";
  };
  console.log(category)
  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 mt-3">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="mb-0 ">
            <button variant="link" asChild className="pl-0">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                {/* Back to Menu */}
              </button>
            </button>
          </div>

          {category.image_url ? (
            <img
              src={category.image_url}
              alt={category.name}
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md shadow-sm"
            />
          ) : category.image ? (
            <img
              src={toFullImageUrl(category.image)}
              alt={category.name}
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md shadow-sm"
            />
          ) : null}

          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-semibold leading-tight truncate">{category.name ?? category.title}</h1>
            {category.description ? <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">{category.description}</p> : null}
          </div>
        </div>
        <div />
      </div>

      {/* Responsive grid: 1 -> 2 -> 3 -> 4 -> 5 -> 6 */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-6">
            No products in this category.
          </div>
        ) : (
          products.map((p) => {
            const pid = String(p.id ?? p.product_id ?? p._id ?? "");
            const stockVal = Number(p.stock ?? 0);
            const isOut = Number.isNaN(stockVal) ? false : stockVal <= 0;

            /**
             * NEW: robust price extraction without changing other logic.
             * We try a set of likely fields in order, falling back to 0.
             * This does not mutate p, nor change API calls — only reads safely.
             */
            const rawPrice =
              p.discount_price ??
              p.selling_price ??
              p.sale_price ??
              p.price ??
              p.mrp ??
              p.price_before ??
              (p.pricing && (p.pricing.selling_price ?? p.pricing.price)) ??
              (p.variant && (p.variant.price ?? p.variant.selling_price)) ??
              0;

            const rawOldPrice =
              p.old_price ??
              p.mrp ??
              p.price_old ??
              p.price_before ??
              (p.pricing && (p.pricing.mrp ?? p.pricing.old_price)) ??
              0;

            return (
              <article
                key={pid || Math.random()}
                className="relative bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full"
              >
                {/* Badge + Favorite icon on top of card */}
                {/* Badge (conditionally show if "is_best_seller" or flag exists) */}
                {p.is_best_seller || p.best_seller ? (
                  <div className="absolute left-3 top-3 z-10">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">
                      Best Seller
                    </div>
                  </div>
                ) : null}
                <Link href={pid ? `/product/${pid}` : "#"} prefetch={false} className="block flex-1">
                  {/* image container: responsive aspect box */}
                  <div className="w-full bg-gray-50 flex items-center justify-center p-3 sm:p-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white overflow-hidden flex items-center justify-center border border-gray-100">
                      <img
                        src={p.image_url || (p.image ? toFullImageUrl(p.image) : "")}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* content */}
                  <div className="px-3 sm:px-4 py-3 flex-1 flex flex-col">
                    <h3 className="text-sm sm:text-sm font-medium text-gray-900 line-clamp-2 break-words">{p.name}</h3>
                    {/* grams text as muted small text */}
                    {/* {p.grams ? <div className="text-xs text-gray-500 mt-1">{p.grams} g</div> : null} */}

                    <div className="mt-2 flex-1">
                      <div className="text-lg sm:text-lg font-bold text-gray-900">
                        Rs.{formatPrice(Number(p.discount_price) > 0 ? p.discount_price : p.price)}
                      </div>
                      {Number(p.discount_price) > 0 && (
                        <div className="text-xs text-gray-400 line-through mt-1">
                          Rs.{formatPrice(p.price)}
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault(); // prevent link navigation
                          if (!isOut) handleAddToCart(p);
                        }}
                        disabled={isOut}
                        className={`w-full rounded-md py-2 text-sm font-medium transition focus:outline-none ${
                          isOut
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200"
                            : isAdding
                            ? "bg-emerald-500 text-white border border-emerald-500 cursor-wait"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600"
                        }`}
                      >
                        {isOut ? "Out of Stock" : isAdding ? "Adding..." : "Add to cart"}
                      </button>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

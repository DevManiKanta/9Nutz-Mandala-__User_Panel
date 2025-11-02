
// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { Plus, Minus, Star, Heart } from "lucide-react";
// import { useProducts } from "@/contexts/ProductContext";
// import { useCategoryDataContext } from "@/contexts/CategoryDataContext";
// import { useRouter } from "next/navigation";
// import { useWishlist } from "@/contexts/WishlistContext";
// import Viewband from "@/components/ViewBand";

// export default function FilterableProductGrid({ onAddToCart, selectedCategory, isAnimating = false }) {
//   const [quantities, setQuantities] = useState({});
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const { products } = useProducts() || { products: [] };
//   const { categories } = useCategoryDataContext() || { categories: [] };
//    console.log("products",products)
//   const staticFallbackProduct = {
//     id: "static-001",
//     name: "Sample Product (Static)",
//     price: 499.0,
//     discountPrice: 399.0,
//     discountAmount: 100,
//     stock: 10,
//   };

//   const router = useRouter();

//   // wishlist
//   const { favorites = [], loading: wishlistLoading = false, addFavorite } = useWishlist() || {};

//   // keep a set for quick lookup
//   const [favSet, setFavSet] = useState(() => new Set());
//   useEffect(() => {
//     try {
//       const s = new Set((favorites || []).map((f) => String(f?.product_id ?? f?.id ?? f?.productId ?? f?.product_id)));
//       setFavSet(s);
//     } catch (e) {
//       setFavSet(new Set());
//     }
//   }, [favorites]);

//   useEffect(() => {
//     const handleSearch = (e) => {
//       const detail = e && e.detail ? e.detail : "";
//       const term = String(detail || "").toString().trim().toLowerCase();
//       setSearchTerm(term);
//     };
//     window.addEventListener("siteSearch", handleSearch);
//     return () => window.removeEventListener("siteSearch", handleSearch);
//   }, []);

//   const getProductCategoryIdAndName = useCallback((p) => {
//     const cat = p && p.category;
//     if (cat == null) return { id: undefined, name: undefined };
//     if (typeof cat === "string" || typeof cat === "number") {
//       const id = String(cat).trim() || undefined;
//       return { id, name: undefined };
//     }
//     const id = String(cat.id ?? cat._id ?? cat.category_id ?? cat.categoryId ?? "").trim() || undefined;
//     const name = String(cat.name ?? cat.title ?? cat.category_name ?? cat.categoryName ?? "").trim() || undefined;
//     return { id, name };
//   }, []);

//   const combopackCategoryIds = useMemo(() => {
//     if (!Array.isArray(categories)) return new Set();
//     const set = new Set();
//     categories.forEach((c) => {
//       const nm = String((c && c.name) || "").toLowerCase();
//       if (nm.includes("cobopack") || nm.includes("combopack")) set.add(String(c.id));
//     });
//     return set;
//   }, [categories]);

//   const filteredProducts = useMemo(() => {
//     if (!products || (Array.isArray(products) && products.length === 0)) return [staticFallbackProduct];
//     let result = [...products];

//     if (selectedCategory && selectedCategory !== "all") {
//       const catLower = String(selectedCategory).toLowerCase();
//       result = result.filter((p) => {
//         const { id, name } = getProductCategoryIdAndName(p || {});
//         return (
//           (id && String(id).toLowerCase().includes(catLower)) ||
//           (name && String(name).toLowerCase().includes(catLower)) ||
//           (typeof p.category === "string" && String(p.category).toLowerCase().includes(catLower))
//         );
//       });
//     }

//     if (searchTerm) {
//       result = result.filter((p) => {
//         const name = String(p?.name || "").toLowerCase();
//         const desc = String(p?.description || p?.short_description || "").toLowerCase();
//         const { name: catName, id: catId } = getProductCategoryIdAndName(p);
//         const categoryStr = String(catName ?? catId ?? p?.category ?? "").toLowerCase();
//         return name.includes(searchTerm) || desc.includes(searchTerm) || categoryStr.includes(searchTerm);
//       });
//     }
//     return result;
//   }, [products, selectedCategory, searchTerm, getProductCategoryIdAndName]);

//   useEffect(() => {
//     setDisplayedProducts(filteredProducts);
//   }, [filteredProducts]);

//   const qtyOf = useCallback((id) => Math.max(0, Math.trunc(quantities[String(id)] ?? 0)), [quantities]);
//   const handleQuantityChange = useCallback((productId, newQuantity) => {
//     if (newQuantity < 0) return;
//     setQuantities((prev) => ({ ...prev, [String(productId)]: Math.trunc(newQuantity) }));
//   }, []);

//   const normalizeForCart = useCallback((raw) => {
//     if (!raw) return raw;
//     const id = raw.id ?? raw.product_id ?? raw._id ?? raw.slug ?? null;
//     const product_id = raw.product_id ?? raw.id ?? raw._id ?? null;
//     const price = typeof raw.price !== "undefined" ? raw.price : raw.cost ?? raw.amount ?? 0;
//     const discountPrice = raw.discountPrice ?? raw.discount_price ?? raw.discount ?? null;
//     const name = raw.name ?? raw.title ?? "Untitled";
//     const stock = typeof raw.stock !== "undefined" ? raw.stock : raw.qty ?? raw.quantity ?? 0;

//     return {
//       ...raw,
//       id,
//       product_id,
//       price,
//       discountPrice,
//       name,
//       stock,
//     };
//   }, []);

//   const handleAddToCart = useCallback(
//     (product) => {
//       try {
//         if (!product) {
//           console.warn("handleAddToCart called with falsy product");
//           return;
//         }

//         const normalized = normalizeForCart(product);

//         const idToCheck = normalized.id ?? normalized.product_id ?? null;
//         if (!idToCheck) {
//           console.warn("Product missing id/product_id — not adding to cart:", normalized);
//           return;
//         }

//         const stockVal = Number(normalized?.stock ?? Infinity);
//         if (!Number.isFinite(stockVal) || stockVal <= 0) {
//           console.warn("addToCart prevented — out of stock:", normalized);
//           return;
//         }

//         const qty = Math.max(1, qtyOf(idToCheck));

//         // call parent's onAddToCart (do NOT dispatch openCart here)
//         for (let i = 0; i < qty; i++) {
//           if (typeof onAddToCart === "function") onAddToCart(normalized);
//         }

//         setQuantities((prev) => {
//           const copy = { ...prev };
//           delete copy[String(idToCheck)];
//           return copy;
//         });

//         // IMPORTANT: DO NOT dispatch openCart here. Parent controls opening the cart.
//       } catch (err) {
//         console.error("handleAddToCart unexpected error:", err);
//       }
//     },
//     [normalizeForCart, onAddToCart, qtyOf]
//   );

//   const formatPrice = useCallback((n) => (Number.isNaN(Number(n)) ? "0.00" : Number(n).toFixed(2)), []);
//   // Defensive, normalized computeDisplayPrice
// const computeDisplayPrice = useCallback((p) => {
//   if (!p) return 0;

//   // helper to try many common locations and coerce to number
//   const readNumber = (v) => {
//     if (v == null) return undefined;
//     if (typeof v === "number") return v;
//     if (typeof v === "string") {
//       const cleaned = v.replace(/[^0-9.\-]/g, "");
//       const n = Number(cleaned);
//       return Number.isFinite(n) ? n : undefined;
//     }
//     if (typeof v === "object") {
//       // check common keys inside object
//       for (const k of ["price", "selling_price", "amount", "value"]) {
//         if (v[k] != null) {
//           const r = readNumber(v[k]);
//           if (r !== undefined) return r;
//         }
//       }
//       return undefined;
//     }
//     return undefined;
//   };

//   // Try discount price first (various keys)
//   const discountCandidates = [
//     p.discountPrice,
//     p.discount_price,
//     p.discountAmount && (Number(p.discountAmount) < Number(p.price || 0) ? (Number(p.price || 0) - Number(p.discountAmount)) : undefined),
//     p.discount_amount,
//   ];
//   // Prefer explicit discount price if > 0
//   for (const cand of discountCandidates) {
//     const n = readNumber(cand);
//     if (n !== undefined && n > 0) return n;
//   }

//   // If no explicit discount price, try explicit discount amount
//   const dAmt = readNumber(p.discountAmount ?? p.discount_amount);
//   const orig = readNumber(p.price ?? p.raw?.price ?? p.priceBefore ?? p.price_before) ?? 0;
//   if (dAmt !== undefined && dAmt > 0) {
//     // If discount amount provided as amount, compute shown price
//     return Math.max(0, orig - dAmt);
//   }
//   return orig;
// }, []);

//   const computeDiscountPercent = useCallback(
//     (p) => {
//       const orig = Number(p?.price || 0);
//       const shown = Number(computeDisplayPrice(p) || 0);
//       if (!orig || shown >= orig) return 0;
//       return Math.round(((orig - shown) / orig) * 100);
//     },
//     [computeDisplayPrice]
//   );

//   const { combopackProducts, otherProducts } = useMemo(() => {
//     const combo = [],
//       others = [];
//     displayedProducts.forEach((p) => {
//       const { id, name } = getProductCategoryIdAndName(p);
//       const lower = (name || "").toLowerCase();
//       if (id && combopackCategoryIds.has(String(id)) || lower.includes("combopack") || lower.includes("cobopack")) combo.push(p);
//       else others.push(p);
//     });
//     return { combopackProducts: combo, otherProducts: others };
//   }, [displayedProducts, combopackCategoryIds, getProductCategoryIdAndName]);

//   const handleAddToWishlist = useCallback(
//     async (e, product) => {
//       e.stopPropagation();
//       e.preventDefault();

//       const productId = String(product?.id ?? product?.product_id ?? product?._id ?? "");
//       if (!productId) return;

//       if (favSet.has(productId)) return;

//       try {
//         await addFavorite(productId);
//       } catch (err) {
//         // ignore or show toast
//       }
//     },
//     [addFavorite, favSet]
//   );

//   const renderProductCard = (product, idx) => {
//     const productId = String(product?.id || `tmp-${idx}`);
//     const displayPrice = computeDisplayPrice(product);
//     const discountPercent = computeDiscountPercent(product);
//     const outOfStock = Number(product?.stock ?? Infinity) <= 0;
//     const img =
//       product?.imageUrl || (Array.isArray(product?.images) && product.images[0]) || product?.image || "/placeholder.png";

//     const isFavourited = favSet.has(String(productId));

//     return (
//       <article
//         key={productId}
//         className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 overflow-hidden flex flex-col h-md"
//         // style={{border:"1px solid black"}}

//       >
//         <div className="relative p-4 cursor-pointer">
//           <div className="rounded-xl overflow-hidden bg-gray-50">
//             <img src={img} alt={product?.name || "product"} className="w-full h-56 object-cover" />
//           </div>

//           <button
//             onClick={(e) => handleAddToWishlist(e, product)}
//             disabled={isFavourited || wishlistLoading}
//             aria-pressed={isFavourited}
//             aria-label={isFavourited ? "Added to wishlist" : "Add to wishlist"}
//             className={`absolute top-4 right-4 z-20 p-2 rounded-full shadow-md transition transform scale-100
//               ${isFavourited ? "bg-red-50" : "bg-white/90 hover:scale-105"}
//               ${isFavourited ? "cursor-default" : "cursor-pointer"}`}
//             title={isFavourited ? "Already in wishlist" : "Add to wishlist"}
//             onMouseDown={(e) => e.stopPropagation()}
//             onMouseUp={(e) => e.stopPropagation()}
//           >
//             <Heart
//               className={`w-5 h-5 ${isFavourited ? "text-red-600" : "text-gray-500"}`}
//               fill={isFavourited ? "currentColor" : "none"}
//             />
//           </button>

//           {discountPercent > 0 && (
//             <span className="absolute top-5 left-5 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
//               {discountPercent}% OFF
//             </span>
//           )}
//         </div>
//         <div className="px-5  flex-1 flex flex-col">
//           <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">{product?.name || "Unnamed"}</h3>
//           <div className="flex items-center gap-1 mb-3">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Star key={i} className="w-4 h-4 text-yellow-400" />
//             ))}
//           </div>

//           <div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-xl font-bold text-gray-900">Rs.{formatPrice(displayPrice)}</div>
//                 {discountPercent > 0 && (
//                   <div className="text-xs text-gray-400 mt-1 line-through">Rs.{formatPrice(product.price)}</div>
//                 )}
//               </div>

//               <div className="flex items-center space-x-2">
//                 {outOfStock ? (
//                   <div className="text-xs  rounded-md bg-gray-100 text-black-500">Out of stock</div>
//                 ) : (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       e.preventDefault();
//                       handleAddToCart(product);
//                     }}
//                     className="px-2 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition"
//                   >
//                     Add to cart
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </article>
//     );
//   };

//   return (
//     <div className="mb-12 w-full py-6">
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-4">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-bold text-gray-900">Products</h2>
//           {displayedProducts.length > 0 && <span className="text-sm text-gray-500 hidden sm:block">{displayedProducts.length} results</span>}
//         </div>
//       </div>
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
//         <div
//           className={`grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
//             transition-all duration-300 ease-in-out ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
//         >
//           {otherProducts.map((p, i) => {
//             const displayPrice = computeDisplayPrice(p);
//             const discountPercent = computeDiscountPercent(p);
//             const outOfStock = Number(p?.stock ?? Infinity) <= 0;
//             const isFavourited = favSet.has(String(p.id));
            
//             // Generate random badge for demo (you can replace with actual product data)
//             const badges = ['Best Seller', "", 'Limited Deal'];
//             const badgeColors = ['bg-orange-500', 'bg-blue-600', 'bg-red-600'];
//             const randomBadge = Math.random() > 0.7 ? badges[Math.floor(Math.random() * badges.length)] : null;
//             const badgeColor = randomBadge ? badgeColors[badges.indexOf(randomBadge)] : '';
            
//             // Generate random rating (you can replace with actual product rating)
//             const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0
//             const reviewCount = Math.floor(Math.random() * 50000) + 100;
            
//             return (
//               <div key={p.id || i} className="transform transition-transform hover:scale-[1.02]">
//                 <article
//                   onClick={() => router.push(`/product/${p.id}`)}
//                   className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden border border-gray-200 flex flex-col h-full cursor-pointer transition-all duration-200"
//                   style={{
//                     height: "250px",
//                     minWidth: "180px",
//                   }}
//                 >
//                   <div className="relative w-full h-[140px] overflow-hidden bg-gray-50">
//                     {/* Badge */}
//                     {randomBadge && (
//                       <div className={`absolute top-2 left-2 z-10 ${badgeColor} text-white text-xs font-medium px-2 py-1 rounded`}>
//                         {randomBadge}
//                       </div>
//                     )}
                    
//                     {/* Wishlist Heart */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleAddToWishlist(e, p);
//                       }}
//                       disabled={isFavourited || wishlistLoading}
//                       className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-sm transition
//                         ${isFavourited ? "bg-red-50" : "bg-white/90 hover:bg-white"}
//                         ${isFavourited ? "cursor-default" : "cursor-pointer"}`}
//                     >
//                       <Heart
//                         className={`w-4 h-4 ${isFavourited ? "text-red-600" : "text-gray-500"}`}
//                         fill={isFavourited ? "currentColor" : "none"}
//                       />
//                     </button>

//                     <img
//                       src={
//                         p?.imageUrl ||
//                         (Array.isArray(p?.images) && p.images[0]) ||
//                         p?.image ||
//                         "/placeholder.png"
//                       }
//                       alt={p?.name || "product"}
//                       className="w-full h-full object-contain p-2"
//                     />
//                   </div>
                  
//                   <div className="flex-1 flex flex-col p-2">
//                     {/* Product Name */}
//                     <h3 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
//                       {p?.name || "Unnamed Product"}
//                     </h3>
                    
//                     {/* Price */}
//                     <div>
//                       <div className="flex items-baseline gap-2">
//                         <span className="text-sm font-bold text-gray-900">
//                           Rs.{formatPrice(displayPrice)}
//                         </span>
//                         {discountPercent > 0 && (
//                           <span className="text-xs text-gray-500 line-through">
//                             Rs.{formatPrice(p.price)}
//                           </span>
//                         )}
//                       </div>
//                     </div>
                    
//                     {/* Add to Cart Button */}
//                     <div className="mt-auto">
//                       {outOfStock ? (
//                         <div className="text-center py-2 text-sm text-gray-500 bg-gray-100 rounded">
//                           Out of Stock
//                         </div>
//                       ) : (
//                         <button
//                           className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1.5 px-3 rounded transition-colors"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             e.preventDefault();
//                             handleAddToCart(p);
//                           }}
//                         >
//                           Add to Cart
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </article>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {displayedProducts.length === 0 && (
//         <div className="text-center py-16">
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//           <p className="text-gray-500">Try another keyword.</p>
//         </div>
//       )}
//       {combopackProducts.length > 0 && (
//         <section className="mt-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
//             <h3 className="text-xl font-semibold text-gray-900">Combo Packs</h3>
//             <span className="text-sm text-gray-500">{combopackProducts.length} items</span>
//           </div>

//           <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
//               {combopackProducts.map((p, i) => {
//                 const displayPrice = computeDisplayPrice(p);
//                 const discountPercent = computeDiscountPercent(p);
//                 const outOfStock = Number(p?.stock ?? Infinity) <= 0;
//                 const isFavourited = favSet.has(String(p.id));
                
//                 const badges = ['Best Seller', "", 'Limited Deal'];
//                 const badgeColors = ['bg-orange-500', 'bg-blue-600', 'bg-red-600'];
//                 const randomBadge = Math.random() > 0.7 ? badges[Math.floor(Math.random() * badges.length)] : null;
//                 const badgeColor = randomBadge ? badgeColors[badges.indexOf(randomBadge)] : '';
                
//                 const rating = (Math.random() * 2 + 3).toFixed(1);
//                 const reviewCount = Math.floor(Math.random() * 50000) + 100;
                
//                 return (
//                   <div key={p.id || i} className="transform transition-transform hover:scale-[1.02]">
//                     <article
//                       onClick={() => router.push(`/product/${p.id}`)}
//                       className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden border border-gray-200 flex flex-col h-full cursor-pointer transition-all duration-200"
//                       style={{
//                         height: "320px",
//                         minWidth: "180px",
//                       }}
//                     >
//                       <div className="relative w-full h-[140px] overflow-hidden bg-gray-50">
//                         {randomBadge && (
//                           <div className={`absolute top-2 left-2 z-10 ${badgeColor} text-white text-xs font-medium px-2 py-1 rounded`}>
//                             {/* {randomBadge} */}
//                           </div>
//                         )}
                        
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleAddToWishlist(e, p);
//                           }}
//                           disabled={isFavourited || wishlistLoading}
//                           className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-sm transition
//                             ${isFavourited ? "bg-red-50" : "bg-white/90 hover:bg-white"}
//                             ${isFavourited ? "cursor-default" : "cursor-pointer"}`}
//                         >
//                           <Heart
//                             className={`w-4 h-4 ${isFavourited ? "text-red-600" : "text-gray-500"}`}
//                             fill={isFavourited ? "currentColor" : "none"}
//                           />
//                         </button>

//                         <img
//                           src={
//                             p?.imageUrl ||
//                             (Array.isArray(p?.images) && p.images[0]) ||
//                             p?.image ||
//                             "/placeholder.png"
//                           }
//                           alt={p?.name || "product"}
//                           className="w-full h-full object-contain p-2"
//                         />
//                       </div>
                      
//                       <div className="flex-1 flex flex-col p-2">
//                         <h3 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
//                           {p?.name || "Unnamed Product"}
//                         </h3>
                        
//                         <div>
//                           <div className="flex items-baseline gap-2">
//                             <span className="text-sm font-bold text-gray-900">
//                               Rs.{formatPrice(displayPrice)}
//                             </span>
//                             {discountPercent > 0 && (
//                               <span className="text-xs text-gray-500 line-through">
//                                 Rs.{formatPrice(p.price)}
//                               </span>
//                             )}
//                           </div>
//                         </div>
                        
//                         <div className="mt-auto">
//                           {outOfStock ? (
//                             <div className="text-center py-2 text-sm text-gray-500 bg-gray-100 rounded">
//                               Out of Stock
//                             </div>
//                           ) : (
//                             <button
//                               className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1.5 px-3 rounded transition-colors"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 e.preventDefault();
//                                 handleAddToCart(p);
//                               }}
//                             >
//                               Add to Cart
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </article>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }



"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Minus, Star, Heart } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";
import { useCategoryDataContext } from "@/contexts/CategoryDataContext";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/contexts/WishlistContext";
import Viewband from "@/components/ViewBand";

export default function FilterableProductGrid({ onAddToCart, selectedCategory, isAnimating = false }) {
  const [quantities, setQuantities] = useState({});
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { products } = useProducts() || { products: [] };
  const { categories } = useCategoryDataContext() || { categories: [] };
  const staticFallbackProduct = {
    id: "static-001",
    name: "Sample Product (Static)",
    price: 499.0,
    discountPrice: 399.0,
    discountAmount: 100,
    stock: 10,
  };

  const router = useRouter();

  // wishlist
  const { favorites = [], loading: wishlistLoading = false, addFavorite } = useWishlist() || {};

  // keep a set for quick lookup
  const [favSet, setFavSet] = useState(() => new Set());
  useEffect(() => {
    try {
      const s = new Set((favorites || []).map((f) => String(f?.product_id ?? f?.id ?? f?.productId ?? f?.product_id)));
      setFavSet(s);
    } catch (e) {
      setFavSet(new Set());
    }
  }, [favorites]);

  useEffect(() => {
    const handleSearch = (e) => {
      const detail = e && e.detail ? e.detail : "";
      const term = String(detail || "").toString().trim().toLowerCase();
      setSearchTerm(term);
    };
    window.addEventListener("siteSearch", handleSearch);
    return () => window.removeEventListener("siteSearch", handleSearch);
  }, []);

  const getProductCategoryIdAndName = useCallback((p) => {
    const cat = p && p.category;
    if (cat == null) return { id: undefined, name: undefined };
    if (typeof cat === "string" || typeof cat === "number") {
      const id = String(cat).trim() || undefined;
      return { id, name: undefined };
    }
    const id = String(cat.id ?? cat._id ?? cat.category_id ?? cat.categoryId ?? "").trim() || undefined;
    const name = String(cat.name ?? cat.title ?? cat.category_name ?? cat.categoryName ?? "").trim() || undefined;
    return { id, name };
  }, []);

  const combopackCategoryIds = useMemo(() => {
    if (!Array.isArray(categories)) return new Set();
    const set = new Set();
    categories.forEach((c) => {
      const nm = String((c && c.name) || "").toLowerCase();
      if (nm.includes("cobopack") || nm.includes("combopack")) set.add(String(c.id));
    });
    return set;
  }, [categories]);

  const filteredProducts = useMemo(() => {
    if (!products || (Array.isArray(products) && products.length === 0)) return [staticFallbackProduct];
    let result = [...products];

    if (selectedCategory && selectedCategory !== "all") {
      const catLower = String(selectedCategory).toLowerCase();
      result = result.filter((p) => {
        const { id, name } = getProductCategoryIdAndName(p || {});
        return (
          (id && String(id).toLowerCase().includes(catLower)) ||
          (name && String(name).toLowerCase().includes(catLower)) ||
          (typeof p.category === "string" && String(p.category).toLowerCase().includes(catLower))
        );
      });
    }

    if (searchTerm) {
      result = result.filter((p) => {
        const name = String(p?.name || "").toLowerCase();
        const desc = String(p?.description || p?.short_description || "").toLowerCase();
        const { name: catName, id: catId } = getProductCategoryIdAndName(p);
        const categoryStr = String(catName ?? catId ?? p?.category ?? "").toLowerCase();
        return name.includes(searchTerm) || desc.includes(searchTerm) || categoryStr.includes(searchTerm);
      });
    }
    return result;
  }, [products, selectedCategory, searchTerm, getProductCategoryIdAndName]);

  useEffect(() => {
    setDisplayedProducts(filteredProducts);
  }, [filteredProducts]);

  const qtyOf = useCallback((id) => Math.max(0, Math.trunc(quantities[String(id)] ?? 0)), [quantities]);
  const handleQuantityChange = useCallback((productId, newQuantity) => {
    if (newQuantity < 0) return;
    setQuantities((prev) => ({ ...prev, [String(productId)]: Math.trunc(newQuantity) }));
  }, []);

  const normalizeForCart = useCallback((raw) => {
    if (!raw) return raw;
    const id = raw.id ?? raw.product_id ?? raw._id ?? raw.slug ?? null;
    const product_id = raw.product_id ?? raw.id ?? raw._id ?? null;
    const price = typeof raw.price !== "undefined" ? raw.price : raw.cost ?? raw.amount ?? 0;
    const discountPrice = raw.discountPrice ?? raw.discount_price ?? raw.discount ?? null;
    const name = raw.name ?? raw.title ?? "Untitled";
    const stock = typeof raw.stock !== "undefined" ? raw.stock : raw.qty ?? raw.quantity ?? 0;

    return {
      ...raw,
      id,
      product_id,
      price,
      discountPrice,
      name,
      stock,
    };
  }, []);

  const handleAddToCart = useCallback(
    (product) => {
      try {
        if (!product) {
          console.warn("handleAddToCart called with falsy product");
          return;
        }

        const normalized = normalizeForCart(product);

        const idToCheck = normalized.id ?? normalized.product_id ?? null;
        if (!idToCheck) {
          console.warn("Product missing id/product_id — not adding to cart:", normalized);
          return;
        }

        const stockVal = Number(normalized?.stock ?? Infinity);
        if (!Number.isFinite(stockVal) || stockVal <= 0) {
          console.warn("addToCart prevented — out of stock:", normalized);
          return;
        }

        const qty = Math.max(1, qtyOf(idToCheck));

        // call parent's onAddToCart (do NOT dispatch openCart here)
        for (let i = 0; i < qty; i++) {
          if (typeof onAddToCart === "function") onAddToCart(normalized);
        }

        setQuantities((prev) => {
          const copy = { ...prev };
          delete copy[String(idToCheck)];
          return copy;
        });

        // IMPORTANT: DO NOT dispatch openCart here. Parent controls opening the cart.
      } catch (err) {
        console.error("handleAddToCart unexpected error:", err);
      }
    },
    [normalizeForCart, onAddToCart, qtyOf]
  );

  const formatPrice = useCallback((n) => (Number.isNaN(Number(n)) ? "0.00" : Number(n).toFixed(2)), []);

  // ---------- UPDATED PRICE LOGIC (defensive & normalized) ----------
  const computeDisplayPrice = useCallback((p) => {
    // helper to coerce many forms into a numeric value or undefined
    const readNumber = (v) => {
      if (v == null) return undefined;
      if (typeof v === "number") return v;
      if (typeof v === "string") {
        const cleaned = v.replace(/[^0-9.\-]/g, "");
        const n = Number(cleaned);
        return Number.isFinite(n) ? n : undefined;
      }
      if (typeof v === "object") {
        for (const k of ["price", "selling_price", "amount", "value", "mrp"]) {
          if (v[k] != null) {
            const r = readNumber(v[k]);
            if (r !== undefined) return r;
          }
        }
        return undefined;
      }
      return undefined;
    };

    if (!p) return 0;

    // Prefer explicit discount price fields if numeric > 0
    const discountCandidates = [p.discountPrice, p.discount_price, p.discount_price_formatted, p.discount];
    for (const cand of discountCandidates) {
      const n = readNumber(cand);
      if (n !== undefined && n > 0) return n;
    }

    // If discount amount provided (amount to subtract), use it
    const dAmt = readNumber(p.discountAmount ?? p.discount_amount ?? null);
    const orig = readNumber(p.price ?? p.raw?.price ?? p.priceBefore ?? p.price_before) ?? 0;
    if (dAmt !== undefined && dAmt > 0) {
      return Math.max(0, orig - dAmt);
    }

    // fallback to original price if present
    return orig;
  }, []);
  // -----------------------------------------------------------------

  const computeDiscountPercent = useCallback(
    (p) => {
      const orig = Number(p?.price || 0);
      const shown = Number(computeDisplayPrice(p) || 0);
      if (!orig || shown >= orig) return 0;
      return Math.round(((orig - shown) / orig) * 100);
    },
    [computeDisplayPrice]
  );

  const { combopackProducts, otherProducts } = useMemo(() => {
    const combo = [],
      others = [];
    displayedProducts.forEach((p) => {
      const { id, name } = getProductCategoryIdAndName(p);
      const lower = (name || "").toLowerCase();
      if (id && combopackCategoryIds.has(String(id)) || lower.includes("combopack") || lower.includes("cobopack")) combo.push(p);
      else others.push(p);
    });
    return { combopackProducts: combo, otherProducts: others };
  }, [displayedProducts, combopackCategoryIds, getProductCategoryIdAndName]);

  const handleAddToWishlist = useCallback(
    async (e, product) => {
      e.stopPropagation();
      e.preventDefault();

      const productId = String(product?.id ?? product?.product_id ?? product?._id ?? "");
      if (!productId) return;

      if (favSet.has(productId)) return;

      try {
        await addFavorite(productId);
      } catch (err) {
        // ignore or show toast
      }
    },
    [addFavorite, favSet]
  );

  const renderProductCard = (product, idx) => {
    const productId = String(product?.id || `tmp-${idx}`);
    const displayPrice = Number(computeDisplayPrice(product) || 0); // <-- ensured numeric
    const discountPercent = computeDiscountPercent(product);
    const outOfStock = Number(product?.stock ?? Infinity) <= 0;
    const img =
      product?.imageUrl || (Array.isArray(product?.images) && product.images[0]) || product?.image || "/placeholder.png";

    const isFavourited = favSet.has(String(productId));

    return (
      <article
        key={productId}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 overflow-hidden flex flex-col h-md"
      >
        <div className="relative p-4 cursor-pointer">
          <div className="rounded-xl overflow-hidden bg-gray-50">
            <img src={img} alt={product?.name || "product"} className="w-full h-56 object-cover" />
          </div>

          <button
            onClick={(e) => handleAddToWishlist(e, product)}
            disabled={isFavourited || wishlistLoading}
            aria-pressed={isFavourited}
            aria-label={isFavourited ? "Added to wishlist" : "Add to wishlist"}
            className={`absolute top-4 right-4 z-20 p-2 rounded-full shadow-md transition transform scale-100
              ${isFavourited ? "bg-red-50" : "bg-white/90 hover:scale-105"}
              ${isFavourited ? "cursor-default" : "cursor-pointer"}`}
            title={isFavourited ? "Already in wishlist" : "Add to wishlist"}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
          >
            <Heart
              className={`w-5 h-5 ${isFavourited ? "text-red-600" : "text-gray-500"}`}
              fill={isFavourited ? "currentColor" : "none"}
            />
          </button>

          {discountPercent > 0 && (
            <span className="absolute top-5 left-5 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
              {discountPercent}% OFF
            </span>
          )}
        </div>
        <div className="px-5  flex-1 flex flex-col">
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">{product?.name || "Unnamed"}</h3>
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400" />
            ))}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-900">Rs.{formatPrice(displayPrice)}</div>
                {discountPercent > 0 && (
                  <div className="text-xs text-gray-400 mt-1">Rs.{formatPrice(product.price)}</div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {outOfStock ? (
                  <div className="text-xs  rounded-md bg-gray-100 text-black-500">Out of stock</div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="px-2 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition"
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="mb-12 w-full py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Products</h2>
          {displayedProducts.length > 0 && <span className="text-sm text-gray-500 hidden sm:block">{displayedProducts.length} results</span>}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
            transition-all duration-300 ease-in-out ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          {otherProducts.map((p, i) => {
            const displayPrice = Number(computeDisplayPrice(p) || 0);
            const discountPercent = computeDiscountPercent(p);
            const outOfStock = Number(p?.stock ?? Infinity) <= 0;
            const isFavourited = favSet.has(String(p.id));
            
            // Generate random badge for demo (you can replace with actual product data)
            const badges = ['Best Seller', "", 'Limited Deal'];
            const badgeColors = ['bg-orange-500', 'bg-blue-600', 'bg-red-600'];
            const randomBadge = Math.random() > 0.7 ? badges[Math.floor(Math.random() * badges.length)] : null;
            const badgeColor = randomBadge ? badgeColors[badges.indexOf(randomBadge)] : '';
            
            // Generate random rating (you can replace with actual product rating)
            const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0
            const reviewCount = Math.floor(Math.random() * 50000) + 100;
            
            return (
              <div key={p.id || i} className="transform transition-transform hover:scale-[1.02]">
                <article
                  onClick={() => router.push(`/product/${p.id}`)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden border border-gray-200 flex flex-col h-full cursor-pointer transition-all duration-200"
                  style={{
                    height: "250px",
                    minWidth: "180px",
                  }}
                >
                  <div className="relative w-full h-[140px] overflow-hidden bg-gray-50">
                    {/* Badge */}
                    {randomBadge && (
                      <div className={`absolute top-2 left-2 z-10 ${badgeColor} text-white text-xs font-medium px-2 py-1 rounded`}>
                        {randomBadge}
                      </div>
                    )}
                    
                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(e, p);
                      }}
                      disabled={isFavourited || wishlistLoading}
                      className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-sm transition
                        ${isFavourited ? "bg-red-50" : "bg-white/90 hover:bg-white"}
                        ${isFavourited ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isFavourited ? "text-red-600" : "text-gray-500"}`}
                        fill={isFavourited ? "currentColor" : "none"}
                      />
                    </button>

                    <img
                      src={
                        p?.imageUrl ||
                        (Array.isArray(p?.images) && p.images[0]) ||
                        p?.image ||
                        "/placeholder.png"
                      }
                      alt={p?.name || "product"}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col p-2">
                    {/* Product Name */}
                    <h3 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
                      {p?.name || "Unnamed Product"}
                    </h3>
                    
                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          {/* Rs.{formatPrice(displayPrice)} */}
                           Rs.{formatPrice(p.price)}
                        </span>
                        {discountPercent > 0 && (
                          <span className="text-xs text-gray-500 line-through">
                            {/* Rs.{formatPrice(p.discountAmount)} */}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <div className="mt-auto">
                      {outOfStock ? (
                        <div className="text-center py-2 text-sm text-gray-500 bg-gray-100 rounded">
                          Out of Stock
                        </div>
                      ) : (
                        <button
                          className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1.5 px-3 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleAddToCart(p);
                          }}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {displayedProducts.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try another keyword.</p>
        </div>
      )}
      {combopackProducts.length > 0 && (
        <section className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-semibold text-gray-900">Combo Packs</h3>
            <span className="text-sm text-gray-500">{combopackProducts.length} items</span>
          </div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {combopackProducts.map((p, i) => {
                const displayPrice = Number(computeDisplayPrice(p) || 0);
                const discountPercent = computeDiscountPercent(p);
                const outOfStock = Number(p?.stock ?? Infinity) <= 0;
                const isFavourited = favSet.has(String(p.id));
                
                const badges = ['Best Seller', "", 'Limited Deal'];
                const badgeColors = ['bg-orange-500', 'bg-blue-600', 'bg-red-600'];
                const randomBadge = Math.random() > 0.7 ? badges[Math.floor(Math.random() * badges.length)] : null;
                const badgeColor = randomBadge ? badgeColors[badges.indexOf(randomBadge)] : '';
                
                const rating = (Math.random() * 2 + 3).toFixed(1);
                const reviewCount = Math.floor(Math.random() * 50000) + 100;
                
                return (
                  <div key={p.id || i} className="transform transition-transform hover:scale-[1.02]">
                    <article
                      onClick={() => router.push(`/product/${p.id}`)}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden border border-gray-200 flex flex-col h-full cursor-pointer transition-all duration-200"
                      style={{
                        height: "320px",
                        minWidth: "180px",
                      }}
                    >
                      <div className="relative w-full h-[140px] overflow-hidden bg-gray-50">
                        {randomBadge && (
                          <div className={`absolute top-2 left-2 z-10 ${badgeColor} text-white text-xs font-medium px-2 py-1 rounded`}>
                            {/* {randomBadge} */}
                          </div>
                        )}
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToWishlist(e, p);
                          }}
                          disabled={isFavourited || wishlistLoading}
                          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-sm transition
                            ${isFavourited ? "bg-red-50" : "bg-white/90 hover:bg-white"}
                            ${isFavourited ? "cursor-default" : "cursor-pointer"}`}
                        >
                          <Heart
                            className={`w-4 h-4 ${isFavourited ? "text-red-600" : "text-gray-500"}`}
                            fill={isFavourited ? "currentColor" : "none"}
                          />
                        </button>

                        <img
                          src={
                            p?.imageUrl ||
                            (Array.isArray(p?.images) && p.images[0]) ||
                            p?.image ||
                            "/placeholder.png"
                          }
                          alt={p?.name || "product"}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col p-2">
                        <h3 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
                          {p?.name || "Unnamed Product"}
                        </h3>
                        
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-bold text-gray-900">
                              Rs.{formatPrice(displayPrice)}
                            </span>
                            {discountPercent > 0 && (
                              <span className="text-xs text-gray-500 line-through">
                                Rs.{formatPrice(p.price)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-auto">
                          {outOfStock ? (
                            <div className="text-center py-2 text-sm text-gray-500 bg-gray-100 rounded">
                              Out of Stock
                            </div>
                          ) : (
                            <button
                              className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1.5 px-3 rounded transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleAddToCart(p);
                              }}
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

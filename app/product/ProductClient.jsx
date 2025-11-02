

// "use client";

// import React, { useCallback, useMemo, useState } from "react";
// import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";
// import { useRouter } from "next/navigation";
// import { useProducts } from "@/contexts/ProductContext";
// export default function ProductClient({ product }) {
//   const { addItem, openCart } = useCart() || {};
//   const [isAdding, setIsAdding] = useState(false);
//   const router = useRouter();
//    const { products } = useProducts() || { products: [] };

//    console.log("Products",products)
//   if (!product) return null;
//   const images = useMemo(() => {
//     const out = [];

//     if (product.imageUrl) out.push(String(product.imageUrl));

//     if (Array.isArray(product.images) && product.images.length > 0) {
//       product.images.forEach((it) => {
//         if (!it) return;
//         if (typeof it === "string") {
//           if (!out.includes(it)) out.push(it);
//         } else if (typeof it === "object") {
//           // prefer image_url field inside object
//           const url = it.image_url ?? it.url ?? it.image ?? null;
//           if (url && !out.includes(url)) out.push(String(url));
//         }
//       });
//     }

//     // fallback to product.image/product.image_url if still empty
//     if (out.length === 0) {
//       const fallback = product.image_url ?? product.image ?? null;
//       if (fallback) out.push(String(fallback));
//     }

//     return out;
//   }, [product]);

//   const [currentIndex, setCurrentIndex] = useState(0);

//   React.useEffect(() => {
//     if (!images || images.length === 0) {
//       setCurrentIndex(0);
//       return;
//     }
//     if (currentIndex >= images.length) setCurrentIndex(0);
//   }, [images, currentIndex]);

//   const currentImage = images && images.length ? images[currentIndex] : "/placeholder.png";

//   const discountPercent =
//     (product.discountPrice && product.price)
//       ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
//       : product.discount_percent ?? 0;

//   const handleAddToCart = useCallback(
//     (productToAdd) => {
//       if (!productToAdd) return;
//       const stockVal = Number(productToAdd?.stock ?? Infinity);
//       if (!Number.isNaN(stockVal) && stockVal <= 0) return;
//       setIsAdding(true);

//       try {
//         if (typeof addItem === "function") {
//           addItem({ ...productToAdd, quantity: 1 });
//         } else {
//           window.dispatchEvent(new CustomEvent("productAddToCart", { detail: { product: productToAdd, quantity: 1 } }));
//         }

//         if (typeof openCart === "function") openCart();
//         else window.dispatchEvent(new CustomEvent("openCart"));
//       } catch (err) {
//         // ignore
//       } finally {
//         setTimeout(() => setIsAdding(false), 600);
//       }
//     },
//     [addItem, openCart]
//   );

//   const handleThumbKey = (e, idx) => {
//     if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       setCurrentIndex(idx);
//     } else if (e.key === "ArrowLeft") {
//       e.preventDefault();
//       setCurrentIndex((prev) => Math.max(0, prev - 1));
//     } else if (e.key === "ArrowRight") {
//       e.preventDefault();
//       setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));
//     }
//   };
//   return (
//     <section className="relative w-full px-2 sm:px-4 py-1 mt-5">
//       <button
//         onClick={() => router.push("/")}
//         className="absolute -top-2 left-4 flex items-center gap-2 text-gray-600 hover:text-[#C75B3A] transition-colors duration-200"
//       >
//         <ArrowLeft className="w-5 h-5" />
//         <span className="hidden sm:inline font-medium">Back to Menu</span>
//       </button>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-6">
//         {/* Left: main image + thumbnails */}
//         <div className="w-full flex flex-col items-center">
//           <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-lg bg-gray-50">
//             <img
//               src={currentImage}
//               alt={product.name}
//               className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//             />
//             {discountPercent > 0 && (
//               <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow">
//                 {discountPercent}% OFF
//               </span>
//             )}
//           </div>
//           {images.length > 0 && (
//             <div className="mt-4 w-full max-w-md">
//               <div className="flex items-center gap-3 overflow-x-auto py-2 px-1">
//                 {images.map((src, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setCurrentIndex(idx)}
//                     onKeyDown={(e) => handleThumbKey(e, idx)}
//                     aria-label={`View image ${idx + 1}`}
//                     className={`flex-shrink-0 rounded-lg overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
//                       idx === currentIndex ? "ring-2 ring-emerald-600 border-white-600" : "border-gray-200"
//                     }`}
//                     style={{ width: 84, height: 84,borderRadius:10}}
//                     title={`Image ${idx + 1}`}
//                   >
//                     <img
//                       src={src}
//                       alt={`${product.name} ${idx + 1}`}
//                       className="w-full h-full object-cover"
//                       loading={idx === 0 ? "eager" : "lazy"}
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right: product info */}
//         <div className="flex flex-col gap-6">
//           <div>
//             <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
//             <div className="flex items-center gap-1">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
//               ))}
//               <span className="text-sm text-gray-500 ml-1">(4.9 / 120 reviews)</span>
//             </div>
//           </div>

//           <div>
//             <div className="flex items-center gap-3">
//               <span className="text-3xl font-bold text-[#C75B3A]">Rs.{product.discountPrice || product.price}</span>
//               {discountPercent > 0 && <span className="text-lg text-gray-400 line-through">Rs.{product.price}</span>}
//             </div>
//             <p className="mt-2 text-gray-500 text-sm">Inclusive of all taxes. Free delivery on orders above ₹499.</p>
//           </div>

//           {Number(product.stock ?? 0) > 0 ? (
//             <p className="text-green-600 font-semibold">In Stock</p>
//           ) : (
//             <p className="text-red-500 font-semibold">Out of Stock</p>
//           )}

//           <div className="text-gray-700 text-base leading-relaxed">{product.description || "No description available."}</div>

//           <div className="flex flex-col sm:flex-row gap-4 mt-4">
//             <button
//               onClick={() => handleAddToCart(product)}
//               disabled={Number(product.stock ?? 0) <= 0 || isAdding}
//               className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-colors duration-200 ${
//                 Number(product.stock ?? 0) > 0 ? "bg-[#C75B3A] text-white hover:bg-[#b14e33]" : "bg-gray-300 text-gray-600 cursor-not-allowed"
//               }`}
//             >
//               <ShoppingCart className="w-5 h-5" />
//               {isAdding ? "Adding..." : Number(product.stock ?? 0) > 0 ? "Add to Cart" : "Out of Stock"}
//             </button>
//           </div>
//           <div className="mt-12 border-t pt-8">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
//             <ul className="list-disc list-inside text-gray-700 space-y-2 text-base leading-relaxed">
//               <li>Made from premium-quality ingredients for authentic taste and freshness.</li>
//               <li>Prepared under hygienic conditions following strict food safety standards.</li>
//               <li>Free from harmful preservatives, artificial colors, or flavors.</li>
//               <li>Perfect for everyday meals, festive occasions, and quick snack cravings.</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Star, ShoppingCart, ArrowLeft, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useProducts } from "@/contexts/ProductContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import RatingStars from "@/components/RatingStars";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function extractYouTubeId(url) {
  if (!url || typeof url !== "string") return null;
  // common YouTube URL patterns: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/shorts/ID, ...with params
  try {
    const s = url.trim();
    // quick checks
    const patterns = [
      /(?:youtube\.com\/shorts\/)([A-Za-z0-9_-]{4,})/,
      /(?:youtube\.com\/watch\?v=)([A-Za-z0-9_-]{4,})/,
      /(?:youtu\.be\/)([A-Za-z0-9_-]{4,})/,
      /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{4,})/,
      /v=([A-Za-z0-9_-]{4,})/,
    ];
    for (const re of patterns) {
      const m = s.match(re);
      if (m && m[1]) return m[1];
    }
    // fallback: try last path segment
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    const seg = (u.pathname || "").split("/").filter(Boolean).pop();
    if (seg && /^[A-Za-z0-9_-]{4,}$/.test(seg)) return seg;
  } catch (e) {
    // ignore
  }
  return null;
}

export default function ProductClient({ product }) {
  const { addItem, openCart } = useCart() || {};
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();
  const { products } = useProducts() || { products: [] };

  if (!product) return null;

  const images = useMemo(() => {
    const out = [];

    if (product.imageUrl) out.push(String(product.imageUrl));

    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((it) => {
        if (!it) return;
        if (typeof it === "string") {
          if (!out.includes(it)) out.push(it);
        } else if (typeof it === "object") {
          const url = it.image_url ?? it.url ?? it.image ?? null;
          if (url && !out.includes(url)) out.push(String(url));
        }
      });
    }

    if (out.length === 0) {
      const fallback = product.image_url ?? product.image ?? null;
      if (fallback) out.push(String(fallback));
    }

    return out;
  }, [product]);

  // Determine YouTube embed URL
  const videoEmbedUrl = useMemo(() => {
    // product may provide video fields (video_url, video)
    const candidate =
      product.video_url ??
      product.video ??
      (Array.isArray(product.videos) && product.videos.length ? product.videos[0] : null);

    // If candidate exists and is a YouTube URL, extract id
    const youtubeId = extractYouTubeId(candidate);
    if (youtubeId) {
      // use modest branding and allow fullscreen; do not autoplay by default
      return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;
    }

    // If product didn't provide a YouTube link, as requested: use the specific YouTube Shorts URL you provided.
    // NOTE: we embed the ID below (G--NLgSNCmE).
    const fallbackId = "G--NLgSNCmE";
    return `https://www.youtube.com/embed/${fallbackId}?rel=0&modestbranding=1`;
  }, [product]);

  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (!images || images.length === 0) {
      setCurrentIndex(0);
      return;
    }
    if (currentIndex >= images.length) setCurrentIndex(0);
  }, [images, currentIndex]);

  const currentImage = images && images.length ? images[currentIndex] : product.image_url || "/placeholder.png";

  const discountPercent =
    product.discountPrice && product.price
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : product.discount_percent ?? 0;

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
        // ignore
      } finally {
        setTimeout(() => setIsAdding(false), 600);
      }
    },
    [addItem, openCart]
  );

  const handleThumbKey = (e, idx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setCurrentIndex(idx);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1));
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Breadcrumb / Back */}
        <div className="mb-4">
          <Button variant="link" asChild className="pl-0">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Menu
            </button>
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Image Gallery (left) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              {/* Main image */}
              <div className="border border-border rounded-lg mb-4 aspect-square overflow-hidden bg-muted">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
                {discountPercent > 0 && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="destructive">Save {discountPercent}%</Badge>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-6 gap-2">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      onKeyDown={(e) => handleThumbKey(e, idx)}
                      aria-pressed={idx === currentIndex}
                      className={`border rounded overflow-hidden aspect-square ${
                        idx === currentIndex ? "border-primary ring-2 ring-primary" : "border-border"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info (center) */}
          <div className="lg:col-span-4">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            {/* <div className="mb-4">
              <RatingStars rating={product.rating ?? 5} count={product.reviewCount ?? 0} size="md" />
            </div> */}

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-price">
                  Rs.{product.discountPrice || product.price}
                </span>
                {discountPercent > 0 && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      Rs.{product.price}
                    </span>
                    <Badge variant="destructive">Save {discountPercent}%</Badge>
                  </>
                )}
              </div>
              {product.isPrime && (
                <Badge className="bg-prime text-prime-foreground">
                  Prime Free Delivery
                </Badge>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="font-semibold mb-2">About this item</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {product.description || "No description available."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span>Made from premium-quality ingredients for authentic taste and freshness.</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span>Prepared under hygienic conditions following strict food safety standards.</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span>Free from harmful preservatives, artificial colors, or flavors.</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span>Perfect for everyday meals, festive occasions, and quick snack cravings.</span>
                </li>
              </ul>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3 mb-6 p-4 bg-muted rounded">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free delivery on orders over $25</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>

          {/* Buy Box (right) */}
          <div className="lg:col-span-3">
            <div className="border border-border rounded-lg p-4 sticky top-24">
              <div className="mb-4">
                <div className="text-3xl font-bold text-price mb-1">
                  Rs.{product.discountPrice || product.price}
                </div>
                {product.isPrime && (
                  <div className="text-sm text-prime font-semibold mb-2">
                    FREE delivery tomorrow
                  </div>
                )}
                <div className="text-sm">
                  {Number(product.stock ?? 0) > 0 ? (
                    <span className="text-green-600 font-semibold">In Stock</span>
                  ) : (
                    <span className="text-destructive">Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="text-sm font-semibold block mb-2">
                  Quantity:
                </label>
                {/* keeps original select behavior (not wired to add quantity) */}
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-cta hover:bg-cta-hover text-cta-foreground"
                  disabled={Number(product.stock ?? 0) <= 0 || isAdding}
                >
                  {isAdding ? "Adding..." : "Add to Cart"}
                </Button>
                <Button
                  // Keep original Buy Now button behavior (visual only here)
                  className="w-full"
                  variant="outline"
                >
                  Buy Now
                </Button>
              </div>

              {/* Security */}
              <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure transaction</span>
                </div>
                <p>Ships from and sold by amazoon.</p>
              </div>
            </div>
          </div>
        </div>

        {/* (No reviews in original file — kept content as-is) */}
      </main>

      {/* <Footer /> */}
    </div>
  );
}

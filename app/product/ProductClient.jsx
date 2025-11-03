


// "use client";
// import React, { useCallback, useMemo, useState } from "react";
// import { Star, ShoppingCart, ArrowLeft, Truck, ShieldCheck, RotateCcw } from "lucide-react";
// import { useCart } from "@/contexts/CartContext";
// import { useRouter } from "next/navigation";
// import { useProducts } from "@/contexts/ProductContext";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// // import RatingStars from "@/components/RatingStars";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// function extractYouTubeId(url) {
//   if (!url || typeof url !== "string") return null;
//   try {
//     const s = url.trim();
//     const patterns = [
//       /(?:youtube\.com\/shorts\/)([A-Za-z0-9_-]{4,})/,
//       /(?:youtube\.com\/watch\?v=)([A-Za-z0-9_-]{4,})/,
//       /(?:youtu\.be\/)([A-Za-z0-9_-]{4,})/,
//       /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{4,})/,
//       /v=([A-Za-z0-9_-]{4,})/,
//     ];
//     for (const re of patterns) {
//       const m = s.match(re);
//       if (m && m[1]) return m[1];
//     }
//     const u = new URL(s.startsWith("http") ? s : `https://${s}`);
//     const seg = (u.pathname || "").split("/").filter(Boolean).pop();
//     if (seg && /^[A-Za-z0-9_-]{4,}$/.test(seg)) return seg;
//   } catch (e) {
//     // ignore
//   }
//   return null;
// }

// /** Normalize a possible image value (string or object) to a URL string or null */
// function normalizeUrl(val) {
//   if (!val) return null;
//   if (typeof val === "string") {
//     const s = val.trim();
//     if (!s) return null;
//     return s;
//   }
//   if (typeof val === "object") {
//     // common fields
//     return (
//       val.url ??
//       val.image_url ??
//       val.image ??
//       val.src ??
//       val.thumb ??
//       val.path ??
//       null
//     );
//   }
//   return null;
// }

// export default function ProductClient({ product }) {
//   const { addItem, openCart } = useCart() || {};
//   const [isAdding, setIsAdding] = useState(false);
//   const router = useRouter();
//   const { products } = useProducts() || { products: [] };

//   if (!product) return null;

//   // Build images array robustly and dedupe
//   const images = useMemo(() => {
//     const out = [];
//     const seen = new Set();

//     const pushIf = (v) => {
//       const url = normalizeUrl(v);
//       if (!url) return;
//       const key = url;
//       if (seen.has(key)) return;
//       seen.add(key);
//       out.push(String(url));
//     };

//     pushIf(product.imageUrl);
//     pushIf(product.image);
//     pushIf(product.image_url);

//     if (Array.isArray(product.images) && product.images.length > 0) {
//       product.images.forEach((it) => pushIf(it));
//     }

  
//     const fallback = product.image_url ?? product.image ?? product.imageUrl ?? null;
//     pushIf(fallback);

//     return out;
//   }, [product]);
//      console.log("product",product)
//   // Determine YouTube embed URL (if any)
//   const videoEmbedUrl = useMemo(() => {
//     const candidate =
//       product.video_url ??
//       product.video ??
//       (Array.isArray(product.videos) && product.videos.length ? product.videos[0] : null);

//     const youtubeId = extractYouTubeId(candidate);
//     if (youtubeId) {
//       // return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;
//     }
//       // https://youtu.be/Z-k9TGQYjv8
//     // preserve original fallback id you had
//     const fallbackId = "Z-k9TGQYjv8";
//     // Only return fallback if there is at least some candidate (to avoid showing video tile unnecessarily)
//     // but user wanted to show video beside images — we keep fallback available always as you had previously
//     return `https://www.youtube.com/embed/${fallbackId}?rel=0&modestbranding=1`;
//   }, [product]);

//   // Video presence flag: if product provided an explicit video field then show as a selectable tile.
//   const hasExplicitVideo = useMemo(() => {
//     const candidate =
//       product.video_url ??
//       product.video ??
//       (Array.isArray(product.videos) && product.videos.length ? product.videos[0] : null);
//     return Boolean(candidate);
//   }, [product]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   React.useEffect(() => {
//     if (!images || images.length === 0) {
//       setCurrentIndex(0);
//       return;
//     }
//     if (currentIndex >= images.length) setCurrentIndex(0);
//   }, [images, currentIndex]);

//   const currentImage = images && images.length && currentIndex >= 0
//     ? images[currentIndex]
//     : product.image_url || "";
//      console.log("images",)
//   const discountPercent =
//     Number(product.discountPrice) > 0 && Number(product.price) > 0
//       ? Math.round(((Number(product.price) - Number(product.discountPrice)) / Number(product.price)) * 100)
//       : (product.discount_percent ?? 0);

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
//           window.dispatchEvent(
//             new CustomEvent("productAddToCart", {
//               detail: { product: productToAdd, quantity: 1 },
//             })
//           );
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

//   // fallback main image on error
//   const [mainImgError, setMainImgError] = useState(false);
//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-1 container mx-auto px-4 py-6">
//         <div className="mb-4">
//           <Button variant="link" asChild className="pl-0">
//             <button
//               onClick={() => router.push("/")}
//               className="flex items-center gap-2 text-sm"
//             >
//               <ArrowLeft className="h-4 w-4 mr-1" />
//             </button>
//           </Button>
//         </div>

//         <div className="grid lg:grid-cols-12 gap-8">
//           <div className="lg:col-span-5">
//             <div className="sticky top-24">
//               <div className="border border-border rounded-lg mb-4 aspect-square overflow-hidden bg-muted relative">
//                 {/* If video selected (currentIndex === -1) show iframe */}
//                 {currentIndex === -1 ? (
//                   <iframe
//                     title={`${product.name} video`}
//                     src={videoEmbedUrl}
//                     className="w-full h-full"
//                     allowFullScreen
//                   />
//                 ) : (
//                   <>
//                     <img
//                       src={mainImgError ? "" : currentImage || ""}
//                       alt={product.name}
//                       className="w-full h-full object-contain p-4"
//                       onError={(e) => {
//                         setMainImgError(true);
//                       }}
//                     />
//                   </>
//                 )}

//                 {discountPercent > 0 && (
//                   <div className="absolute top-4 left-4">
//                     <Badge variant="destructive">Save {discountPercent}%</Badge>
//                   </div>
//                 )}
//               </div>

//               {/* Thumbnails + optional video tile */}
//               {(images.length > 0 || videoEmbedUrl) && (
//                 <div className="grid grid-cols-6 gap-2 items-center">
//                   {images.map((src, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                         setCurrentIndex(idx);
//                         setMainImgError(false);
//                       }}
//                       onKeyDown={(e) => handleThumbKey(e, idx)}
//                       aria-pressed={idx === currentIndex}
//                       className={`border rounded overflow-hidden aspect-square focus:outline-none ${
//                         idx === currentIndex ? "border-primary ring-2 ring-primary" : "border-border"
//                       }`}
//                       title={`View image ${idx + 1}`}
//                     >
//                       <img
//                         src={src}
//                         alt={`${product.name} ${idx + 1}`}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           // hide broken thumbnail by setting to placeholder
//                           // e.currentTarget.src = "/placeholder.png";
//                         }}
//                       />
//                     </button>
//                   ))}

//                   {/* Video tile: show only if there's an explicit video OR you want fallback */}
//                   {videoEmbedUrl && (
//                     <button
//                       key="video-tile"
//                       onClick={() => setCurrentIndex(-1)}
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter" || e.key === " ") {
//                           e.preventDefault();
//                           setCurrentIndex(-1);
//                         }
//                       }}
//                       aria-pressed={currentIndex === -1}
//                       className={`border rounded overflow-hidden aspect-square flex items-center justify-center p-0 focus:outline-none ${
//                         currentIndex === -1 ? "border-primary ring-2 ring-primary" : "border-border"
//                       }`}
//                       title="Play product video"
//                     >
//                       {/* small embedded iframe preview (kept light) */}
//                       <div className="w-full h-full bg-black/5 flex items-center justify-center">
//                         <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
//                           <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
//                         </svg>
//                       </div>
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Product Info (center) */}
//           <div className="lg:col-span-4">
//             <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

//             {/* Rating */}
//             {/* <div className="mb-4">
//               <RatingStars rating={product.rating ?? 5} count={product.reviewCount ?? 0} size="md" />
//             </div> */}
//             <div className="mb-6 pb-6 border-b border-border">
//               <div className="flex items-baseline gap-3 mb-2">
//                 {Number(product.discountPrice) > 0 && (
//                   <>
//                     <span className="text-lg text-muted-foreground line-through">
//                       Rs.{product.price}
//                     </span>
//                     <Badge variant="destructive">Save {discountPercent}%</Badge>
//                   </>
//                 )}
//               </div>
//               {product.isPrime && (
//                 <Badge className="bg-prime text-prime-foreground">
//                   Prime Free Delivery
//                 </Badge>
//               )}
//             </div>

//             {/* Description */}
//             <div className="mb-6">
//               <h2 className="font-semibold mb-2">About this item</h2>
//               <p className="text-sm text-muted-foreground mb-4">
//                 {product.description || "No description available."}
//               </p>
//               <ul className="space-y-2">
//                 <li className="flex items-start gap-2 text-sm">
//                   <span className="text-primary mt-1">•</span>
//                   <span>Made from premium-quality ingredients for authentic taste and freshness.</span>
//                 </li>
//                 <li className="flex items-start gap-2 text-sm">
//                   <span className="text-primary mt-1">•</span>
//                   <span>Prepared under hygienic conditions following strict food safety standards.</span>
//                 </li>
//                 <li className="flex items-start gap-2 text-sm">
//                   <span className="text-primary mt-1">•</span>
//                   <span>Free from harmful preservatives, artificial colors, or flavors.</span>
//                 </li>
//                 <li className="flex items-start gap-2 text-sm">
//                   <span className="text-primary mt-1">•</span>
//                   <span>Perfect for everyday meals, festive occasions, and quick snack cravings.</span>
//                 </li>
//               </ul>
//             </div>

//             {/* Delivery Info */}
//             {/* <div className="space-y-3 mb-6 p-4 bg-muted rounded">
//               <div className="flex items-center gap-3 text-sm">
//                 <Truck className="h-5 w-5 text-primary" />
//                 <span>Free delivery on orders over $25</span>
//               </div>
//               <div className="flex items-center gap-3 text-sm">
//                 <RotateCcw className="h-5 w-5 text-primary" />
//                 <span>30-day returns</span>
//               </div>
//               <div className="flex items-center gap-3 text-sm">
//                 <ShieldCheck className="h-5 w-5 text-primary" />
//                 <span>2-year warranty included</span>
//               </div>
//             </div> */}
//           </div>

//           {/* Buy Box (right) */}
//           <div className="lg:col-span-3">
//             <div className="border border-border rounded-lg p-4 sticky top-24">
//               <div className="mb-4">
//                 <div className="text-3xl font-bold text-price mb-1">
//                   Rs.{product.discountPrice || product.price}
//                 </div>
//                 {product.isPrime && (
//                   <div className="text-sm text-prime font-semibold mb-2">
//                     FREE delivery tomorrow
//                   </div>
//                 )}
//                 <div className="text-sm">
//                   {Number(product.stock ?? 0) > 0 ? (
//                     <span className="text-green-600 font-semibold">In Stock</span>
//                   ) : (
//                     <span className="text-destructive">Out of Stock</span>
//                   )}
//                 </div>
//               </div>

//               {/* Quantity */}
//               <div className="mb-4">
//                 <label className="text-sm font-semibold block mb-2">
//                   Quantity:
//                 </label>
//                 {/* keeps original select behavior (not wired to add quantity) */}
//                 <Select defaultValue="1">
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {[1, 2, 3].map((num) => (
//                       <SelectItem key={num} value={num.toString()}>
//                         {num}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Buttons */}
//               <div className="space-y-2">
//                 <Button
//                   onClick={() => handleAddToCart(product)}
//                   className="w-full bg-cta hover:bg-green-hover text-cta-foreground"
//                   disabled={Number(product.stock ?? 0) <= 0 || isAdding}
//                 >
//                   {isAdding ? "Adding..." : "Add to Cart"}
//                 </Button>
//               </div>

//               {/* Security */}
//               <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
//                 <div className="flex items-center gap-2 mb-2">
//                   <ShieldCheck className="h-4 w-4" />
//                   <span>Secure transaction</span>
//                 </div>
//                 {/* <p>Ships from and sold by amazoon.</p> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
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
  try {
    const s = url.trim();
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
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    const seg = (u.pathname || "").split("/").filter(Boolean).pop();
    if (seg && /^[A-Za-z0-9_-]{4,}$/.test(seg)) return seg;
  } catch (e) {
    // ignore
  }
  return null;
}

/** normalize string/object -> string (may still be relative) */
function normalizeRaw(val) {
  if (!val) return null;
  if (typeof val === "string") {
    const s = val.trim();
    if (!s) return null;
    return s;
  }
  if (typeof val === "object") {
    return (
      val.url ??
      val.image_url ??
      val.image ??
      val.src ??
      val.thumb ??
      val.path ??
      null
    );
  }
  return null;
}

/**
 * Resolve URL to absolute when possible.
 * - If `candidate` starts with http(s) => return as-is
 * - Else if `product._raw.imageUrl` or `product.raw.image_url` exists and looks absolute,
 *   glue the filename from candidate onto that base.
 * - Else return candidate unchanged (fallback).
 */
function resolveToAbsolute(candidate, product) {
  if (!candidate) return null;
  const s = candidate.trim();
  if (!s) return null;
  // already absolute
  if (/^https?:\/\//i.test(s)) return s;

  // if it looks like an absolute path from server (starts with /), return as-is
  if (s.startsWith("/")) return s;

  // try to find a reference absolute url from product (several variants)
  const ref =
    normalizeRaw(product?._raw?.imageUrl) ||
    normalizeRaw(product?.raw?.image_url) ||
    normalizeRaw(product?.raw?.imageUrl) ||
    normalizeRaw(product?._raw?.image_url) ||
    null;

  if (ref && /^https?:\/\//i.test(ref)) {
    // If candidate already contains a filename, use that filename and replace last segment of ref
    try {
      const fileName = s.split("/").pop();
      if (!fileName) return ref;
      // derive base by removing last path segment from ref
      const base = ref.replace(/\/[^\/]+$/, "");
      return `${base}/${fileName}`;
    } catch {
      return ref;
    }
  }

  // As last attempt, if candidate looks like "products/xxx" but product has image field full URL in raw.raw.image_url
  const altRef = normalizeRaw(product?.raw?.image_url) || normalizeRaw(product?._raw?.image_url);
  if (altRef && /^https?:\/\//i.test(altRef)) {
    try {
      const fileName = s.split("/").pop();
      const base = altRef.replace(/\/[^\/]+$/, "");
      return `${base}/${fileName}`;
    } catch {
      return altRef;
    }
  }

  // nothing to resolve to — return candidate unchanged
  return s;
}

export default function ProductClient({ product }) {
  const { addItem, openCart } = useCart() || {};
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();
  const { products } = useProducts() || { products: [] };

  if (!product) return null;

  // Build images array robustly and dedupe
  const images = useMemo(() => {
    const out = [];
    const seen = new Set();

    const pushIf = (v) => {
      const raw = normalizeRaw(v);
      if (!raw) return;
      const resolved = resolveToAbsolute(raw, product);
      if (!resolved) return;
      if (seen.has(resolved)) return;
      seen.add(resolved);
      out.push(String(resolved));
    };

    // Prefer fully-qualified URLs from raw/_raw first (these often contain complete URL)
    pushIf(product?._raw?.imageUrl);
    pushIf(product?.raw?.image_url);
    pushIf(product?.raw?.imageUrl);
    pushIf(product?._raw?.image_url);

    // Then the top-level fields (may be relative)
    pushIf(product.imageUrl);
    pushIf(product.image_url);
    pushIf(product.image);

    // Also include any array of images
    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((it) => pushIf(it));
    }

    // final fallback: use product.raw?.image_url or product._raw?.imageUrl directly (already pushed above, but keep)
    const fallback = normalizeRaw(product.image_url) ?? normalizeRaw(product.image) ?? normalizeRaw(product.imageUrl) ?? null;
    pushIf(fallback);
    return out;
  }, [product]);
  console.log("Product",product)
  // Determine YouTube embed URL (if any)
  const videoEmbedUrl = useMemo(() => {
    const candidate =
      product.videoUrl ??
      product.videoUrl ??
      (Array.isArray(product.videos) && product.videos.length ? product.videos[0] : null);

    const youtubeId = extractYouTubeId(candidate);
    if (youtubeId) {
      // return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;
    }
    // preserve original fallback id you had
    const fallbackId = "Z-k9TGQYjv8";
    return `https://www.youtube.com/embed/${fallbackId}?rel=0&modestbranding=1`;
  }, [product]);

  // Video presence flag: if product provided an explicit video field then show as a selectable tile.
  const hasExplicitVideo = useMemo(() => {
    const candidate =
      product.video_url ??
      product.video ??
      (Array.isArray(product.videos) && product.videos.length ? product.videos[0] : null);
    return Boolean(candidate);
  }, [product]);
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (!images || images.length === 0) {
      setCurrentIndex(0);
      return;
    }
    if (currentIndex >= images.length) setCurrentIndex(0);
  }, [images, currentIndex]);

  // Ensure currentImage is a resolved absolute (if available)
  const currentImage =
    images && images.length && currentIndex >= 0
      ? images[currentIndex]
      : // fallback: try to resolve top-level fields to absolute as well
        resolveToAbsolute(
          normalizeRaw(product.imageUrl) ??
            normalizeRaw(product.image_url) ??
            normalizeRaw(product.image) ??
            null,
          product
        ) ??
        "";

  const discountPercent =
    Number(product.discountPrice) > 0 && Number(product.price) > 0
      ? Math.round(((Number(product.price) - Number(product.discountPrice)) / Number(product.price)) * 100)
      : (product.discount_percent ?? 0);

  const handleAddToCart = useCallback(
    (productToAdd) => {
      if (!productToAdd) return;
      const stockVal = Number(productToAdd?.stock ?? Infinity);
      if (!Number.isFinite(stockVal) || stockVal <= 0) return;
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

  // fallback main image on error
  const [mainImgError, setMainImgError] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-4">
          <Button variant="link" asChild className="pl-0">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
            </button>
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="border border-border rounded-lg mb-4 aspect-square overflow-hidden bg-muted relative">
                {/* If video selected (currentIndex === -1) show iframe */}
                {currentIndex === -1 ? (
                  <iframe
                    title={`${product.name} video`}
                    src={videoEmbedUrl}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={mainImgError ? "" : currentImage || ""}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                      onError={() => {
                        setMainImgError(true);
                      }}
                    />
                  </>
                )}

                {discountPercent > 0 && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="destructive">Save {discountPercent}%</Badge>
                  </div>
                )}
              </div>

              {/* Thumbnails + optional video tile */}
              {(images.length > 0 || videoEmbedUrl) && (
                <div className="grid grid-cols-6 gap-2 items-center">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setMainImgError(false);
                      }}
                      onKeyDown={(e) => handleThumbKey(e, idx)}
                      aria-pressed={idx === currentIndex}
                      className={`border rounded overflow-hidden aspect-square focus:outline-none ${
                        idx === currentIndex ? "border-primary ring-2 ring-primary" : "border-border"
                      }`}
                      title={`View image ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={() => {
                          // ignored for thumbnails (we keep them hidden by not pushing broken ones)
                        }}
                      />
                    </button>
                  ))}
                  {/* Video tile: show only if there's an explicit video OR you want fallback */}
                  {videoEmbedUrl && (
                    <button
                      key="video-tile"
                      onClick={() => setCurrentIndex(-1)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setCurrentIndex(-1);
                        }
                      }}
                      aria-pressed={currentIndex === -1}
                      className={`border rounded overflow-hidden aspect-square flex items-center justify-center p-0 focus:outline-none ${
                        currentIndex === -1 ? "border-primary ring-2 ring-primary" : "border-border"
                      }`}
                      title="Play product video"
                    >
                      {/* small embedded iframe preview (kept light) */}
                      <div className="w-full h-full bg-black/5 flex items-center justify-center">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                        </svg>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Product Info (center) */}
          <div className="lg:col-span-4">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-baseline gap-3 mb-2">
                {Number(product.discountPrice) > 0 && (
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
              <div className="space-y-2" >
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={Number(product.stock ?? 0) <= 0 || isAdding}
                >
                  {isAdding ? "Adding..." : "Add to Cart"}
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure transaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

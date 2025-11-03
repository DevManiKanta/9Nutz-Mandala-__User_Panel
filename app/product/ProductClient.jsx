
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
//   // common YouTube URL patterns: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/shorts/ID, ...with params
//   try {
//     const s = url.trim();
//     // quick checks
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
//     // fallback: try last path segment
//     const u = new URL(s.startsWith("http") ? s : `https://${s}`);
//     const seg = (u.pathname || "").split("/").filter(Boolean).pop();
//     if (seg && /^[A-Za-z0-9_-]{4,}$/.test(seg)) return seg;
//   } catch (e) {
//     // ignore
//   }
//   return null;
// }

// export default function ProductClient({ product }) {
//   const { addItem, openCart } = useCart() || {};
//   const [isAdding, setIsAdding] = useState(false);
//   const router = useRouter();
//   const { products } = useProducts() || { products: [] };

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
//           const url = it.image_url ?? it.url ?? it.image ?? null;
//           if (url && !out.includes(url)) out.push(String(url));
//         }
//       });
//     }

//     if (out.length === 0) {
//       const fallback = product.image_url ?? product.image ?? null;
//       if (fallback) out.push(String(fallback));
//     }

//     return out;
//   }, [product]);

//   // Determine YouTube embed URL
//   const videoEmbedUrl = useMemo(() => {
//     // product may provide video fields (video_url, video)
//     const candidate =
//       product.video_url ??
//       product.video ??
//       (Array.isArray(product.videos) && product.videos.length ? product.videos[0] : null);

//     // If candidate exists and is a YouTube URL, extract id
//     const youtubeId = extractYouTubeId(candidate);
//     if (youtubeId) {
//       // use modest branding and allow fullscreen; do not autoplay by default
//       return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;
//     }

//     // If product didn't provide a YouTube link, as requested: use the specific YouTube Shorts URL you provided.
//     // NOTE: we embed the ID below (G--NLgSNCmE).
//     const fallbackId = "G--NLgSNCmE";
//     return `https://www.youtube.com/embed/${fallbackId}?rel=0&modestbranding=1`;
//   }, [product]);

//   const [currentIndex, setCurrentIndex] = useState(0);

//   React.useEffect(() => {
//     if (!images || images.length === 0) {
//       setCurrentIndex(0);
//       return;
//     }
//     if (currentIndex >= images.length) setCurrentIndex(0);
//   }, [images, currentIndex]);

//   const currentImage = images && images.length ? images[currentIndex] : product.image_url || "/placeholder.png";

// const discountPercent =
//   Number(product.discountPrice) > 0 && Number(product.price) > 0
//     ? Math.round(((Number(product.price) - Number(product.discountPrice)) / Number(product.price)) * 100)
//     : (product.discount_percent ?? 0);


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
//               {/* Back to Menu */}
//             </button>
//           </Button>
//         </div>

//         <div className="grid lg:grid-cols-12 gap-8">
//           {/* Image Gallery (left) */}
//           <div className="lg:col-span-5">
//             <div className="sticky top-24">
//               {/* Main image */}
//               <div className="border border-border rounded-lg mb-4 aspect-square overflow-hidden bg-muted">
//                 <img
//                   src={currentImage}
//                   alt={product.name}
//                   className="w-full h-full object-contain p-4"
//                 />
//                 {discountPercent > 0 && (
//                   <div className="absolute top-4 left-4">
//                     <Badge variant="destructive">Save {discountPercent}%</Badge>
//                   </div>
//                 )}
//               </div>

//               {/* Thumbnails */}
//               {images.length > 1 && (
//                 <div className="grid grid-cols-6 gap-2">
//                   {images.map((src, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setCurrentIndex(idx)}
//                       onKeyDown={(e) => handleThumbKey(e, idx)}
//                       aria-pressed={idx === currentIndex}
//                       className={`border rounded overflow-hidden aspect-square ${
//                         idx === currentIndex ? "border-primary ring-2 ring-primary" : "border-border"
//                       }`}
//                     >
//                       <img
//                         src={src}
//                         alt={`${product.name} ${idx + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
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
//            <div className="mb-6 pb-6 border-b border-border">
//   <div className="flex items-baseline gap-3 mb-2">
//     {Number(product.discountPrice) > 0 && (
//       <>
//         <span className="text-lg text-muted-foreground line-through">
//           Rs.{product.price}
//         </span>
//         <Badge variant="destructive">Save {discountPercent}%</Badge>
//       </>
//     )}
//   </div>
//   {product.isPrime && (
//     <Badge className="bg-prime text-prime-foreground">
//       Prime Free Delivery
//     </Badge>
//   )}
// </div>


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
//             <div className="space-y-3 mb-6 p-4 bg-muted rounded">
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
//             </div>
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
//                   className="w-full bg-cta hover:bg-cta-hover text-cta-foreground"
//                   disabled={Number(product.stock ?? 0) <= 0 || isAdding}
//                 >
//                   {isAdding ? "Adding..." : "Add to Cart"}
//                 </Button>
//                 <Button
//                   // Keep original Buy Now button behavior (visual only here)
//                   className="w-full"
//                   variant="outline"
//                 >
//                   Buy Now
//                 </Button>
//               </div>

//               {/* Security */}
//               <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
//                 <div className="flex items-center gap-2 mb-2">
//                   <ShieldCheck className="h-4 w-4" />
//                   <span>Secure transaction</span>
//                 </div>
//                 <p>Ships from and sold by amazoon.</p>
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

/** Normalize a possible image value (string or object) to a URL string or null */
function normalizeUrl(val) {
  if (!val) return null;
  if (typeof val === "string") {
    const s = val.trim();
    if (!s) return null;
    return s;
  }
  if (typeof val === "object") {
    // common fields
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
      const url = normalizeUrl(v);
      if (!url) return;
      const key = url;
      if (seen.has(key)) return;
      seen.add(key);
      out.push(String(url));
    };

    pushIf(product.imageUrl);
    pushIf(product.image); // also check these fields
    pushIf(product.image_url);

    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((it) => pushIf(it));
    }

    // some APIs return videos array with thumbnails; but keep images first
    // fallback single fields
    const fallback = product.image_url ?? product.image ?? product.imageUrl ?? null;
    pushIf(fallback);

    return out;
  }, [product]);

  // Determine YouTube embed URL (if any)
  const videoEmbedUrl = useMemo(() => {
    const candidate =
      product.video_url ??
      product.video ??
      (Array.isArray(product.videos) && product.videos.length ? product.videos[0] : null);

    const youtubeId = extractYouTubeId(candidate);
    if (youtubeId) {
      // return `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;
    }
      // https://youtu.be/Z-k9TGQYjv8
    // preserve original fallback id you had
    const fallbackId = "Z-k9TGQYjv8";
    // Only return fallback if there is at least some candidate (to avoid showing video tile unnecessarily)
    // but user wanted to show video beside images — we keep fallback available always as you had previously
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

  // currentIndex: 0..images.length-1 for images, -1 selected video
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (!images || images.length === 0) {
      setCurrentIndex(0);
      return;
    }
    if (currentIndex >= images.length) setCurrentIndex(0);
  }, [images, currentIndex]);

  const currentImage = images && images.length && currentIndex >= 0
    ? images[currentIndex]
    : product.image_url || "";

  const discountPercent =
    Number(product.discountPrice) > 0 && Number(product.price) > 0
      ? Math.round(((Number(product.price) - Number(product.discountPrice)) / Number(product.price)) * 100)
      : (product.discount_percent ?? 0);

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
              {/* Back to Menu */}
            </button>
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Image Gallery (left) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              {/* Main image / video container */}
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
                      src={mainImgError ? "/placeholder.png" : currentImage || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                      onError={(e) => {
                        setMainImgError(true);
                        // optionally clear src to avoid repeated errors
                        e.currentTarget.src = "/placeholder.png";
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
                        onError={(e) => {
                          // hide broken thumbnail by setting to placeholder
                          e.currentTarget.src = "/placeholder.png";
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

            {/* Rating */}
            {/* <div className="mb-4">
              <RatingStars rating={product.rating ?? 5} count={product.reviewCount ?? 0} size="md" />
            </div> */}
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

            {/* Delivery Info */}
            {/* <div className="space-y-3 mb-6 p-4 bg-muted rounded">
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
            </div> */}
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
                  className="w-full bg-cta hover:bg-green-hover text-cta-foreground"
                  disabled={Number(product.stock ?? 0) <= 0 || isAdding}
                >
                  {isAdding ? "Adding..." : "Add to Cart"}
                </Button>
              </div>

              {/* Security */}
              <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure transaction</span>
                </div>
                {/* <p>Ships from and sold by amazoon.</p> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

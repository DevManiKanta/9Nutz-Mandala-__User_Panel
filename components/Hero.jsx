
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import apiAxios, { API_BASE } from "@/lib/api";
// import { Login_API_BASE } from "@/lib/api";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import Link from "next/link";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// const PLACEHOLDER =
//   "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Crect fill='%23f3f4f6' width='1200' height='800'/%3E%3Ctext fill='%239ca3af' font-family='Arial, Helvetica, sans-serif' font-size='28' x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'%3EImage not available%3C/text%3E%3C/svg%3E";

// /** Helper: Convert backend image path to full URL */
// function toFullImageUrl(img) {
//   const val = img ?? "";
//   if (!val) return "";
//   if (val.startsWith("http://") || val.startsWith("https://") || val.startsWith("data:")) return val;
//   const base = (API_BASE || process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/+$/, "");
//   if (!base) return val;
//   if (val.startsWith("/")) return `${base}${val}`;
//   return `${base}/${val}`;
// }

// /** Public API call */
// export async function getCategoriesPublicAPI() {
//   try {
//     const res = await axios.get(`${Login_API_BASE}/category/show`, { headers: { "Content-Type": "application/json" } });
//     return Array.isArray(res.data?.data) ? res.data.data : [];
//   } catch (err) {
    
//     throw err;
//   }
// }

// /** Main Hero Component */
// export default function Hero() {
//   const [banners, setBanners] = useState([]);
//   const [currentBanner, setCurrentBanner] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
//   const [categoriesError, setCategoriesError] = useState(null);

//   const autoplayRef = useRef(null);
//   const isHoveringRef = useRef(false);

//   // Fetch banners from API
//   useEffect(() => {
//     let cancelled = false;
//     setLoading(true);
//     setError(null);

//     const fetchBanners = async () => {
//       try {
//         // Use explicit base to match other public endpoints
//         const res = await axios.get(`${Login_API_BASE}/list-banners`, { headers: { "Content-Type": "application/json" } });
//         if (cancelled) return;

//         const payload = res?.data ?? null;
//         const rows =
//           Array.isArray(payload?.data) ?
//             payload.data :
//             Array.isArray(payload?.banners) ?
//               payload.banners :
//               Array.isArray(payload) ?
//                 payload :
//                 [];

//         const active = rows.filter((b) => b && (b.is_active === 1 || b.is_active === true || b.is_active === "1"));
//         const source = active.length ? active : rows;

//         const mapped = (source || []).map((b) => {
//           // Prefer redirect_url if it is an absolute URL; else convert image_url to full
//           const redirect = b?.redirect_url ? String(b.redirect_url).trim() : "";
//           const redirectIsAbsolute = redirect && (redirect.startsWith("http://") || redirect.startsWith("https://") || redirect.startsWith("data:"));
//           const imageSrc = redirectIsAbsolute ? redirect : toFullImageUrl(b?.image_url ?? b?.image ?? "");

//           return {
//             id: b?.id ?? `${b?.title ?? "banner"}-${Math.random().toString(36).slice(2, 8)}`,
//             title: b?.title ?? "",
//             subtitle: b?.subtitle ?? "",
//             discount: b?.discount ?? "",
//             image_url: imageSrc || "",      // final URL used for rendering
//             redirect_url: redirect || "",
//             is_active: b?.is_active ?? 0,
//             raw: b,
//           };
//         });

//         setBanners(mapped);
//       } catch (err) {
        
//         if (!cancelled) {
//           setError("Failed to load banners.");
//           setBanners([]);
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     fetchBanners();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // Fetch categories
//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       setCategoriesLoading(true);
//       setCategoriesError(null);
//       try {
//         const rows = await getCategoriesPublicAPI();
//         if (cancelled) return;
//         const norm = (rows || []).map((r) => ({
//           id: r.id,
//           name: r.name ?? r.title ?? "",
//           image: r.image ?? "",
//           image_url: r.image_url ?? toFullImageUrl(r.image ?? ""),
//           products_count: r.products_count ?? 0,
//         }));
//         setCategories(norm);
//       } catch (err) {
//         setCategoriesError(String(err?.message ?? err) || "Failed to load categories");
//         setCategories([]);
//       } finally {
//         if (!cancelled) setCategoriesLoading(false);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // Auto slide logic
//   useEffect(() => {
//     const start = () => {
//       stop();
//       autoplayRef.current = window.setInterval(() => {
//         if (!isHoveringRef.current) {
//           setCurrentBanner((p) => (banners.length ? (p + 1) % banners.length : 0));
//         }
//       }, 4500);
//     };
//     const stop = () => {
//       if (autoplayRef.current) {
//         clearInterval(autoplayRef.current);
//         autoplayRef.current = null;
//       }
//     };
//     start();
//     return () => stop();
//   }, [banners.length]);

//   // Keyboard nav
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "ArrowLeft") setCurrentBanner((p) => (banners.length ? (p - 1 + banners.length) % banners.length : 0));
//       if (e.key === "ArrowRight") setCurrentBanner((p) => (banners.length ? (p + 1) % banners.length : 0));
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [banners.length]);

//   const nextBanner = () => setCurrentBanner((p) => (banners.length ? (p + 1) % banners.length : 0));
//   const prevBanner = () => setCurrentBanner((p) => (banners.length ? (p - 1 + banners.length) % banners.length : 0));

//   return (
//     <div className="mb-4">
//       {/* Top hero/banner wrapper: use w-full to avoid viewport overflow from w-screen + translate */}
//       <div
//         className="relative overflow-hidden w-full rounded-2xl shadow-lg"
//         onMouseEnter={() => (isHoveringRef.current = true)}
//         onMouseLeave={() => (isHoveringRef.current = false)}
//       >
//         {/* Loading / Error / Empty States */}
//         {loading ? (
//           <div className="w-full h-[54vh] flex items-center justify-center text-gray-500">Loading banners...</div>
//         ) : error ? (
//           <div className="w-full h-[54vh] flex items-center justify-center bg-red-50 text-red-600">{error}</div>
//         ) : banners.length === 0 ? (
//           <div className="w-full h-[54vh] flex items-center justify-center text-gray-500">No banners available</div>
//         ) : (
//           // Banner carousel using API-provided image_url (or redirect_url when absolute)
//           <section className="relative w-full h-[54vh] min-h-[320px] overflow-hidden" style={{ imageRendering: 'high-quality' }}>
//             <div
//               className="flex h-full transition-transform duration-700 ease-in-out"
//               style={{ transform: `translateX(-${currentBanner * 100}%)`, width: `${Math.max(1, banners.length) * 100}%` }}
//             >
//               {banners.map((b) => {
//                 return (
//                 <div key={b.id} className="relative flex-shrink-0 w-full h-full">
//                   {/* Clear background image (no blur, no scaling) */}
//                   <img
//                     src={`${b.image_url || PLACEHOLDER}?v=${Date.now()}`}
//                     alt={b.title || "Banner"}
//                     className="absolute inset-0 w-full h-full object-cover object-center banner-image"
//                     loading="eager"
//                     decoding="async"
//                     style={{
//                       imageRendering: 'high-quality',
//                       filter: 'none !important',
//                       transform: 'none !important',
//                       WebkitFilter: 'none !important',
//                       WebkitTransform: 'none !important'
//                     }}
//                     onError={(e) => {
//                       try { e.currentTarget.src = PLACEHOLDER; } catch (err) {}
//                     }}
//                   />

//                   {/* Subtle overlay for better text readability */}
//                   <div className="absolute inset-0 bg-black/10" />

//                   {/* Content container (centered with max width) */}
//                   <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
//                     {/* Right: Poster card (smaller, fixed width; shows placeholder on error) */}
//                     <div className="flex-shrink-0 ml-6 hidden sm:block">
//                       <div className="w-[220px] sm:w-[240px] md:w-[300px] rounded-xl overflow-hidden shadow-2xl bg-white">
//                         <img
//                           src={b.image_url || PLACEHOLDER}
//                           alt={`${b.title || "Banner"} poster`}
//                           loading="eager"
//                           decoding="async"
//                           onError={(e) => {
//                             try { e.currentTarget.src = PLACEHOLDER; } catch (err) {}
//                           }}
//                           className="w-full h-auto object-contain block"
//                           style={{ display: "block" }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 );
//               })}
//             </div>

//             {/* Prev / Next controls */}
//             <button
//               aria-label="Previous"
//               onClick={prevBanner}
//               className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-md text-xl z-20"
//             >
//               ‹
//             </button>
//             <button
//               aria-label="Next"
//               onClick={nextBanner}
//               className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-md text-xl z-20"
//             >
//               ›
//             </button>

//             {/* Dots */}
//             <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
//               {banners.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentBanner(i)}
//                   className={`w-3 h-3 rounded-full transition-transform transform ${i === currentBanner ? "scale-125 bg-slate-900" : "bg-white/70"}`}
//                 />
//               ))}
//             </div>
//           </section>
//         )}
//       </div>

//       {/* Category Carousel */}
//       <div className="mt-6 w-full relative">
//         <CategoryCarousel categories={categories} loading={categoriesLoading} error={categoriesError} />
//       </div>
//     </div>
//   );
// }

// /* ---------- Category Carousel (small arrows + bullets below) ---------- */
// function CategoryCarousel({ categories = [], loading, error }) {
//   if (loading)
//     return (
//       <div className="w-full relative text-center py-10 text-gray-500">
//         Loading categories...
//       </div>
//     );
//   if (error)
//     return (
//       <div className="w-full relative text-center py-10 text-red-600">
//         Failed to load categories: {error}
//       </div>
//     );

//   if (!categories.length)
//     return (
//       <div className="w-full relative text-center py-10 text-gray-500">
//         No categories to display
//       </div>
//     );

//   const breakpoints = {
//     320: { slidesPerView: 1.2, spaceBetween: 12 },
//     640: { slidesPerView: 2.2, spaceBetween: 16 },
//     768: { slidesPerView: 3.2, spaceBetween: 20 },
//     1024: { slidesPerView: 4.2, spaceBetween: 24 },
//     1280: { slidesPerView: 5.2, spaceBetween: 26 },
//     1536: { slidesPerView: 6, spaceBetween: 28 },
//   };
//   return (
//     <div className="relative w-full">
//       <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-900">Shop by Categories</h2>
//         </div>
//         {/* Wrapper for Swiper and bullets */}
//         <div className="relative">
//           <Swiper
//             modules={[Autoplay, Pagination, Navigation]}
//             breakpoints={breakpoints}
//             navigation
//             loop={categories.length > 6}
//             autoplay={{ delay: 2800, disableOnInteraction: true }}
//             pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
//             className="category-swiper py-6"
//           >
//             {categories.map((category) => {
//               const src = category.image_url || category.image || PLACEHOLDER;
//               return (
//                 <SwiperSlide key={category.id}>
//                   <Link 
//   href={`/category/${category.id}`}
//   className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
// >
//   <div className="w-[130px] h-[130px] rounded-full overflow-hidden shadow-sm hover:shadow-md transition-shadow flex items-center justify-center bg-white ring-4 ring-white">
//     <img
//       src={src}
//       alt={category.name}
//       className="w-full h-full object-cover object-center block"
//     />
//   </div>
//   <div className="mt-4 text-center">
//     <span className="block text-sm md:text-base tracking-widest font-semibold text-emerald-800 uppercase">
//       {category.name}
//     </span>
//     <span className="block text-xs text-gray-500 mt-1">
//       {category.products_count ?? 0} Products
//     </span>
//   </div>
// </Link>

//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>

//           {/* Bullets moved BELOW carousel */}
//           <div className="custom-swiper-pagination mt-6 flex justify-center"></div>
//         </div>
//       </div>

//       {/* Styles: Small arrows + bullets below */}
//       <style jsx>{`
//         /* Bullets */
//         :global(.custom-swiper-pagination .swiper-pagination-bullet) {
//           width: 10px;
//           height: 6px;
//           border-radius: 999px;
//           background: rgba(0, 0, 0, 0.08);
//           opacity: 1;
//           margin: 0 6px !important;
//           transition: transform 0.25s ease, background 0.25s ease;
//         }
//         :global(.custom-swiper-pagination .swiper-pagination-bullet-active) {
//           background: #c75b3a;
//           width: 26px;
//           height: 8px;
//           border-radius: 999px;
//         }

//         /* Smaller, subtle navigation arrows */
//         :global(.category-swiper .swiper-button-next),
//         :global(.category-swiper .swiper-button-prev) {
//           width: 24px;
//           height: 24px;
//           background: rgba(255, 255, 255, 0.9);
//           border-radius: 999px;
//           box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
//           color: #374151;
//           opacity: 0.8;
//           transition: all 0.2s ease;
//         }

//         :global(.category-swiper .swiper-button-next:hover),
//         :global(.category-swiper .swiper-button-prev:hover) {
//           opacity: 1;
//           background: white;
//           transform: scale(1.05);
//         }

//         :global(.category-swiper .swiper-button-next::after),
//         :global(.category-swiper .swiper-button-prev::after) {
//           font-size: 12px;
//           font-weight: bold;
//         }

//         :global(.category-swiper .swiper-button-prev) {
//           left: 2px;
//         }
//         :global(.category-swiper .swiper-button-next) {
//           right: 2px;
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import apiAxios, { API_BASE } from "@/lib/api";
import { Login_API_BASE } from "@/lib/api";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Crect fill='%23f3f4f6' width='1200' height='800'/%3E%3Ctext fill='%239ca3af' font-family='Arial, Helvetica, sans-serif' font-size='28' x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'%3EImage not available%3C/text%3E%3C/svg%3E";

/** Helper: Convert backend image path to full URL */
function toFullImageUrl(img) {
  const val = img ?? "";
  if (!val) return "";
  if (val.startsWith("http://") || val.startsWith("https://") || val.startsWith("data:")) return val;
  const base = (API_BASE || process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/+$/, "");
  if (!base) return val;
  if (val.startsWith("/")) return `${base}${val}`;
  return `${base}/${val}`;
}

/** Public API call */
export async function getCategoriesPublicAPI() {
  try {
    const res = await axios.get(`${Login_API_BASE}/category/show`, {
      headers: { "Content-Type": "application/json" },
    });
    return Array.isArray(res.data?.data) ? res.data.data : [];
  } catch (err) {
    throw err;
  }
}

/** Main Hero Component */
export default function Hero() {
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const autoplayRef = useRef(null);
  const isHoveringRef = useRef(false);

  // Fetch banners
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${Login_API_BASE}/list-banners`, {
          headers: { "Content-Type": "application/json" },
        });
        if (cancelled) return;

        const payload = res?.data ?? null;
        const rows =
          Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.banners)
            ? payload.banners
            : Array.isArray(payload)
            ? payload
            : [];

        const active = rows.filter(
          (b) =>
            b && (b.is_active === 1 || b.is_active === true || b.is_active === "1")
        );
        const source = active.length ? active : rows;

        const mapped = (source || []).map((b) => {
          const redirect = b?.redirect_url ? String(b.redirect_url).trim() : "";
          const redirectIsAbsolute =
            redirect &&
            (redirect.startsWith("http://") ||
              redirect.startsWith("https://") ||
              redirect.startsWith("data:"));
          const imageSrc = redirectIsAbsolute
            ? redirect
            : toFullImageUrl(b?.image_url ?? b?.image ?? "");

          return {
            id:
              b?.id ??
              `${b?.title ?? "banner"}-${Math.random().toString(36).slice(2, 8)}`,
            title: b?.title ?? "",
            subtitle: b?.subtitle ?? "",
            discount: b?.discount ?? "",
            image_url: imageSrc || "",
            redirect_url: redirect || "",
            is_active: b?.is_active ?? 0,
            raw: b,
          };
        });

        setBanners(mapped);
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load banners.");
          setBanners([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchBanners();
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch categories
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const rows = await getCategoriesPublicAPI();
        if (cancelled) return;
        const norm = (rows || []).map((r) => ({
          id: r.id,
          name: r.name ?? r.title ?? "",
          image: r.image ?? "",
          image_url: r.image_url ?? toFullImageUrl(r.image ?? ""),
          products_count: r.products_count ?? 0,
        }));
        setCategories(norm);
      } catch (err) {
        setCategoriesError(
          String(err?.message ?? err) || "Failed to load categories"
        );
        setCategories([]);
      } finally {
        if (!cancelled) setCategoriesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto slide logic
  useEffect(() => {
    const start = () => {
      stop();
      autoplayRef.current = window.setInterval(() => {
        if (!isHoveringRef.current) {
          setCurrentBanner((p) => (banners.length ? (p + 1) % banners.length : 0));
        }
      }, 4500);
    };
    const stop = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
    start();
    return () => stop();
  }, [banners.length]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")
        setCurrentBanner((p) =>
          banners.length ? (p - 1 + banners.length) % banners.length : 0
        );
      if (e.key === "ArrowRight")
        setCurrentBanner((p) =>
          banners.length ? (p + 1) % banners.length : 0
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [banners.length]);

  const nextBanner = () =>
    setCurrentBanner((p) => (banners.length ? (p + 1) % banners.length : 0));
  const prevBanner = () =>
    setCurrentBanner((p) =>
      banners.length ? (p - 1 + banners.length) % banners.length : 0
    );

  return (
    <div className="mb-4">
      <div
        className="relative overflow-hidden w-full rounded-2xl shadow-lg bg-white"
        onMouseEnter={() => (isHoveringRef.current = true)}
        onMouseLeave={() => (isHoveringRef.current = false)}
      >
        {loading ? (
          <div className="w-full h-[56vh] flex items-center justify-center text-gray-500">
            Loading banners...
          </div>
        ) : error ? (
          <div className="w-full h-[56vh] flex items-center justify-center bg-red-50 text-red-600">
            {error}
          </div>
        ) : banners.length === 0 ? (
          <div className="w-full h-[56vh] flex items-center justify-center text-gray-500">
            No banners available
          </div>
        ) : (
          // Amazon-style hero
          <section className="relative w-full h-[56vh] min-h-[320px] overflow-hidden bg-gray-50">
            {banners.map((b, idx) => {
              const isActive = idx === currentBanner;
              return (
                <div
                  key={b.id}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={(b.image_url || PLACEHOLDER) + `?v=${Date.now()}`}
                    alt={b.title || "Banner"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                  <div className="relative z-20 h-full max-w-6xl mx-auto px-6 md:px-12 flex items-center">
                    <div className="w-full lg:w-2/3 xl:w-3/5 text-left text-white pr-8">
                      {/* {b.discount && (
                        <div className="inline-block bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full mb-4">
                          {b.discount} OFF
                        </div>
                      )} */}
                      {/* {b.title && (
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
                          {b.title}
                        </h2>
                      )}
                      {b.subtitle && (
                        <p className="mt-4 text-base md:text-lg max-w-2xl text-white/90">
                          {b.subtitle}
                        </p>
                      )} */}
                      {/* <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          href={
                            b.redirect_url &&
                            (b.redirect_url.startsWith("http://") ||
                              b.redirect_url.startsWith("https://"))
                              ? b.redirect_url
                              : "/products"
                          }
                          className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 px-6 rounded shadow-md transition-transform hover:-translate-y-0.5"
                          target={
                            b.redirect_url &&
                            (b.redirect_url.startsWith("http://") ||
                              b.redirect_url.startsWith("https://"))
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            b.redirect_url &&
                            (b.redirect_url.startsWith("http://") ||
                              b.redirect_url.startsWith("https://"))
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          Shop now
                        </Link>

                        <Link
                          href="/products"
                          className="inline-block bg-white/20 hover:bg-white/30 text-white py-3 px-5 rounded transition-opacity"
                        >
                          See deals
                        </Link>
                      </div> */}
                    </div>

                    {/* Poster on right */}
                    <div className="hidden md:block flex-shrink-0 ml-auto">
                      <div className="w-[260px] md:w-[300px] lg:w-[340px] rounded-xl overflow-hidden bg-white shadow-2xl">
                        <img
                          src={b.image_url || PLACEHOLDER}
                          alt={b.title || "Poster"}
                          className="w-full h-auto object-contain bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Controls */}
            <button
              aria-label="Previous"
              onClick={prevBanner}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-md z-30"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              aria-label="Next"
              onClick={nextBanner}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-md z-30"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-30">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBanner(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentBanner ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Category Carousel */}
      <div className="mt-6 w-full relative">
        <CategoryCarousel
          categories={categories}
          loading={categoriesLoading}
          error={categoriesError}
        />
      </div>
    </div>
  );
}

/* ---------- Category Carousel (unchanged) ---------- */
function CategoryCarousel({ categories = [], loading, error }) {
  if (loading)
    return (
      <div className="w-full relative text-center py-10 text-gray-500">
        Loading categories...
      </div>
    );
  if (error)
    return (
      <div className="w-full relative text-center py-10 text-red-600">
        Failed to load categories: {error}
      </div>
    );

  if (!categories.length)
    return (
      <div className="w-full relative text-center py-10 text-gray-500">
        No categories to display
      </div>
    );

  const breakpoints = {
    320: { slidesPerView: 1.2, spaceBetween: 12 },
    640: { slidesPerView: 2.2, spaceBetween: 16 },
    768: { slidesPerView: 3.2, spaceBetween: 20 },
    1024: { slidesPerView: 4.2, spaceBetween: 24 },
    1280: { slidesPerView: 5.2, spaceBetween: 26 },
    1536: { slidesPerView: 6, spaceBetween: 28 },
  };

  return (
    <div className="relative w-full">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Categories</h2>
        </div>
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={breakpoints}
            navigation
            loop={categories.length > 6}
            autoplay={{ delay: 2800, disableOnInteraction: true }}
            pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
            className="category-swiper py-6"
          >
            {categories.map((category) => {
              const src = category.image_url || category.image || PLACEHOLDER;
              return (
                <SwiperSlide key={category.id}>
                  <Link
                    href={`/category/${category.id}`}
                    className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                  >
                    <div className="w-[130px] h-[130px] rounded-full overflow-hidden shadow-sm hover:shadow-md flex items-center justify-center bg-white ring-4 ring-white">
                      <img
                        src={src}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <span className="block text-sm md:text-base tracking-widest font-semibold text-emerald-800 uppercase">
                        {category.name}
                      </span>
                      <span className="block text-xs text-gray-500 mt-1">
                        {category.products_count ?? 0} Products
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="custom-swiper-pagination mt-6 flex justify-center"></div>
        </div>
      </div>
    </div>
  );
}


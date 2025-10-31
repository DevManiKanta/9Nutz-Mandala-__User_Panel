(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[188],{5531:function(e,t,r){"use strict";r.d(t,{Z:function(){return l}});var a=r(2265);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),n=(...e)=>e.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ");/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:i,className:s="",children:l,iconNode:c,...u},d)=>(0,a.createElement)("svg",{ref:d,...o,width:t,height:t,stroke:e,strokeWidth:i?24*Number(r)/Number(t):r,className:n("lucide",s),...u},[...c.map(([e,t])=>(0,a.createElement)(e,t)),...Array.isArray(l)?l:[l]])),l=(e,t)=>{let r=(0,a.forwardRef)(({className:r,...o},l)=>(0,a.createElement)(s,{ref:l,iconNode:t,className:n(`lucide-${i(e)}`,r),...o}));return r.displayName=`${e}`,r}},3067:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var a=r(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a.Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},3505:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var a=r(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a.Z)("ShoppingCart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]])},5340:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var a=r(5531);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,a.Z)("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]])},7788:function(e,t,r){Promise.resolve().then(r.bind(r,4702))},4702:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return p}});var a=r(7437),i=r(2265),n=r(8822),o=r(4232),s=r(8207),l=r(3067),c=r(5340),u=r(3505),d=r(4033);function m(e){var t,r,s,m,p;let{product:f}=e,{addItem:g,openCart:h}=(0,n.useCart)()||{},[y,v]=(0,i.useState)(!1),x=(0,d.useRouter)(),{products:b}=(0,o.useProducts)()||{products:[]};if(!f)return null;let w=(0,i.useMemo)(()=>{let e=[];if(f.imageUrl&&e.push(String(f.imageUrl)),Array.isArray(f.images)&&f.images.length>0&&f.images.forEach(t=>{if(t){if("string"==typeof t)e.includes(t)||e.push(t);else if("object"==typeof t){var r,a,i;let n=null!==(i=null!==(a=null!==(r=t.image_url)&&void 0!==r?r:t.url)&&void 0!==a?a:t.image)&&void 0!==i?i:null;n&&!e.includes(n)&&e.push(String(n))}}}),0===e.length){var t,r;let a=null!==(r=null!==(t=f.image_url)&&void 0!==t?t:f.image)&&void 0!==r?r:null;a&&e.push(String(a))}return e},[f]),N=(0,i.useMemo)(()=>{var e,t;let r=null!==(t=null!==(e=f.video_url)&&void 0!==e?e:f.video)&&void 0!==t?t:Array.isArray(f.videos)&&f.videos.length?f.videos[0]:null,a=function(e){if(!e||"string"!=typeof e)return null;try{let t=e.trim();for(let e of[/(?:youtube\.com\/shorts\/)([A-Za-z0-9_-]{4,})/,/(?:youtube\.com\/watch\?v=)([A-Za-z0-9_-]{4,})/,/(?:youtu\.be\/)([A-Za-z0-9_-]{4,})/,/(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{4,})/,/v=([A-Za-z0-9_-]{4,})/]){let r=t.match(e);if(r&&r[1])return r[1]}let r=new URL(t.startsWith("http")?t:"https://".concat(t)),a=(r.pathname||"").split("/").filter(Boolean).pop();if(a&&/^[A-Za-z0-9_-]{4,}$/.test(a))return a}catch(e){}return null}(r);return a?"https://www.youtube.com/embed/".concat(a,"?rel=0&modestbranding=1"):"https://www.youtube.com/embed/".concat("G--NLgSNCmE","?rel=0&modestbranding=1")},[f]),[j,k]=(0,i.useState)(0);i.useEffect(()=>{if(!w||0===w.length){k(0);return}j>=w.length&&k(0)},[w,j]);let S=w&&w.length?w[j]:f.image_url||"/placeholder.png",C=f.discountPrice&&f.price?Math.round((f.price-f.discountPrice)/f.price*100):null!==(t=f.discount_percent)&&void 0!==t?t:0,A=(0,i.useCallback)(e=>{var t;if(!e)return;let r=Number(null!==(t=null==e?void 0:e.stock)&&void 0!==t?t:1/0);if(Number.isNaN(r)||!(r<=0)){v(!0);try{"function"==typeof g?g({...e,quantity:1}):window.dispatchEvent(new CustomEvent("productAddToCart",{detail:{product:e,quantity:1}})),"function"==typeof h?h():window.dispatchEvent(new CustomEvent("openCart"))}catch(e){}finally{setTimeout(()=>v(!1),600)}}},[g,h]),E=(e,t)=>{"Enter"===e.key||" "===e.key?(e.preventDefault(),k(t)):"ArrowLeft"===e.key?(e.preventDefault(),k(e=>Math.max(0,e-1))):"ArrowRight"===e.key&&(e.preventDefault(),k(e=>Math.min(w.length-1,e+1)))};return(0,a.jsxs)("section",{className:"relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-1 mt-5",children:[(0,a.jsxs)("button",{onClick:()=>x.push("/"),className:"absolute -top-2 left-4 flex items-center gap-2 text-gray-600 hover:text-[#C75B3A] transition-colors duration-200",children:[(0,a.jsx)(l.Z,{className:"w-5 h-5"}),(0,a.jsx)("span",{className:"hidden sm:inline font-medium",children:"Back to Menu"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-6",children:[(0,a.jsxs)("div",{className:"w-full flex flex-col items-center",children:[(0,a.jsxs)("div",{className:"relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-lg bg-gray-50",children:[(0,a.jsx)("img",{src:S,alt:f.name,className:"w-full h-full object-cover hover:scale-105 transition-transform duration-500"}),C>0&&(0,a.jsxs)("span",{className:"absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow",children:[C,"% OFF"]})]}),(w&&w.length>0||N)&&(0,a.jsx)("div",{className:"mt-4 w-full max-w-md",children:(0,a.jsxs)("div",{className:"flex items-start gap-3 py-2 px-1",children:[(0,a.jsx)("div",{className:"flex items-center gap-3 overflow-x-auto py-1 px-1",style:{flex:1},children:w.map((e,t)=>(0,a.jsx)("button",{onClick:()=>k(t),onKeyDown:e=>E(e,t),"aria-label":"View image ".concat(t+1),className:"flex-shrink-0 rounded-lg overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ".concat(t===j?"ring-2 ring-emerald-600 border-white-600":"border-gray-200"),style:{width:84,height:84,borderRadius:10},title:"Image ".concat(t+1),children:(0,a.jsx)("img",{src:e,alt:"".concat(f.name," ").concat(t+1),className:"w-full h-full object-cover",loading:0===t?"eager":"lazy"})},t))}),N&&(0,a.jsx)("div",{className:"ml-2 rounded-md overflow-hidden border bg-black/5 flex-shrink-0",style:{width:160,height:90},children:(0,a.jsx)("iframe",{src:N,title:"".concat(f.name," video"),className:"w-full h-full",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})})]})})]}),(0,a.jsxs)("div",{className:"flex flex-col gap-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{className:"text-3xl sm:text-4xl font-bold text-gray-900 mb-2",children:f.name}),(0,a.jsxs)("div",{className:"flex items-center gap-1",children:[Array.from({length:5}).map((e,t)=>(0,a.jsx)(c.Z,{className:"w-4 h-4 text-yellow-400",fill:"currentColor"},t)),(0,a.jsx)("span",{className:"text-sm text-gray-500 ml-1",children:"(4.9 / 120 reviews)"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsxs)("span",{className:"text-3xl font-bold text-[#C75B3A]",children:["Rs.",f.discountPrice||f.price]}),C>0&&(0,a.jsxs)("span",{className:"text-lg text-gray-400 line-through",children:["Rs.",f.price]})]}),(0,a.jsx)("p",{className:"mt-2 text-gray-500 text-sm",children:"Inclusive of all taxes. Free delivery on orders above ₹499."})]}),Number(null!==(r=f.stock)&&void 0!==r?r:0)>0?(0,a.jsx)("p",{className:"text-green-600 font-semibold",children:"In Stock"}):(0,a.jsx)("p",{className:"text-red-500 font-semibold",children:"Out of Stock"}),(0,a.jsx)("div",{className:"text-gray-700 text-base leading-relaxed",children:f.description||"No description available."}),(0,a.jsx)("div",{className:"flex flex-col sm:flex-row gap-4 mt-4",children:(0,a.jsxs)("button",{onClick:()=>A(f),disabled:0>=Number(null!==(s=f.stock)&&void 0!==s?s:0)||y,className:"flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-colors duration-200 ".concat(Number(null!==(m=f.stock)&&void 0!==m?m:0)>0?"bg-[#C75B3A] text-white hover:bg-[#b14e33]":"bg-gray-300 text-gray-600 cursor-not-allowed"),children:[(0,a.jsx)(u.Z,{className:"w-5 h-5"}),y?"Adding...":Number(null!==(p=f.stock)&&void 0!==p?p:0)>0?"Add to Cart":"Out of Stock"]})}),(0,a.jsxs)("div",{className:"mt-12 border-t pt-8",children:[(0,a.jsx)("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Product Details"}),(0,a.jsxs)("ul",{className:"list-disc list-inside text-gray-700 space-y-2 text-base leading-relaxed",children:[(0,a.jsx)("li",{children:"Made from premium-quality ingredients for authentic taste and freshness."}),(0,a.jsx)("li",{children:"Prepared under hygienic conditions following strict food safety standards."}),(0,a.jsx)("li",{children:"Free from harmful preservatives, artificial colors, or flavors."}),(0,a.jsx)("li",{children:"Perfect for everyday meals, festive occasions, and quick snack cravings."})]})]})]})]})]})}function p(e){let{id:t}=e,{}=(0,n.useCart)(),{products:r}=(0,o.useProducts)()||{products:[]},[l,c]=(0,i.useState)(null),[u,d]=(0,i.useState)(!0),[p,f]=(0,i.useState)(null),g=(s.kE||"https://9nutsapi.nearbydoctors.in/public").replace(/\/+$/,""),h=(0,i.useCallback)(e=>r&&0!==r.length&&r.find(t=>String(t.id)===String(e))||null,[r]),y=(0,i.useCallback)(e=>{if(!e)return null;if("string"==typeof e){let t=e.trim();return t?/^https?:\/\//i.test(t)?t:"".concat(g,"/storage/").concat(t.replace(/^\/+/,"")):null}if("object"==typeof e){var t,r,a,i,n;let o=null!==(n=null!==(i=null!==(a=null!==(r=null!==(t=e.image_url)&&void 0!==t?t:e.url)&&void 0!==r?r:e.imageUrl)&&void 0!==a?a:e.image)&&void 0!==i?i:e.path)&&void 0!==n?n:null;return o?"string"==typeof o&&/^https?:\/\//i.test(o)?o:"".concat(g,"/storage/").concat(String(o).replace(/^\/+/,"")):null}return null},[g]),v=(0,i.useCallback)(async e=>{var t,r,a,i,n,o,l,u,m,p,g,v,x,b,w,N,j,k,S,C,A,E,_,P,I,O,T,$,L,z;d(!0),f(null),c(null);let B=!!s.kE;if(!B){let s=h(e);if(s){let e=Array.isArray(s.images)?s.images.map(e=>"string"==typeof e?e:null!==(t=e.image_url)&&void 0!==t?t:e.image).filter(Boolean):s.image?[s.image]:[];c({...s,id:s.id,name:s.name,price:Number(s.price||0),discountPrice:null!==(a=null!==(r=s.discount_price)&&void 0!==r?r:s.discountPrice)&&void 0!==a?a:null,imageUrl:null!==(o=null!==(n=null!==(i=s.image_url)&&void 0!==i?i:s.image)&&void 0!==n?n:e[0])&&void 0!==o?o:null,images:e,stock:Number(null!==(l=s.stock)&&void 0!==l?l:0),description:null!==(u=s.description)&&void 0!==u?u:"",_raw:s}),d(!1);return}f("Product not found (no API base configured)."),d(!1);return}let D=localStorage.getItem("token");try{D=localStorage.getItem("token")||null}catch(e){D=null}let Z="/admin/products/show/".concat(encodeURIComponent(String(e)));try{let t={"Content-Type":"application/json"};D&&(t.Authorization="Bearer ".concat(D));let r=await s.ZP.get(Z,{headers:t}),a=null!==(m=null==r?void 0:r.data)&&void 0!==m?m:r,i=null;if(a&&"object"==typeof a){if(Array.isArray(a.data)&&1===a.data.length&&(a.data[0].id||a.data[0].product_id))i=a.data[0];else if(a.data&&"object"==typeof a.data&&(a.data.id||a.data.product_id))i=a.data;else if(Array.isArray(a.data)&&a.data.length>0){let t=a.data.find(t=>String(t.id)===String(e)||String(t.product_id)===String(e));i=t||null}else(a.id||a.product_id)&&(i=a)}if(!i){let t=h(e);if(t){c(t),d(!1);return}throw Error("Product data missing in API response")}let n=Array.isArray(i.images)?i.images:[],o=n.map(e=>y(null!==(g=null!==(p=null==e?void 0:e.image_url)&&void 0!==p?p:e)&&void 0!==g?g:e)).filter(Boolean),l=[i.image_url,i.imageUrl,i.image,i.url].map(e=>e?y(e):null).filter(Boolean),u=o.length?o:[...new Set(l)],f=(i.image_url?y(i.image_url):null)||u[0]||(i.image?y(i.image):null)||null,L={id:null!==(x=null!==(v=i.id)&&void 0!==v?v:i.product_id)&&void 0!==x?x:null,name:null!==(w=null!==(b=i.name)&&void 0!==b?b:i.title)&&void 0!==w?w:"",price:Number(null!==(j=null!==(N=i.price)&&void 0!==N?N:i.price_inr)&&void 0!==j?j:0),discountPrice:null!==(S=null!==(k=i.discount_price)&&void 0!==k?k:i.discountPrice)&&void 0!==S?S:null,discountAmount:null!==(A=null!==(C=i.discount_amount)&&void 0!==C?C:i.discountAmount)&&void 0!==A?A:null,discountPercent:null!==(_=null!==(E=i.discount_percent)&&void 0!==E?E:i.discountPercent)&&void 0!==_?_:null,imageUrl:f,images:u,stock:Number(null!==(I=null!==(P=i.stock)&&void 0!==P?P:i.qty)&&void 0!==I?I:0),description:null!==(O=i.description)&&void 0!==O?O:"",grams:null!==(T=i.grams)&&void 0!==T?T:null,category:null!==($=i.category)&&void 0!==$?$:null,_raw:i,...i};c(L),d(!1)}catch(a){let t=h(e);if(t){c(t),d(!1);return}let r=(null==a?void 0:null===(z=a.response)||void 0===z?void 0:null===(L=z.data)||void 0===L?void 0:L.message)||a.message||String(a);f(r),d(!1)}},[h,y]);(0,i.useEffect)(()=>{if(!t){f("No product id provided"),d(!1);return}v(t)},[t,v]);let x=(0,i.useCallback)(()=>{t&&(f(null),v(t))},[t,v]);return(0,a.jsx)("div",{className:"min-h-screen flex flex-col",children:(0,a.jsx)("main",{className:"flex-1 w-full bg-white",children:(0,a.jsx)("section",{className:"w-full bg-gray-50",children:(0,a.jsx)("div",{className:"max-w-6xl mx-auto px-4 py-1",children:u?(0,a.jsx)("div",{className:"flex justify-center items-center py-24",children:(0,a.jsx)("div",{className:"w-12 h-12 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"})}):p?(0,a.jsxs)("div",{className:"text-center py-12",children:[(0,a.jsxs)("p",{className:"text-red-600 mb-4",children:["Error: ",p]}),(0,a.jsx)("div",{className:"flex justify-center gap-3",children:(0,a.jsx)("button",{onClick:x,className:"px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition",children:"Retry"})})]}):l?(0,a.jsx)(m,{product:l}):(0,a.jsx)("p",{className:"text-center text-gray-500",children:"Product not found"})})})})})}},2502:function(e,t,r){"use strict";r.r(t),r.d(t,{AuthProvider:function(){return g},useAuth:function(){return p}});var a=r(7437),i=r(2265),n=r(5925),o=r(8207),s=r(4033),l=r(4829),c=r(2601);let u=(c.env.NEXT_PUBLIC_API_BASE_URL||c.env.PROD_API_URL||"https://9nutsapi.nearbydoctors.in/public/api/").replace(/\/+$/,""),d=l.Z.create({baseURL:u,headers:{"Content-Type":"application/json"}});d.interceptors.request.use(e=>{{let t=window.localStorage.getItem("token");t&&(e.headers.Authorization="Bearer ".concat(t))}return e},e=>Promise.reject(e)),d.interceptors.response.use(e=>e,e=>Promise.reject(e));let m=(0,i.createContext)(void 0),p=()=>{let e=(0,i.useContext)(m);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e},f=o.I,g=e=>{let{children:t}=e,[r,o]=(0,i.useState)(null),[l,c]=(0,i.useState)(!0),[u,d]=(0,i.useState)(null),p=(0,s.useRouter)();function g(e,t){e?localStorage.setItem("token",e):localStorage.removeItem("token"),t?localStorage.setItem("user",JSON.stringify(t)):localStorage.removeItem("user"),d(e),o(t)}(0,i.useEffect)(()=>{(async()=>{try{let e=localStorage.getItem("token");if(e){let t=localStorage.getItem("user");t&&o(JSON.parse(t)),d(e)}}catch(e){}finally{c(!1)}})()},[]);let h=async(e,t)=>{c(!0);try{let r=await fetch("".concat(f,"/user-login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:t})}),a=await r.json();if(!r.ok||!a)return n.default.error(String((null==a?void 0:a.message)||"Login failed")),!1;let i=(null==a?void 0:a.token)||(null==a?void 0:a.access)||(null==a?void 0:a.access_token)||null,o=(null==a?void 0:a.user)||(null==a?void 0:a.data)||{id:a.id||"1",email:e,name:a.name||"User",role:"user"};if(!i)return!1;return g(i,o),n.default.success("Logged in successfully"),!0}catch(e){return n.default.error("Login error"),!1}finally{c(!1)}},y=async(e,t,r,a)=>{c(!0);try{let i=await fetch("".concat(f,"/register"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,email:t,password:r,...a?{contact:a}:{}})}),o=await i.json();if(!i.ok||void 0!==o.status&&!o.status)return n.default.error(String((null==o?void 0:o.message)||"Signup failed")),!1;let s=await h(t,r);return s&&n.default.success("Account created & logged in"),s}catch(e){return n.default.error("Signup error"),!1}finally{c(!1)}},v=async e=>{try{return await new Promise(e=>setTimeout(e,800)),!0}catch(e){return!1}},x=async()=>{if(u)try{let e=await fetch("".concat(f,"/api/user-profile"),{headers:{Authorization:"Bearer ".concat(u)}}),t=await e.json(),r={id:String(t.id),email:t.email,name:t.name,role:String(t.role||"user").toLowerCase()};o(r)}catch(e){}};return(0,a.jsx)(m.Provider,{value:{user:r,isLoading:l,login:h,logout:()=>{g(null,null),n.default.success("Logged out"),p.push("/")},signup:y,resetPassword:v,token:u,refreshMe:x},children:t})}},8822:function(e,t,r){"use strict";r.r(t),r.d(t,{CartProvider:function(){return o},useCart:function(){return s}});var a=r(7437),i=r(2265);let n=(0,i.createContext)(null);function o(e){let{children:t}=e,[r,o]=(0,i.useState)(()=>{try{let e=localStorage.getItem("cart_v1");return e?JSON.parse(e):[]}catch(e){return[]}});(0,i.useEffect)(()=>{try{localStorage.setItem("cart_v1",JSON.stringify(r))}catch(e){}},[r]);let s=(0,i.useCallback)(e=>{var t;if(!e||!e.id)return;let r=Math.max(1,Number(null!==(t=e.quantity)&&void 0!==t?t:1));o(t=>{let a=t.findIndex(t=>t.id===e.id);if(a>=0){let e=[...t];return e[a]={...e[a],quantity:(Number(e[a].quantity)||0)+r},e}return[...t,{...e,quantity:r}]})},[]),l=(0,i.useCallback)(e=>{o(t=>t.filter(t=>t.id!==e))},[]),c=(0,i.useCallback)((e,t)=>{let r=Math.trunc(Number(t)||0);o(t=>r<=0?t.filter(t=>t.id!==e):t.map(t=>t.id===e?{...t,quantity:r}:t))},[]),u=(0,i.useCallback)(()=>o([]),[]),d=r.reduce((e,t)=>e+(Number(t.quantity)||0),0),m=r.reduce((e,t)=>e+(Number(t.price)||0)*(Number(t.quantity)||0),0);return(0,a.jsx)(n.Provider,{value:{items:r,addItem:s,removeItem:l,updateQuantity:c,clearCart:u,cartCount:d,cartTotal:m},children:t})}function s(){let e=(0,i.useContext)(n);if(!e)throw Error("useCart must be used within CartProvider");return e}},8207:function(e,t,r){"use strict";r.d(t,{DI:function(){return u},I:function(){return s},Sg:function(){return n},_g:function(){return l},bA:function(){return d},kE:function(){return o},nm:function(){return m}});var a=r(4829),i=r(2601);let n=(i.env.NEXT_PUBLIC_API_BASE||"https://ecom.nearbydoctors.in").replace(/\/+$/,""),o=(i.env.NEXT_PUBLIC_API_BASE_URL||"https://api.9nutz.com/api").replace(/\/+$/,""),s="https://9nutsapi.nearbydoctors.in/public/api".replace(/\/+$/,""),l="https://checkout.razorpay.com/v1/checkout.js";async function c(e){var t;let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=function(e){if(!e)return n;if(/^https?:\/\//i.test(e))return e;let t=String(e).replace(/^\/+/,"");return"".concat(n,"/").concat(t)}(e),i={method:r.method||"GET",headers:{...r.headers||{}},credentials:null!==(t=r.credentials)&&void 0!==t?t:"same-origin"};void 0!==r.body&&(i.headers={...i.headers||{},"Content-Type":"application/json"},i.body=JSON.stringify(r.body)),r.token&&(i.headers={...i.headers||{},Authorization:"Bearer ".concat(r.token)});let o=await fetch(a,i),s=await o.text(),l=null;try{l=s?JSON.parse(s):null}catch(e){l=s}if(!o.ok){let e=(null==l?void 0:l.message)||l||o.statusText,t=Error(String(e));throw t.status=o.status,t.body=l,t}return l}let u=(e,t)=>c("/api/admin/categories",{method:"POST",body:e,token:t}),d=(e,t,r)=>c("/api/admin/categories/".concat(e),{method:"PUT",body:t,token:r}),m=(e,t)=>c("/api/admin/categories/".concat(e),{method:"DELETE",token:t}),p=a.Z.create({baseURL:o,headers:{"Content-Type":"application/json"}});p.interceptors.request.use(e=>{{let t=window.localStorage.getItem("token");t&&(e.headers.Authorization="Bearer ".concat(t))}return e},e=>Promise.reject(e)),p.interceptors.response.use(e=>e,e=>Promise.reject(e)),t.ZP=p},4033:function(e,t,r){e.exports=r(290)},5925:function(e,t,r){"use strict";let a,i;r.r(t),r.d(t,{CheckmarkIcon:function(){return J},ErrorIcon:function(){return q},LoaderIcon:function(){return F},ToastBar:function(){return et},ToastIcon:function(){return G},Toaster:function(){return en},default:function(){return eo},resolveValue:function(){return k},toast:function(){return R},useToaster:function(){return M},useToasterStore:function(){return B}});var n,o=r(2265);let s={data:""},l=e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||s},c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,u=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,m=(e,t)=>{let r="",a="",i="";for(let n in e){let o=e[n];"@"==n[0]?"i"==n[1]?r=n+" "+o+";":a+="f"==n[1]?m(o,n):n+"{"+m(o,"k"==n[1]?"":t)+"}":"object"==typeof o?a+=m(o,t?t.replace(/([^,])+/g,e=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):n):null!=o&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=m.p?m.p(n,o):n+":"+o+";")}return r+(t&&i?t+"{"+i+"}":i)+a},p={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},g=(e,t,r,a,i)=>{var n;let o=f(e),s=p[o]||(p[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!p[s]){let t=o!==e?e:(e=>{let t,r,a=[{}];for(;t=c.exec(e.replace(u,""));)t[4]?a.shift():t[3]?(r=t[3].replace(d," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(d," ").trim();return a[0]})(e);p[s]=m(i?{["@keyframes "+s]:t}:t,r?"":"."+s)}let l=r&&p.g?p.g:null;return r&&(p.g=p[s]),n=p[s],l?t.data=t.data.replace(l,n):-1===t.data.indexOf(n)&&(t.data=a?n+t.data:t.data+n),s},h=(e,t,r)=>e.reduce((e,a,i)=>{let n=t[i];if(n&&n.call){let e=n(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;n=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==n?"":n)},"");function y(e){let t=this||{},r=e.call?e(t.p):e;return g(r.unshift?r.raw?h(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}y.bind({g:1});let v,x,b,w=y.bind({k:1});function N(e,t){let r=this||{};return function(){let a=arguments;function i(n,o){let s=Object.assign({},n),l=s.className||i.className;r.p=Object.assign({theme:x&&x()},s),r.o=/ *go\d+/.test(l),s.className=y.apply(r,a)+(l?" "+l:""),t&&(s.ref=o);let c=e;return e[0]&&(c=s.as||e,delete s.as),b&&c[0]&&b(s),v(c,s)}return t?t(i):i}}var j=e=>"function"==typeof e,k=(e,t)=>j(e)?e(t):e,S=(a=0,()=>(++a).toString()),C=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},A="default",E=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return E(e,{type:e.toasts.find(e=>e.id===a.id)?1:0,toast:a});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+n}))}}},_=[],P={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},I={},O=(e,t=A)=>{I[t]=E(I[t]||P,e),_.forEach(([e,r])=>{e===t&&r(I[t])})},T=e=>Object.keys(I).forEach(t=>O(e,t)),$=e=>Object.keys(I).find(t=>I[t].toasts.some(t=>t.id===e)),L=(e=A)=>t=>{O(t,e)},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},B=(e={},t=A)=>{let[r,a]=(0,o.useState)(I[t]||P),i=(0,o.useRef)(I[t]);(0,o.useEffect)(()=>(i.current!==I[t]&&a(I[t]),_.push([t,a]),()=>{let e=_.findIndex(([e])=>e===t);e>-1&&_.splice(e,1)}),[t]);let n=r.toasts.map(t=>{var r,a,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...r,toasts:n}},D=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||S()}),Z=e=>(t,r)=>{let a=D(t,e,r);return L(a.toasterId||$(a.id))({type:2,toast:a}),a.id},R=(e,t)=>Z("blank")(e,t);R.error=Z("error"),R.success=Z("success"),R.loading=Z("loading"),R.custom=Z("custom"),R.dismiss=(e,t)=>{let r={type:3,toastId:e};t?L(t)(r):T(r)},R.dismissAll=e=>R.dismiss(void 0,e),R.remove=(e,t)=>{let r={type:4,toastId:e};t?L(t)(r):T(r)},R.removeAll=e=>R.remove(void 0,e),R.promise=(e,t,r)=>{let a=R.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?k(t.success,e):void 0;return i?R.success(i,{id:a,...r,...null==r?void 0:r.success}):R.dismiss(a),e}).catch(e=>{let i=t.error?k(t.error,e):void 0;i?R.error(i,{id:a,...r,...null==r?void 0:r.error}):R.dismiss(a)}),e};var U=1e3,M=(e,t="default")=>{let{toasts:r,pausedAt:a}=B(e,t),i=(0,o.useRef)(new Map).current,n=(0,o.useCallback)((e,t=U)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),s({type:4,toastId:e})},t);i.set(e,r)},[]);(0,o.useEffect)(()=>{if(a)return;let e=Date.now(),i=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&R.dismiss(r.id);return}return setTimeout(()=>R.dismiss(r.id,t),a)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let s=(0,o.useCallback)(L(t),[t]),l=(0,o.useCallback)(()=>{s({type:5,time:Date.now()})},[s]),c=(0,o.useCallback)((e,t)=>{s({type:1,toast:{id:e,height:t}})},[s]),u=(0,o.useCallback)(()=>{a&&s({type:6,time:Date.now()})},[a,s]),d=(0,o.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:i=8,defaultPosition:n}=t||{},o=r.filter(t=>(t.position||n)===(e.position||n)&&t.height),s=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<s&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[r]);return(0,o.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)n(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,n]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:u,calculateOffset:d}}},q=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,F=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`} 1s linear infinite;
`,J=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,H=N("div")`
  position: absolute;
`,W=N("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,X=N("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,G=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?o.createElement(X,null,t):t:"blank"===r?null:o.createElement(W,null,o.createElement(F,{...a}),"loading"!==r&&o.createElement(H,null,"error"===r?o.createElement(q,{...a}):o.createElement(J,{...a})))},V=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,K=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,Y=N("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Q=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ee=(e,t)=>{let r=e.includes("top")?1:-1,[a,i]=C()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[V(r),K(r)];return{animation:t?`${w(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},et=o.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?ee(e.position||t||"top-center",e.visible):{opacity:0},n=o.createElement(G,{toast:e}),s=o.createElement(Q,{...e.ariaProps},k(e.message,e));return o.createElement(Y,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:n,message:s}):o.createElement(o.Fragment,null,n,s))});n=o.createElement,m.p=void 0,v=n,x=void 0,b=void 0;var er=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let n=o.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return o.createElement("div",{ref:n,className:t,style:r},i)},ea=(e,t)=>{let r=e.includes("top"),a=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:C()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...a}},ei=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,en=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:n,containerStyle:s,containerClassName:l})=>{let{toasts:c,handlers:u}=M(r,n);return o.createElement("div",{"data-rht-toaster":n||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:l,onMouseEnter:u.startPause,onMouseLeave:u.endPause},c.map(r=>{let n=r.position||t,s=ea(n,u.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}));return o.createElement(er,{id:r.id,key:r.id,onHeightUpdate:u.updateHeight,className:r.visible?ei:"",style:s},"custom"===r.type?k(r.message,r):i?i(r):o.createElement(et,{toast:r,position:n}))}))},eo=R}},function(e){e.O(0,[4737,4232,2971,7864,1744],function(){return e(e.s=7788)}),_N_E=e.O()}]);
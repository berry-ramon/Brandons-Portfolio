if(!self.define){let e,i={};const a=(a,s)=>(a=new URL(a+".js",s).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(s,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let n={};const o=e=>a(e,r),d={module:{uri:r},exports:n,require:o};i[r]=Promise.all(s.map((e=>d[e]||o(e)))).then((e=>(c(...e),n)))}}define(["./workbox-6c8fa345"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"components/footer.html",revision:"2556a7a8bdbe118693426d6957dec8f9"},{url:"generate-sw.js",revision:"6992c9a607a51a5bb9c1e4aaf7612a05"},{url:"images/android-chrome-192x192.png",revision:"1af1d0eadfd63a6b8655ccd4f10e9e8c"},{url:"images/android-chrome-512x512.png",revision:"a6cf53446374bc9e7dc1ecc313b5c2b2"},{url:"images/apple-touch-icon.png",revision:"7767ec9d56fb6da226d318631151fb9a"},{url:"images/Author.jpg",revision:"1a16df990ab86e66fd7b758a7239d71e"},{url:"images/contactme.png",revision:"2a23cae8b5c1292e24f93bbb4070ea29"},{url:"images/favicon-16x16.png",revision:"9278d10208ded27979b7abf9749ecc7c"},{url:"images/favicon-32x32.png",revision:"e4cab9c6858bd4463b5a7fa644f39438"},{url:"images/lipstickecommerce.png",revision:"c96133618c1ac0eb967f9c4369a68f6e"},{url:"images/phonesmanagement.png",revision:"ea79340c5e4a26c874fdadeb2ec3a16b"},{url:"images/profilefour.jpg",revision:"9ce4c7e0b96b638814022d02ea8d1f22"},{url:"images/profileone.jpg",revision:"742736ad4b86c5b51fbaa1ca1ce63504"},{url:"images/resumeimage.png",revision:"6c21cd9b8186d8644b0893df10c3aecd"},{url:"images/sharing.png",revision:"7b1fcd99581574970dba66358b446c63"},{url:"images/sharingDisp.png",revision:"d4d2a36fee12199a1e60dca7ed93b5f7"},{url:"images/shoeswebsite.png",revision:"4a8fbbe495ef7e31769965c913bf0760"},{url:"index.html",revision:"91c540b4b17124325fa77b01f973d03f"},{url:"offline.html",revision:"d244a94c1d29d7afbb60e14f8e5dea61"},{url:"script.js",revision:"21dcd014b04a956a3f5e70d0dff276a3"},{url:"styles.css",revision:"d6867245699eaf3177baa1de7f977e3b"}],{}),e.registerRoute(/\.(?:png|jpg|jpeg|svg|mp4)$/,new e.CacheFirst({cacheName:"media-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\.(?:html|js|css)$/,new e.StaleWhileRevalidate({cacheName:"static-resources",plugins:[new e.ExpirationPlugin({maxEntries:30})]}),"GET")}));
//# sourceMappingURL=sw.js.map

if(!self.define){let e,i={};const s=(s,a)=>(s=new URL(s+".js",a).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(a,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let n={};const o=e=>s(e,r),d={module:{uri:r},exports:n,require:o};i[r]=Promise.all(a.map((e=>d[e]||o(e)))).then((e=>(c(...e),n)))}}define(["./workbox-92ad22f6"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"components/footer.html",revision:"2556a7a8bdbe118693426d6957dec8f9"},{url:"generate-sw.js",revision:"01f909755cc1548d0d823d6914b6feaa"},{url:"images/android-chrome-192x192.png",revision:"1af1d0eadfd63a6b8655ccd4f10e9e8c"},{url:"images/android-chrome-512x512.png",revision:"a6cf53446374bc9e7dc1ecc313b5c2b2"},{url:"images/apple-touch-icon.png",revision:"7767ec9d56fb6da226d318631151fb9a"},{url:"images/Author.jpg",revision:"1a16df990ab86e66fd7b758a7239d71e"},{url:"images/contactme.png",revision:"2a23cae8b5c1292e24f93bbb4070ea29"},{url:"images/favicon-16x16.png",revision:"9278d10208ded27979b7abf9749ecc7c"},{url:"images/favicon-32x32.png",revision:"e4cab9c6858bd4463b5a7fa644f39438"},{url:"images/lipstickecommerce.png",revision:"c96133618c1ac0eb967f9c4369a68f6e"},{url:"images/phonesmanagement.png",revision:"ea79340c5e4a26c874fdadeb2ec3a16b"},{url:"images/profilefour.jpg",revision:"9ce4c7e0b96b638814022d02ea8d1f22"},{url:"images/profileone.jpg",revision:"742736ad4b86c5b51fbaa1ca1ce63504"},{url:"images/resumeimage.png",revision:"6c21cd9b8186d8644b0893df10c3aecd"},{url:"images/sharing.png",revision:"7b1fcd99581574970dba66358b446c63"},{url:"images/sharingDisp.png",revision:"d4d2a36fee12199a1e60dca7ed93b5f7"},{url:"images/shoeswebsite.png",revision:"4a8fbbe495ef7e31769965c913bf0760"},{url:"index.html",revision:"1c3a7312d73f9b55b9ff5ab61ff45741"},{url:"offline.html",revision:"d244a94c1d29d7afbb60e14f8e5dea61"},{url:"script.js",revision:"b7028e90c02246b8f5bb842374e1ad8b"},{url:"styles.css",revision:"d6867245699eaf3177baa1de7f977e3b"},{url:"sw-custom.js",revision:"645edd2d3229f9c9bb35efafec503d69"}],{}),e.registerRoute(/\.(?:png|jpg|jpeg|svg|mp4)$/,new e.CacheFirst({cacheName:"media-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\.(?:html|js|css)$/,new e.StaleWhileRevalidate({cacheName:"static-resources",plugins:[new e.ExpirationPlugin({maxEntries:30})]}),"GET")}));
//# sourceMappingURL=sw.js.map

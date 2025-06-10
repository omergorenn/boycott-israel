import"./style-7fttntmb.js";let r=[],l=[],d=[];async function f(){const a=document.getElementById("apps-table-body");a&&(a.innerHTML=`
            <tr>
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <div class="flex items-center justify-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Veriler yükleniyor...
                    </div>
                </td>
            </tr>
        `);try{console.log("Starting data load...");const n=localStorage.getItem("boycott-data");if(n){const t=JSON.parse(n);t.apps&&Array.isArray(t.apps)&&(r=t.apps,console.log("Loaded apps from localStorage:",r.length)),t.sites&&Array.isArray(t.sites)&&(l=t.sites,console.log("Loaded sites from localStorage:",l.length))}if(r.length===0){console.log("Loading apps from JSON...");const t=await fetch("/data/apps.json");t.ok?(r=await t.json(),console.log("Loaded apps from JSON:",r.length)):console.error("Failed to load apps.json:",t.status)}if(l.length===0){console.log("Loading sites from JSON...");const t=await fetch("/data/sites.json");t.ok?(l=await t.json(),console.log("Loaded sites from JSON:",l.length)):console.error("Failed to load sites.json:",t.status)}const e=[...r,...l];d=e,console.log("Total combined data:",e.length),e.length>0?(p(d),g()):a&&(a.innerHTML=`
                    <tr>
                        <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                            Henüz veri bulunamadı. Lütfen admin panelinden veri ekleyin.
                        </td>
                    </tr>
                `)}catch(n){console.error("Error loading data:",n);const e=document.getElementById("apps-table-body");e&&(e.innerHTML=`
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-red-600">
                        Veri yüklenirken hata oluştu: ${n.message}
                    </td>
                </tr>
            `)}}function p(a){const n=document.getElementById("apps-table-body")||document.getElementById("apps-table");n&&(n.tagName,n.innerHTML="",a.forEach(e=>{const t=document.createElement("tr");t.className="border-b border-gray-200 hover:bg-gray-50";const s=e.url?`${e.name} (${e.url})`:e.name,i=e.type==="website"?"🌐":e.type==="brand"?"🏢":"📱";t.innerHTML=`
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${i} ${s}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${e.category}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${e.usedInTR?"bg-red-100 text-red-800":"bg-green-100 text-green-800"}">
                    ${e.usedInTR?"Yaygın":"Nadir"}
                </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 max-w-xs">${e.alternative}</td>
            <td class="px-6 py-4 text-sm text-gray-500 max-w-xs">${e.reason}</td>
        `,n.tagName==="TBODY"?n.appendChild(t):n.innerHTML+=t.outerHTML}))}function c(){const a=document.getElementById("category-filter"),n=document.getElementById("usage-filter"),e=document.getElementById("search-input");if(!a||!n||!e)return;let s=[...[...r,...l]];if(a.value!=="all"&&(s=s.filter(o=>o.category===a.value)),n.value!=="all"){const o=n.value==="used";s=s.filter(u=>u.usedInTR===o)}const i=e.value.toLowerCase();i&&(s=s.filter(o=>o.name.toLowerCase().includes(i)||o.alternative.toLowerCase().includes(i)||o.reason.toLowerCase().includes(i)||o.url&&o.url.toLowerCase().includes(i))),p(s)}function g(){const a=document.getElementById("category-filter"),n=document.getElementById("usage-filter"),e=document.getElementById("search-input");if(a&&a.addEventListener("change",c),n&&n.addEventListener("change",c),e&&e.addEventListener("input",c),a){const t=[...new Set([...r,...l].map(s=>s.category))].sort();a.innerHTML='<option value="all">Tüm Kategoriler</option>',t.forEach(s=>{a.innerHTML+=`<option value="${s}">${s}</option>`})}}function m(){g()}function y(){const a=document.getElementById("submit-form");a&&a.addEventListener("submit",function(n){n.preventDefault();const e=new FormData(a),t=Object.fromEntries(e);console.log("Form submitted:",t);const s=document.getElementById("success-message");s&&(s.classList.remove("hidden"),a.reset())})}document.addEventListener("DOMContentLoaded",function(){f(),m(),y()});window.filterApps=c;

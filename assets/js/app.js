/* ==========================================================================
   DISA CHARMS — Argon Interactive Showcase & Client Portal Engine
   (Cloud JSONBin.io Synchronized Version)
   ========================================================================== */

const COLLECTIONS = [
  "All",
  "Main Studs",
  "Second Studs",
  "Rings",
  "Ear Cuffs",
  "Regular Wear Kada",
  "Party Wear Kada",
  "Charms",
  "Regular Wear Chains",
  "Hair Veins",
  "Anklets",
  "Hair Accessories",
  "Nose Pins – Piercing & Non-Piercing"
];

const DEFAULT_PRODUCTS = [
  {
    id: "DC-1001",
    name: "Tulip Crystal Anti-Tarnish Necklace",
    category: "Regular Wear Chains",
    material: "316L Grade Stainless Steel • Anti-Tarnish",
    sizes: ["16 inch", "18 inch (Adjustable)"],
    badge: "Bestseller",
    description: "Delicate lavender & clear crystal tulip pendant on a fine 18K gold-toned 316L stainless steel chain. Sweatproof, waterproof, and everyday friendly.",
    images: [
      "assets/images/tulip-necklace-1.webp",
      "assets/images/tulip-necklace-2.webp"
    ]
  },
  {
    id: "DC-1002",
    name: "Emerald Twin Heart Bow Necklace",
    category: "Regular Wear Chains",
    material: "316L Grade Stainless Steel • Anti-Tarnish",
    sizes: ["16 inch", "18 inch"],
    badge: "New Arrival",
    description: "Vibrant emerald-green heart-cut twin zirconia crystals set in a romantic bow silhouette on a tarnish-free link chain.",
    images: [
      "assets/images/emerald-bow-chain.webp",
      "assets/images/chains-restocked-1.webp"
    ]
  },
  {
    id: "DC-1003",
    name: "Opal Teardrop Snake Chain",
    category: "Regular Wear Chains",
    material: "316L Grade Stainless Steel • Anti-Tarnish",
    sizes: ["16 inch", "18 inch"],
    badge: "Restocked",
    description: "Lustrous white opal cabochon teardrop bezel-set on a liquid-smooth flat gold snake chain. Zero green skin or fading.",
    images: [
      "assets/images/opal-teardrop-1.webp",
      "assets/images/opal-teardrop-2.webp"
    ]
  },
  {
    id: "DC-1004",
    name: "Black Onyx Beaded Satellite Chain",
    category: "Regular Wear Chains",
    material: "316L Grade Stainless Steel • Anti-Tarnish",
    sizes: ["16 inch", "18 inch"],
    badge: "Trending",
    description: "Minimalist round black onyx cabochon drop suspended from a beaded golden satellite box chain.",
    images: [
      "assets/images/black-onyx-chain.webp",
      "assets/images/opal-teardrop-1.webp"
    ]
  },
  {
    id: "DC-1005",
    name: "Sculpted Golden Heart Satellite Necklace",
    category: "Charms",
    material: "316L Grade Stainless Steel • Anti-Tarnish",
    sizes: ["18 inch"],
    badge: "Signature",
    description: "High-polish 3D sculpted modern heart charm on a sleek gold-plated 316L stainless steel satellite snake chain.",
    images: [
      "assets/images/golden-heart-chain.webp",
      "assets/images/tulip-necklace-1.webp"
    ]
  },
  {
    id: "DC-1006",
    name: "Infinity, Mother of Pearl Butterfly & Clover Collection",
    category: "Charms",
    material: "316L Grade Stainless Steel • Anti-Tarnish",
    sizes: ["Infinity", "Butterfly", "Saturn Planet", "Double Clover"],
    badge: "Restocked",
    description: "Our signature restocked pendant chains featuring pave infinity, mother-of-pearl butterfly, celestial planet halo, and double clover designs.",
    images: [
      "assets/images/chains-restocked-1.webp",
      "assets/images/chains-restocked-2.webp"
    ]
  }
];

// ============================================================================
// JSONBin.io Cloud Configuration
// ============================================================================
const JSONBIN_BIN_ID = localStorage.getItem("disa_jsonbin_bin_id") || "6aeda096ffd5d16053ab7384";
const JSONBIN_API_KEY = localStorage.getItem("disa_jsonbin_api_key") || "$2a$10$KcbxToib/9NuxZYAYgMrE.90NXCTM/sv8DQcwnHYChBoL9vvHkwZa";

// Asynchronous Cloud Fetch
async function getProducts() {
  if (!JSONBIN_BIN_ID || JSONBIN_BIN_ID === "YOUR_BIN_ID_HERE") {
    const saved = localStorage.getItem("disa_charms_products");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_PRODUCTS;
  }

  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
      headers: {
        "X-Master-Key": JSONBIN_API_KEY
      }
    });
    const data = await res.json();
    if (data && data.record && Array.isArray(data.record.products)) {
      return data.record.products;
    }
    return DEFAULT_PRODUCTS;
  } catch (e) {
    console.warn("Cloud fetch failed, falling back to local storage:", e);
    const saved = localStorage.getItem("disa_charms_products");
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  }
}

// Asynchronous Cloud Save
async function saveProducts(list) {
  localStorage.setItem("disa_charms_products", JSON.stringify(list));

  if (!JSONBIN_BIN_ID || JSONBIN_BIN_ID === "YOUR_BIN_ID_HERE") {
    return;
  }

  try {
    await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": JSONBIN_API_KEY
      },
      body: JSON.stringify({ products: list })
    });
  } catch (e) {
    console.error("Cloud save failed:", e);
  }
}

function getWhatsAppNumber() {
  return localStorage.getItem("disa_charms_wa_number") || "919750589339";
}

function setWhatsAppNumber(num) {
  localStorage.setItem("disa_charms_wa_number", num.replace(/[^0-9]/g, ""));
}

// Build Dynamic WhatsApp Inquiry URL with Product ID, Name, Category, Size & Image Reference
function buildWhatsAppUrl(product, selectedSize = "", activeImgIndex = 0) {
  const phone = getWhatsAppNumber();
  const imgRef = product.images && product.images[activeImgIndex] ? product.images[activeImgIndex] : "Primary Image";
  const sizeText = selectedSize ? `\n• Selected Size/Option: ${selectedSize}` : "";
  const msg = `Hello DISA CHARMS! ✨\nI would like to enquire / order the following piece:\n\n• Product Name: ${product.name}\n• Product ID: ${product.id}\n• Category: ${product.category}\n• Material: ${product.material}${sizeText}\n• Image Ref: ${imgRef}\n\nPlease share availability and price details.`;
  return `https://wa.me/${phone}?text=` + encodeURIComponent(msg);
}

// Global State for Active Image Index & Selected Size per Product Card
const cardState = {};

function renderCategories(containerId, activeCategory = "All", onSelect = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  COLLECTIONS.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `category-pill ${cat === activeCategory ? "active" : ""}`;
    btn.textContent = cat;
    btn.onclick = () => {
      if (onSelect) onSelect(cat);
    };
    container.appendChild(btn);
  });
}

async function renderProductGrid(containerId, filterCategory = "All", searchQuery = "", limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let items = await getProducts();
  if (filterCategory && filterCategory !== "All") {
    items = items.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());
  }
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    items = items.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }
  if (limit) {
    items = items.slice(0, limit);
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full argon-card p-12 text-center">
        <p class="text-xl font-serif-luxury text-[#4A1525] mb-2">No pieces found in "${filterCategory}"</p>
        <p class="text-sm text-gray-600 mb-4">We restock our 316L Stainless Steel Anti-Tarnish collections daily. Enquire directly on WhatsApp for custom or upcoming pieces!</p>
        <a href="https://wa.me/${getWhatsAppNumber()}?text=` + encodeURIComponent('Hi DISA CHARMS! Can you share photos of available pieces in ' + filterCategory + '?') + `" target="_blank" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full btn-argon-whatsapp text-sm">
          Ask on WhatsApp
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(product => {
    if (!cardState[product.id]) {
      cardState[product.id] = {
        imgIdx: 0,
        size: product.sizes && product.sizes.length ? product.sizes[0] : "Standard"
      };
    }
    const st = cardState[product.id];
    const imgs = product.images && product.images.length ? product.images : ["assets/images/logo.jpg"];
    const currentImg = imgs[st.imgIdx] || imgs[0];
    const waLink = buildWhatsAppUrl(product, st.size, st.imgIdx);

    const thumbsHtml = imgs.length > 1 ? `
      <div class="flex items-center gap-2 mt-3 px-1 overflow-x-auto no-scrollbar">
        ${imgs.map((imgUrl, idx) => `
          <button onclick="switchProductImage('${product.id}', ${idx}, '${containerId}', '${filterCategory}', '${searchQuery}', ${limit})"
            class="w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${idx === st.imgIdx ? 'border-[#4A1525] scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'}">
            <img src="${imgUrl}" alt="${product.name}" class="w-full h-full object-cover" />
          </button>
        `).join("")}
      </div>
    ` : "";

    const sizesHtml = product.sizes && product.sizes.length > 0 ? `
      <div class="mt-3">
        <label class="block text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">Size / Variant</label>
        <div class="flex flex-wrap gap-1.5">
          ${product.sizes.map(sz => `
            <button onclick="selectProductSize('${product.id}', '${sz.replace(/'/g, "\'")}', '${containerId}', '${filterCategory}', '${searchQuery}', ${limit})"
              class="px-2.5 py-1 text-xs rounded-md border transition-all ${st.size === sz ? 'bg-[#4A1525] text-white border-[#4A1525]' : 'bg-[#FAF7F2] text-gray-700 border-gray-200 hover:border-[#C5A059]'}">
              ${sz}
            </button>
          `).join("")}
        </div>
      </div>
    ` : "";

    return `
      <div class="argon-card overflow-hidden flex flex-col justify-between p-4">
        <div>
          <div class="relative rounded-xl overflow-hidden bg-[#2E0B16] aspect-square group">
            <img src="${currentImg}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute top-3 left-3 flex flex-col gap-1">
              <span class="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#4A1525]/90 text-[#E6C88A] backdrop-blur-sm">
                ${product.badge || '316L Anti-Tarnish'}
              </span>
            </div>
            <span class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-black/65 text-white backdrop-blur-sm">
              #${product.id}
            </span>
            ${imgs.length > 1 ? `
              <span class="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 text-white text-[11px]">
                ${st.imgIdx + 1} / ${imgs.length}
              </span>
            ` : ''}
          </div>
          ${thumbsHtml}
          <div class="mt-4">
            <div class="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">${product.category}</div>
            <h3 class="text-xl font-serif-luxury font-bold text-[#1E1B18] mt-0.5 leading-snug">${product.name}</h3>
            <p class="text-xs text-[#4A1525] font-medium mt-1">${product.material}</p>
            <p class="text-xs text-gray-600 mt-2 line-clamp-2">${product.description}</p>
            ${sizesHtml}
          </div>
        </div>
        <div class="mt-5 pt-3 border-t border-gray-100">
          <a href="${waLink}" target="_blank" rel="noopener noreferrer"
            class="w-full py-2.5 px-4 rounded-xl btn-argon-whatsapp flex items-center justify-center gap-2 text-sm shadow-md">
            <i class="fab fa-whatsapp text-base"></i>
            <span>Enquire / Buy on WhatsApp</span>
          </a>
        </div>
      </div>
    `;
  }).join("");
}

window.switchProductImage = function(productId, imgIdx, containerId, filterCategory, searchQuery, limit) {
  if (!cardState[productId]) cardState[productId] = { imgIdx: 0, size: "Standard" };
  cardState[productId].imgIdx = imgIdx;
  renderProductGrid(containerId, filterCategory, searchQuery, limit);
};

window.selectProductSize = function(productId, size, containerId, filterCategory, searchQuery, limit) {
  if (!cardState[productId]) cardState[productId] = { imgIdx: 0, size: size };
  cardState[productId].size = size;
  renderProductGrid(containerId, filterCategory, searchQuery, limit);
};

// Auto-update static WhatsApp links on page load
document.addEventListener("DOMContentLoaded", () => {
  const waNum = getWhatsAppNumber();
  const heroBtn = document.getElementById("hero-wa-btn");
  if (heroBtn) {
    heroBtn.href = `https://wa.me/${waNum}?text=` + encodeURIComponent("Hi DISA CHARMS! I want to explore your latest collections.");
  }
  const floatBtn = document.getElementById("global-wa-float");
  if (floatBtn) {
    floatBtn.href = `https://wa.me/${waNum}?text=` + encodeURIComponent("Hello DISA CHARMS! I would like to enquire about your 316L Anti-Tarnish collections.");
  }
});

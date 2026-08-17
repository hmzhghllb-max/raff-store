const storesData = [
  { id: "bakes", name: "مخبز بيكس Bakes", category: "مخبوزات وحلويات", phone: "96890000001", img: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=150" },
  { id: "dar_alez", name: "بوتيك دار العز", category: "أزياء عُمانية", phone: "96890000002", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
  { id: "matcha_corner", name: "ركن الماتشا", category: "قهوة وماتشا", phone: "96890000003", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=150" },
  { id: "asala_acc", name: "كماليات الأصالة", category: "كماليات وإكسسوارات", phone: "96890000004", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=150" }
];

const productsData = [
  { id: 1, name: "كيكة الشوكولاتة والكراميل", category: "bakery", vendor: "مخبز بيكس Bakes", phone: "96890000001", price: 6.500, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
  { id: 2, name: "عباية سوداء بلمسة حريرية", category: "fashion", vendor: "بوتيك دار العز", phone: "96890000002", price: 28.000, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400" },
  { id: 3, name: "شاي ماتشا ياباني فاخر", category: "coffee", vendor: "ركن الماتشا", phone: "96890000003", price: 12.000, img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400" },
  { id: 4, name: "مسباح بكالايت فاخر", category: "accessories", vendor: "كماليات الأصالة", phone: "96890000004", price: 14.500, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400" },
  { id: 5, name: "كوب سيراميك يدوي الصنع", category: "coffee", vendor: "استوديو الخزف", phone: "96890000005", price: 5.200, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400" },
  { id: 6, name: "اشتراك أدوبي السنوي", category: "digital", vendor: "Promt.ai الرقمية", phone: "96890000006", price: 18.000, img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400" }
];

let selectedProduct = null;

document.addEventListener("DOMContentLoaded", () => {
  renderStores();
  renderProducts(productsData);
  initFilters();
  initSearch();
  
  document.getElementById("loginBtn").onclick = () => openAuthModal('customer');
  document.getElementById("joinMerchantBtn").onclick = () => openAuthModal('merchant');
});

function renderStores() {
  const grid = document.getElementById("storesGrid");
  grid.innerHTML = storesData.map(s => `
    <div class="store-card" onclick="filterByVendor('${s.name}')">
      <img src="${s.img}" class="store-avatar" alt="${s.name}" />
      <div class="store-name">${s.name}</div>
      <div class="store-badge"><i class="fa-solid fa-circle-check"></i> ${s.category}</div>
    </div>
  `).join("");
}

function filterByVendor(vendorName) {
  const filtered = productsData.filter(p => p.vendor === vendorName);
  renderProducts(filtered);
  document.getElementById("products").scrollIntoView({ behavior: 'smooth' });
}

function renderProducts(items) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = items.map(p => `
    <div class="prod-card">
      <img src="${p.img}" alt="${p.name}" class="prod-img" />
      <div class="prod-title">${p.name}</div>
      <div class="prod-vendor">${p.vendor}</div>
      <div class="prod-footer">
        <span class="prod-price">${p.price.toFixed(3)} ر.ع</span>
        <button class="order-btn" onclick="openOrderModal(${p.id})">أطلب الآن</button>
      </div>
    </div>
  `).join("");
}

function openOrderModal(prodId) {
  selectedProduct = productsData.find(p => p.id === prodId);
  if (!selectedProduct) return;

  document.getElementById("modalProdTitle").textContent = selectedProduct.name;
  document.getElementById("modalProdImg").src = selectedProduct.img;
  document.getElementById("modalProdVendor").textContent = "المتجر: " + selectedProduct.vendor;
  document.getElementById("modalProdPrice").textContent = "السعر: " + selectedProduct.price.toFixed(3) + " ر.ع";
  document.getElementById("orderNoteInput").value = "";

  document.getElementById("orderModal").classList.add("open");
}

function closeOrderModal() {
  document.getElementById("orderModal").classList.remove("open");
  selectedProduct = null;
}

document.getElementById("sendWhatsAppBtn").onclick = () => {
  if (!selectedProduct) return;
  const note = document.getElementById("orderNoteInput").value.trim();
  
  let msg = `مرحباً ${selectedProduct.vendor}، أود طلب المنتج التالي من خلال منصة Raff:\n\n`;
  msg += `📌 *المنتج:* ${selectedProduct.name}\n`;
  msg += `💰 *السعر:* ${selectedProduct.price.toFixed(3)} ر.ع\n`;
  if (note) msg += `📝 *ملاحظات التخصيص:* ${note}\n`;
  msg += `\nيرجى تزويدي بتفاصيل التوصيل والحساب لإتمام الطلب.`;

  window.open(`https://wa.me/${selectedProduct.phone}?text=${encodeURIComponent(msg)}`, '_blank');
};

function initFilters() {
  const tabs = document.querySelectorAll(".tab-btn");
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      const list = filter === "all" ? productsData : productsData.filter(p => p.category === filter);
      renderProducts(list);
    };
  });
}

function initSearch() {
  document.getElementById("searchInput").addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();
    renderProducts(productsData.filter(p => p.name.toLowerCase().includes(val) || p.vendor.toLowerCase().includes(val)));
  });
}

function openAuthModal(type) {
  document.getElementById("authModal").classList.add("open");
  switchAuthTab(type);
}

function closeAuthModal() {
  document.getElementById("authModal").classList.remove("open");
}

function switchAuthTab(type) {
  const tabCust = document.getElementById("tabCustomer");
  const tabMerch = document.getElementById("tabMerchant");
  const formCust = document.getElementById("customerForm");
  const formMerch = document.getElementById("merchantForm");

  if (type === 'customer') {
    tabCust.classList.add("active"); tabMerch.classList.remove("active");
    formCust.classList.add("active"); formMerch.classList.remove("active");
  } else {
    tabMerch.classList.add("active"); tabCust.classList.remove("active");
    formMerch.classList.add("active"); formCust.classList.remove("active");
  }
}

// --- 1. سلطنة عمان - المحافظات والولايات ---
const omanLocations = {
  "مسقط": ["مسقط", "مطرح", "بوشر", "السيْب", "العامرات", "قريات"],
  "ظفار": ["صلالة", "طاقة", "مرباط", "ثمريت", "رخيوت", "ضلكوت"],
  "مسندم": ["خصب", "دبا", "بخاء", "مدحاء"],
  "البريمي": ["البريمي", "محضة", "السنينة"],
  "الداخلية": ["نزوى", "بهلاء", "منح", "الحمراء", "أدم", "سمائل"],
  "شمال الباطنة": ["صحار", "صحم", "الخابورة", "السويق", "لوى", "شناص"],
  "جنوب الباطنة": ["الرستاق", "بركاء", "المصنعة", "العوابي", "نخل"],
  "شمال الشرقية": ["إبراء", "المضيبي", "بدية", "القابل"],
  "جنوب الشرقية": ["صور", "الكامل والوافي", "جعلان بني بو حسن", "جعلان بني بو علي"],
  "الظاهرة": ["عبري", "ينقل", "ضنك"],
  "الوسطى": ["هيماء", "الدقم", "محوت"]
};

// --- 2. أقسام متجر رف التفصيلية ---
const categoriesData = [
  { title: "المخبوزات والحلويات", items: ["مخبوزات طازجة", "حلويات فاخرة", "كيك المناسبات", "معجنات يومية"] },
  { title: "الأزياء والملابس", items: ["عبايات أنيقة", "مخورات عُمانية", "دشداشة عُمانية", "ملابس وأطقم كاملة"] },
  { title: "الكماليات والإكسسوارات", items: ["ساعات أنيقة", "مسباح فاخر", "أقلام راقية", "أحذية رجالية ونسائية"] },
  { title: "ركن القهوة والماتشا", items: ["شاي ماتشا فاخر", "حبوب قهوة مختصة", "أدوات تحضير القهوة", "أدوات الماتشا"] },
  { title: "الأكواب والفناجين", items: ["أكواب سيراميك", "فناجين قهوة", "أكواب إسبريسو", "أكواب مرسومة يدوياً"] },
  { title: "الخدمات الرقمية والترفيه", items: ["أجهزة وألعاب (Sony / Nintendo)", "برامج أدوبي (Adobe)", "تصميم عروض تقديمية", "إعداد مشاريع"] }
];

// --- 3. منتجات نموذجية لمتجر رف ---
const productsData = [
  { id: 1, name: "كيكة الشوكولاتة والكراميل", category: "bakery", vendor: "مخبز بيكس Bakes", price: 6.500, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
  { id: 2, name: "عباية سوداء بلمسة حريرية", category: "fashion", vendor: "بوتيك دار العز", price: 28.000, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400" },
  { id: 3, name: "شاي ماتشا ياباني فاخر (درجة احتفالية)", category: "coffee", vendor: "ركن الماتشا", price: 12.000, img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400" },
  { id: 4, name: "مسباح بكالايت خامة فاخرة", category: "accessories", vendor: "كماليات الأصالة", price: 14.500, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400" },
  { id: 5, name: "كوب سيراميك مصنوع ومطلي يدوياً", category: "cups", vendor: "استوديو الخزف", price: 5.200, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400" },
  { id: 6, name: "اشتراك أدوبي باقة المصممين السنوية", category: "digital", vendor: "Promt.ai الرقمية", price: 18.000, img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400" }
];

// --- 4. عروض التجار الحية ---
const merchantOffers = [
  { text: "🚚 **توصيل مجاني**: عند الشراء بقيمة 15 ر.ع أو أكثر لجميع المحافظات!" },
  { text: "🔥 **مخبز بيكس**: خصم 25% على طلبات الكيك والمعجنات اليوم." },
  { text: "🍵 **ركن الماتشا**: احصل على خفاقة مجانية عند شراء طقم الماتشا الكامل." }
];

let cart = [];

// --- Init App ---
document.addEventListener("DOMContentLoaded", () => {
  renderAnnouncements();
  renderCategories();
  renderProducts(productsData);
  initLocationModal();
  initCartDrawer();
  initFilterTabs();
  initStatsCounter();
});

function renderAnnouncements() {
  const wrapper = document.getElementById("tickerWrapper");
  wrapper.innerHTML = merchantOffers.map(o => `<span class="ticker-item">${o.text}</span>`).join("");
}

function renderCategories() {
  const grid = document.getElementById("categoriesGrid");
  grid.innerHTML = categoriesData.map(c => `
    <div class="cat-card">
      <h3>${c.title}</h3>
      <ul>${c.items.map(i => `<li>${i}</li>`).join("")}</ul>
    </div>
  `).join("");
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
        <button class="add-btn" onclick="addToCart(${p.id})">إضافة للسلة</button>
      </div>
    </div>
  `).join("");
}

function initFilterTabs() {
  const btns = document.querySelectorAll(".tab-btn");
  btns.forEach(btn => {
    btn.onclick = () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      if (filter === "all") renderProducts(productsData);
      else renderProducts(productsData.filter(p => p.category === filter));
    };
  });
}

function addToCart(id) {
  const item = productsData.find(p => p.id === id);
  cart.push(item);
  updateCartUI();
}

function updateCartUI() {
  document.getElementById("cartCount").textContent = cart.length;
  document.getElementById("cartDrawerCount").textContent = cart.length;
  
  const container = document.getElementById("cartItemsContainer");
  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-msg">السلة فارغة حالياً</p>';
  } else {
    container.innerHTML = cart.map(i => `
      <div style="display:flex; justify-content:space-between; margin-bottom:12px; border-bottom:1px solid #333; padding-bottom:8px;">
        <div>
          <div>${i.name}</div>
          <small style="color:var(--terracotta);">${i.vendor}</small>
        </div>
        <strong>${i.price.toFixed(3)} ر.ع</strong>
      </div>
    `).join("");
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cartTotalVal").textContent = total.toFixed(3) + " ر.ع";
}

function initCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  document.getElementById("cartBtn").onclick = () => drawer.classList.add("open");
  document.getElementById("closeCart").onclick = () => drawer.classList.remove("open");
}

function initLocationModal() {
  const modal = document.getElementById("locationModal");
  const govSelect = document.getElementById("govSelect");
  const wilSelect = document.getElementById("wilSelect");

  document.getElementById("locationBtn").onclick = () => modal.classList.add("open");

  Object.keys(omanLocations).forEach(gov => {
    const opt = document.createElement("option");
    opt.value = gov; opt.textContent = gov;
    govSelect.appendChild(opt);
  });

  govSelect.onchange = () => {
    wilSelect.innerHTML = '<option value="">اختر الولاية...</option>';
    if (govSelect.value) {
      wilSelect.disabled = false;
      omanLocations[govSelect.value].forEach(w => {
        const opt = document.createElement("option");
        opt.value = w; opt.textContent = w;
        wilSelect.appendChild(opt);
      });
    } else { wilSelect.disabled = true; }
  };

  document.getElementById("saveLocBtn").onclick = () => {
    if (govSelect.value && wilSelect.value) {
      document.getElementById("currentLocation").textContent = `${govSelect.value} - ${wilSelect.value}`;
      modal.classList.remove("open");
    }
  };

  document.getElementById("geoBtn").onclick = () => {
    document.getElementById("currentLocation").textContent = "مسقط - بوشر (تلقائي)";
    modal.classList.remove("open");
  };
}

function initStatsCounter() {
  document.querySelectorAll(".stat-value").forEach(el => {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || "";
    el.textContent = target.toFixed(decimals) + suffix;
  });
}

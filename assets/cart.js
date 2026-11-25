/* ============================================================
   TinKhùng Coffee & Tea — logic giỏ hàng dùng chung
   Lưu trong localStorage (tương thích bản gốc: khóa "tinKhungCartItems")
   ============================================================ */
(function () {
  "use strict";

  const CART_KEY = "tinKhungCartItems";
  const COUNT_KEY = "tinKhungCartCount";

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch (e) { return []; }
  }
  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    localStorage.setItem(COUNT_KEY, items.reduce((s, i) => s + i.qty, 0));
    updateBadges();
  }
  function cartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }

  function formatMoney(n) { return Number(n).toLocaleString("vi-VN") + "đ"; }

  function updateBadges() {
    const c = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = c;
      el.classList.toggle("is-empty", c === 0);
    });
  }

  let toastTimer = null;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.innerHTML = '<span>✅</span>' + msg;
    requestAnimationFrame(function () { el.classList.add("show"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 1800);
  }

  function bumpCart() {
    const btn = document.querySelector(".cart-link");
    if (!btn) return;
    btn.classList.add("bump");
    setTimeout(function () { btn.classList.remove("bump"); }, 400);
  }

  function flyToCart(originEl, img, icon) {
    const target = document.querySelector(".cart-link");
    if (!originEl || !target) return;
    const s = originEl.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    const flyer = document.createElement("div");
    flyer.className = "flying-item";
    if (img) flyer.style.backgroundImage = "url('" + img + "')";
    else flyer.textContent = icon || "🍽️";
    flyer.style.left = s.left + (s.width - 70) / 2 + "px";
    flyer.style.top = s.top + (s.height - 70) / 2 + "px";
    document.body.appendChild(flyer);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        flyer.style.left = t.left + (t.width - 70) / 2 + "px";
        flyer.style.top = t.top + (t.height - 70) / 2 + "px";
        flyer.style.transform = "scale(0.26) rotate(-16deg)";
        flyer.style.opacity = "0.7";
      });
    });
    setTimeout(function () { flyer.remove(); }, 720);
  }

  function addItem(name, price, img, icon, originEl) {
    const items = getCart();
    const ex = items.find(function (i) { return i.name === name; });
    if (ex) { ex.qty += 1; if (img && !ex.img) ex.img = img; }
    else items.push({ name: name, price: Number(price), img: img || "", icon: icon || "", qty: 1 });

    if (originEl) flyToCart(originEl, img, icon);
    setTimeout(function () {
      saveCart(items);
      bumpCart();
      toast("Đã thêm “" + name + "” vào giỏ");
    }, originEl ? 300 : 0);
  }

  /* Gắn sự kiện cho mọi nút .add-btn trong trang menu */
  function wireMenuButtons() {
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".add-btn");
      if (!btn) return;
      const card = btn.closest(".product-card");
      if (!card) return;
      const origin = card.querySelector(".ph img") || card.querySelector(".ph");
      addItem(
        card.dataset.name,
        card.dataset.price,
        card.dataset.img,
        card.dataset.icon,
        origin
      );
    });
  }

  /* Nút menu mobile */
  function wireNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateBadges();
    wireMenuButtons();
    wireNavToggle();
  });

  /* Xuất ra cho trang giỏ hàng dùng */
  window.TinKhungCart = {
    get: getCart,
    save: saveCart,
    count: cartCount,
    format: formatMoney,
    updateBadges: updateBadges
  };
})();

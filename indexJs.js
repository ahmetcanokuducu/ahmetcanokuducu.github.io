const btn = document.querySelector("#menuBtn");
if (btn) {
  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true"; // açık mı kapalı mı kontrol et
    btn.setAttribute("aria-expanded", String(!isOpen)); // durumu tersine çevir
  });
}


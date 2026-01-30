document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const errName = document.getElementById("errName");
  const errEmail = document.getElementById("errEmail");
  const errMsg = document.getElementById("errMsg");
  const formOk = document.getElementById("formOk");
  const sendBtn = document.getElementById("sendBtn");

  function clearErrors() {
    errName.textContent = "";
    errEmail.textContent = "";
    errMsg.textContent = "";
    formOk.textContent = "";
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let ok = true;

    if (name.length < 2) {
      errName.textContent = "İsim en az 2 karakter olmalı.";
      ok = false;
    }
    if (!isValidEmail(email)) {
      errEmail.textContent = "Geçerli bir e-posta gir.";
      ok = false;
    }
    if (message.length < 5) {
      errMsg.textContent = "Mesaj en az 5 karakter olmalı.";
      ok = false;
    }

    // action boşsa endpoint yok demektir
    if (!form.action || form.action.trim() === "") {
      formOk.textContent = "⚠️ Form endpoint’i yok (Formspree action eklenmemiş).";
      ok = false;
    }

    if (!ok) return;

    // gönder
    const oldText = sendBtn.textContent;
    sendBtn.disabled = true;
    sendBtn.textContent = "Gönderiliyor...";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        formOk.textContent = "✅ Mesajın gönderildi. Teşekkürler!";
        form.reset();
      } else {
        formOk.textContent = "❌ Gönderim başarısız. Formspree panelini kontrol et.";
      }
    } catch (err) {
      formOk.textContent = "❌ Ağ hatası. İnterneti/endpoint’i kontrol et.";
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = oldText;
    }
  });
});

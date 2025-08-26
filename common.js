document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pardot-form");

  // Placeholder設定
  const placeholders = [
    { name: "1068932_534862pi_1068932_534862", text: "例）田中" },
    { name: "1068932_534865pi_1068932_534865", text: "例）太郎" },
    { name: "1068932_534868pi_1068932_534868", text: "例）株式会社ProVision" },
    { name: "1068932_534871pi_1068932_534871", text: "例）example@sample.com" },
    {
      name: "1068932_534874pi_1068932_534874",
      text: "例）0000000000 (ハイフンなし半角)",
    },
    {
      name: "1068932_534877pi_1068932_534877",
      text: "お問い合わせ内容をご記載ください",
    },
  ];
  placeholders.forEach(function (item) {
    const input = form.querySelector(
      `input[name="${item.name}"], textarea[name="${item.name}"]`
    );
    if (input) input.setAttribute("placeholder", item.text);
  });

  // エラーメッセージ表示 or クリア
  function showFieldError(inputEl, message) {
    const field = inputEl.closest(".form-field");
    if (!field) return;

    const label = field.querySelector("label");
    if (!label) return;

    // 差し替え or 無い場合に生成
    let msg = field.querySelector(".error-msg");
    if (!msg) {
      msg = document.createElement("span");
      msg.className = "error-msg";
      label.after(msg);
    }
    msg.textContent = message;

    inputEl.classList.add("invalid");
    inputEl.setAttribute("aria-invalid", "true");
  }

  function clearFieldError(inputEl) {
    const field = inputEl.closest(".form-field");
    if (field) {
      const msg = field.querySelector(".error-msg");
      if (msg) msg.remove();
    }
    inputEl.classList.remove("invalid");
    inputEl.removeAttribute("aria-invalid");
    // 背景色リセット
    inputEl.style.backgroundColor = "";
  }

  form.addEventListener("submit", function (e) {
    let hasError = false;
    let errorMessages = [];

    // 対象フィールド
    const lastNameInput = form.querySelector(
      'input[name="1068932_534862pi_1068932_534862"]'
    );
    const firstNameInput = form.querySelector(
      'input[name="1068932_534865pi_1068932_534865"]'
    );
    const companyInput = form.querySelector(
      'input[name="1068932_534868pi_1068932_534868"]'
    );
    const emailInput = form.querySelector(
      'input[name="1068932_534871pi_1068932_534871"]'
    );
    const phoneInput = form.querySelector(
      'input[name="1068932_534874pi_1068932_534874"]'
    );
    const inquiryInput = form.querySelector(
      'textarea[name="1068932_534877pi_1068932_534877"]'
    );
    const consentInput = form.querySelector(
      'input[name="1068932_534880pi_1068932_534880_6663358"]'
    );

    const inputs = [
      lastNameInput,
      firstNameInput,
      companyInput,
      emailInput,
      phoneInput,
      inquiryInput,
      consentInput,
    ];

    // エラー表示クリア
    inputs.forEach(function (el) {
      if (el) clearFieldError(el);
    });

    // 姓
    if (lastNameInput && lastNameInput.value.trim() === "") {
      hasError = true;
      errorMessages.push("姓を入力してください。");
      showFieldError(lastNameInput, "必須項目です");
    }

    // 名
    if (firstNameInput && firstNameInput.value.trim() === "") {
      hasError = true;
      errorMessages.push("名を入力してください。");
      showFieldError(firstNameInput, "必須項目です");
    }

    // 会社名
    if (companyInput && companyInput.value.trim() === "") {
      hasError = true;
      errorMessages.push("会社名を入力してください。");
      showFieldError(companyInput, "必須項目です");
    }

    // メール
    if (emailInput) {
      const emailValue = emailInput.value.trim();
      if (emailValue === "") {
        hasError = true;
        errorMessages.push("メールアドレスを入力してください。");
        showFieldError(emailInput, "必須項目です");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        hasError = true;
        errorMessages.push("正しいメールアドレスを入力してください。");
        showFieldError(
          emailInput,
          "正しい形式(例: xxx@yyy.com)で入力してください"
        );
      }
    }

    // 電話番号
    if (phoneInput) {
      const phoneValue = phoneInput.value.trim();
      if (phoneValue === "") {
        hasError = true;
        errorMessages.push("電話番号を入力してください。");
        showFieldError(phoneInput, "必須項目です");
      } else if (!/^\d+$/.test(phoneValue) || phoneValue.length < 10) {
        hasError = true;
        errorMessages.push("電話番号の形式で入力してください");
        showFieldError(
          phoneInput,
          "正しい形式(ハイフンなし半角)で入力してください"
        );
      }
    }

    // お問い合わせ内容
    if (inquiryInput && inquiryInput.value.trim() === "") {
      hasError = true;
      errorMessages.push("お問い合わせ内容を入力してください。");
      showFieldError(inquiryInput, "必須項目です");
    }

    // 個人情報保護方針に同意する
    if (consentInput && !consentInput.checked) {
      hasError = true;
      errorMessages.push("個人情報保護方針に同意してください。");
      showFieldError(consentInput, "必須項目です");
    }

    if (hasError) {
      e.preventDefault();
    }
  });
});

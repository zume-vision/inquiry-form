document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pardot-form");

  // Placeholder設定
  const placeholders = [
    {
      name: "1068932_534862pi_1068932_534862",
      text: "例）田中",
    },
    {
      name: "1068932_534865pi_1068932_534865",
      text: "例）太郎",
    },
    {
      name: "1068932_534868pi_1068932_534868",
      text: "例）株式会社ProVision",
    },
    {
      name: "1068932_534871pi_1068932_534871",
      text: "例）example@sample.com",
    },
    {
      name: "1068932_534874pi_1068932_534874",
      text: "例）0000000000",
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
    if (input) {
      input.setAttribute("placeholder", item.text);
    }
  });

  // 送信時バリデーション
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

    // 全フィールド背景色リセット
    [
      lastNameInput,
      firstNameInput,
      companyInput,
      emailInput,
      phoneInput,
      inquiryInput,
    ].forEach(function (input) {
      if (input) {
        input.style.backgroundColor = ""; // 元に戻す
      }
    });

    // 姓
    if (lastNameInput && lastNameInput.value.trim() === "") {
      hasError = true;
      errorMessages.push("姓を入力してください。");
      lastNameInput.style.backgroundColor = "#ffe6e6"; // 赤系
    }

    // 名
    if (firstNameInput && firstNameInput.value.trim() === "") {
      hasError = true;
      errorMessages.push("名を入力してください。");
      firstNameInput.style.backgroundColor = "#ffe6e6";
    }

    // 会社名
    if (companyInput && companyInput.value.trim() === "") {
      hasError = true;
      errorMessages.push("会社名を入力してください。");
      companyInput.style.backgroundColor = "#ffe6e6";
    }

    // メール
    if (emailInput) {
      const emailValue = emailInput.value.trim();
      if (emailValue === "") {
        hasError = true;
        errorMessages.push("メールアドレスを入力してください。");
        emailInput.style.backgroundColor = "#ffe6e6";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        hasError = true;
        errorMessages.push("正しいメールアドレスを入力してください。");
        emailInput.style.backgroundColor = "#ffe6e6";
      }
    }

    // 電話番号
    if (phoneInput) {
      const phoneValue = phoneInput.value.trim();
      if (phoneValue === "") {
        hasError = true;
        errorMessages.push("電話番号を入力してください。");
        phoneInput.style.backgroundColor = "#ffe6e6";
      } else if (!/^\d+$/.test(phoneValue)) {
        hasError = true;
        errorMessages.push("電話番号は半角数字のみで入力してください。");
        phoneInput.style.backgroundColor = "#ffe6e6";
      }
    }

    // お問い合わせ内容
    if (inquiryInput && inquiryInput.value.trim() === "") {
      hasError = true;
      errorMessages.push("お問い合わせ内容を入力してください。");
      inquiryInput.style.backgroundColor = "#ffe6e6";
    }

    if (hasError) {
      alert(errorMessages.join("\n"));
      e.preventDefault();
    }
  });
});

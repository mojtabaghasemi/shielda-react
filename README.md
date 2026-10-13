# Shielda Captcha for React & Next.js (کامپوننت رسمی ری‌اکت شیلدا)

[![npm version](https://img.shields.io/npm/v/shielda-react.svg)](https://www.npmjs.com/package/shielda-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

کامپوننت رسمی **React** و **Next.js** برای سامانه ضد ربات **شیلدا (Shielda)**. با پشتیبانی کامل از Server-Side Rendering (SSR)، React 18/19، Next.js App Router و TypeScript.

---

## 📦 نصب

```bash
npm install shielda-react
# یا
yarn add shielda-react
# یا
pnpm add shielda-react
```

---

## 🚀 نحوه استفاده

### ۱. استفاده پایه در React

```jsx
import React, { useState } from 'react';
import ShieldaCaptcha from 'shielda-react';

export default function LoginForm() {
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      alert('لطفاً کپچا را تکمیل کنید.');
      return;
    }
    // ارسال فرم به سرور همراه با token
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="نام کاربری" required />
      <input type="password" placeholder="کلمه عبور" required />

      {/* کامپوننت کپچا */}
      <ShieldaCaptcha
        siteKey="YOUR_SITE_KEY"
        onVerify={(captchaToken) => setToken(captchaToken)}
        theme="auto"
        lang="fa"
      />

      <button type="submit">ورود به حساب</button>
    </form>
  );
}
```

### ۲. استفاده در Next.js (App Router)

در کامپوننت‌های کلاینت (`'use client'`):

```tsx
'use client';

import ShieldaCaptcha from 'shielda-react';

export default function SignupPage() {
  return (
    <div>
      <h1>ثبت‌نام</h1>
      <ShieldaCaptcha
        siteKey={process.env.NEXT_PUBLIC_SHIELDA_SITE_KEY!}
        onVerify={(token) => console.log('توکن کپچا:', token)}
      />
    </div>
  );
}
```

---

## ⚙️ ویژگی‌ها و Props

| نام Prop | نوع داده | پیش‌فرض | توضیحات |
| :--- | :--- | :--- | :--- |
| `siteKey` | `string` | **الزامی** | کلید سایت دریافت شده از پنل شیلدا |
| `onVerify` | `(token) => void` | `null` | کالبک پس از حل موفقیت‌آمیز چالش |
| `theme` | `'auto' \| 'light' \| 'dark'` | `'auto'` | تم ظاهری کپچا |
| `lang` | `'fa' \| 'en'` | `'fa'` | زبان ویجت کپچا |

---

## 📄 لایسنس
[MIT License](LICENSE) - [https://shielda.ir](https://shielda.ir)

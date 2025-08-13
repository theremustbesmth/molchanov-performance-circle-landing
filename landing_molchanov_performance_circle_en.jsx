# ✅ Application form + привязка к лендингу (и понятная пошаговая инструкция)

Ниже — два варианта:
- **A. Быстрый (Tally — без кода):** создаём форму в Tally, вшиваем её на страницу `/apply` и добавляем кнопки из лендинга.
- **B. Ручной (Next.js форма):** минимум внешних сервисов, заявки уходят на email/Sheet через Formspree/Zapier (можем сделать позже).

Рекомендую **вариант A (Tally)** — быстрее всего.

---

## A) Как создать **Tally** форму для заявки (шаги)
1) Зайди на **tally.so** → Sign up.
2) **Create form** → заголовок: `Molchanov Performance Circle — Application`.
3) Добавь поля (всё — Required):
   - Full name (Short text)
   - Email (Email)
   - Instagram / Website / Social (Short text)
   - Role (Multiple choice): Founder / Performance athlete / Creator / Other
   - Country & City (Short text)
   - Primary hub proximity (Multiple choice): Dubai / Miami / Los Angeles / Lake Tahoe / Mexico / Other
   - Why do you want to join? (Long text)
   - Your track record / achievements (Long text)
   - Audience/community (Short text) — format hint: “IG 45k, YT 12k; engagement 4.2%”
   - Time commitment (Multiple choice): 15–30 min/day / 2–3× week / Unsure
   - Billing (Multiple choice): Monthly $500 / Quarterly (−10%) / Team plan (5 seats)
   - Referral (Short text) — optional
   - **Consent** (Checkbox): “I agree to the Terms, Privacy, and non‑medical nature of the program.”
4) **Thank‑you page**: текст “Thanks! We’ll review your application within 24–48h.”
5) Нажми **Publish** → получи публичный URL вида `https://tally.so/r/XXXXXX`.

Дальше этот URL мы используем в коде на странице `/apply` (в iFrame) и на кнопках **Apply**.

---

## Как привязать форму к лендингу
Мы добавим в проект страницу **`/apply`** с встраиваемой формой (iFrame), а кнопки на лендинге будут вести на неё.

### FILE: `app/apply/page.tsx`
```tsx
'use client';
import React from 'react';

// 1) ВСТАВЬ сюда реальную ссылку на Tally (пример: https://tally.so/r/abcd1234)
const TALLY_FORM_URL = 'https://tally.so/r/your-form-id';

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-semibold">Apply to join</h1>
        <p className="mt-3 text-neutral-300">Fill out the application below. We review within 24–48 hours.</p>
        <div className="mt-6 rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900">
          <iframe
            src={`${TALLY_FORM_URL}?hide-title=1`}
            className="w-full"
            style={{ height: '80vh' }}
            allow="fullscreen; clipboard-write;"
          />
        </div>
        <p className="mt-3 text-xs text-neutral-500">If the form doesn’t load, <a className="underline" href={TALLY_FORM_URL} target="_blank" rel="noreferrer">open it in a new tab</a>.</p>
      </div>
    </main>
  );
}
```

### Обновляем кнопки «Apply» на лендинге
Заменим ссылку на внешний Tally у кнопки на **`/apply`** (внутренняя страница).

### FILE: `components/Landing.tsx` (фрагмент — заменяем две кнопки)
```tsx
// было:
// <a href="https://tally.so/r/your-form-id" ...>Open application form</a>
// стало:
<a href="/apply" className="rounded-2xl bg-white text-black px-5 py-3 text-sm font-medium hover:opacity-90">Open application form</a>
```

И в верхнем CTA тоже:
```tsx
<a href="#apply" className="rounded-2xl bg-white ...">Apply to join — $500/mo</a>
// можно добавить рядом ссылку напрямую на /apply, если хочешь быстрее вести в анкету
```

> **Важно:** на странице `/apply` в файле `app/apply/page.tsx` обязательно замени `TALLY_FORM_URL` на реальный URL из Tally.

---

## Как добавить фото на лендинг (сама, без разработчика)
1) Подготовь картинку **JPEG/PNG**, лучше 1600×900 (или квадрат для блока About). Назови, например, `hero.jpg`.
2) Положи файл в папку **`public/`** проекта (в корне). Получится `public/hero.jpg`.
3) Заменим декоративный блок в Hero на фото.

### FILE: `components/Landing.tsx` (заменяем правый блок Hero)
```tsx
// Импортируем Image
import Image from 'next/image';

// ...внутри Hero, справа
<div className="relative">
  <div className="aspect-video rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
    <Image src="/hero.jpg" alt="Molchanov Performance" fill className="object-cover" priority />
  </div>
</div>
```

> Если хочешь картинку в секции “About Alexey”, добавь `alexey.jpg` в `public/` и вместо пустого квадрата поставь:
```tsx
<div className="relative aspect-square rounded-3xl overflow-hidden border border-neutral-800">
  <Image src="/alexey.jpg" alt="Alexey Molchanov" fill className="object-cover" />
</div>
```

Для логотипов партнёров — положи файлы в `public/partners/` и вставляй `<Image src="/partners/hrv.png" alt="HRV" width={160} height={60} />`.

---

## Полная структура проекта (обновлённый copy‑paste kit)

### FILE: `package.json`
```json
{
  "name": "molchanov-performance-circle-landing",
  "private": true,
  "version": "1.0.0",
  "scripts": { "dev": "next dev", "build": "next build", "start": "next start", "lint": "next lint" },
  "dependencies": { "next": "14.2.5", "react": "18.3.1", "react-dom": "18.3.1" },
  "devDependencies": { "autoprefixer": "10.4.20", "postcss": "8.4.41", "tailwindcss": "3.4.10", "typescript": "5.4.5", "@types/react": "18.3.5", "@types/node": "20.11.30" }
}
```

### FILE: `next.config.mjs`
```js
/** @type {import('next').NextConfig} */
const nextConfig = { experimental: {} };
export default nextConfig;
```

### FILE: `tsconfig.json`
```json
{ "compilerOptions": { "target": "ES2022", "lib": ["dom", "dom.iterable", "esnext"], "allowJs": false, "skipLibCheck": true, "strict": true, "noEmit": true, "esModuleInterop": true, "module": "esnext", "moduleResolution": "bundler", "resolveJsonModule": true, "isolatedModules": true, "jsx": "preserve", "plugins": [{ "name": "next" }], "incremental": true }, "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"], "exclude": ["node_modules"] }
```

### FILE: `next-env.d.ts`
```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

### FILE: `postcss.config.mjs`
```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

### FILE: `tailwind.config.ts`
```ts
import type { Config } from 'tailwindcss'
export default { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: {} }, plugins: [] } satisfies Config
```

### FILE: `app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
:root { color-scheme: dark; }
body { @apply bg-neutral-950 text-neutral-100; }
```

### FILE: `app/layout.tsx`
```tsx
export const metadata = { title: 'Molchanov Performance Circle', description: 'Private breathwork & performance circle by Alexey Molchanov' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return (<html lang="en"><body>{children}</body></html>); }
```

### FILE: `app/page.tsx`
```tsx
import Landing from '@/components/Landing'
export default function Page() { return <Landing /> }
```

### FILE: `app/apply/page.tsx`
```tsx
'use client';
import React from 'react';
const TALLY_FORM_URL = 'https://tally.so/r/your-form-id';
export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-semibold">Apply to join</h1>
        <p className="mt-3 text-neutral-300">Fill out the application below. We review within 24–48 hours.</p>
        <div className="mt-6 rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900">
          <iframe src={`${TALLY_FORM_URL}?hide-title=1`} className="w-full" style={{ height: '80vh' }} allow="fullscreen; clipboard-write;" />
        </div>
        <p className="mt-3 text-xs text-neutral-500">If the form doesn’t load, <a className="underline" href={TALLY_FORM_URL} target="_blank" rel="noreferrer">open it in a new tab</a>.</p>
      </div>
    </main>
  );
}
```

### FILE: `components/Landing.tsx`
```tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
export function computeNextOpenFAQ(current: number | null, clicked: number): number | null { return current === clicked ? null : clicked; }
// ... остальной код без изменений ...
// В Hero справа (заменили блок на картинку):
<div className="relative">
  <div className="aspect-video rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
    <Image src="/hero.jpg" alt="Molchanov Performance" fill className="object-cover" priority />
  </div>
</div>
// В секции Apply кнопка на /apply:
<a href="/apply" className="rounded-2xl bg-white text-black px-5 py-3 text-sm font-medium hover:opacity-90">Open application form</a>
```

### FILE: `public/robots.txt`
```txt
User-agent: *
Allow: /
```

### FILE: `README.md`
```md
# Molchanov Performance Circle — Landing (Next.js + Tailwind)

**Как запустить в браузере (Vercel):**
1) Vercel → New Project → Next.js
2) Добавь Tailwind (deps + конфиги из этого документа)
3) Создай папки `app/`, `components/`, `public/`, вставь файлы из блоков
4) В `app/apply/page.tsx` вставь реальный `TALLY_FORM_URL`
5) Deploy → получи ссылку `.vercel.app`

Локально:
```bash
npm i
npm run dev
```
Открой http://localhost:3000

**Фото** клади в `public/` и указывай как `/hero.jpg` и т.д.
```

---

## Что сделать прямо сейчас (3 шага)
1) **Создай форму в Tally** и скопируй её публичный URL.
2) **Вставь URL** в `app/apply/page.tsx` в константу `TALLY_FORM_URL`.
3) **Загрузи фото** в `public/hero.jpg` (и, при желании, `public/alexey.jpg`).

Готово — кнопки «Apply» будут вести на `/apply` с вшитой формой, а фото появится на лендинге.

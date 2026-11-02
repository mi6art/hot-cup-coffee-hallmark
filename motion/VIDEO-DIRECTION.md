# Кофейный фильм — 02.11.2026

## Концепция

Один крупный стеклянный капучино, выразительная молочная пенка и латте-арт. Тёмный кофейный фон и янтарный свет. На сайте слева остаётся пространство для заголовка. Тема: «Пауза со вкусом кофе».

Использован UI/UX Pro Max: --design-system и поиск ux animation accessibility video autoplay loading. Из рекомендаций выбраны video-first hero, явный CTA и управление воспроизведением. Палитра подобрана под кофе; не относящиеся к кофейне автоматические предложения розового и синего не использованы.

Референсы изучены как направления, их медиа не копировались:
- https://www.ivanzadrabaj.com/work/ronin — спокойная редакционная типографика и пространство.
- https://www.studiosentempo.com/projects/bellotosto — предметная анимация кофе.

## Производство

Изображение: встроенный image_gen, файл public/assets/cinematic-coffee.png. Создано 02.11.2026. Все остальные изображения кофейни — реальные фотографии, сохранённые ранее.

Композиция src/CoffeeFilm.tsx: 1920 × 1080, 30 fps, 240 кадров. Цикличное движение камеры, процедурный пар и свет. Экспорт: H.264, CRF 25, без звука. На сайте используется готовый HTML video; React Player для нового оформления не нужен.

Команды из motion:
```
npm ci
npm run lint
npx remotion studio --no-open
npx remotion render CoffeeFilm ../assets/coffee-film.mp4 --codec=h264 --crf=25 --concurrency=2
npx remotion still CoffeeFilm ../assets/coffee-film-poster.jpg --frame=0 --image-format=jpeg
```

## Финальный промпт изображения

Create a photorealistic premium coffee advertising still to become a cinematic website hero and animated film. Ultra-wide 16:9 composition, 1920x1080 or higher. A single very large transparent double-walled straight-sided glass filled with cappuccino, thick silky ivory microfoam with a beautiful precise rosetta latte art, rich caramel coffee underneath, subtle condensation and tactile glass highlights. Entire glass visible on right half of image, occupies 65 percent of image height, glass center at 73 percent image width; camera slightly above cup so gorgeous foam clearly visible. On a dark espresso brown stone pedestal/table; a few dark roasted coffee beans at its base. Black-brown softly graded studio background, deep dark negative space on left 50 percent for web headline. Dramatic warm amber rim lighting from upper right, soft cream key lighting, sophisticated editorial luxury cafe photography, shallow depth of field, warm coffee aromas suggested visually, beautifully appetizing. No people, no hands, no packaging, no lettering, no logos, no text, no watermark, no extra cups, no smoke or steam baked into the still (will animate steam separately). Avoid floaty glass: grounded on tabletop. Composition must be refined, artistic, and believable, not a generic stock photo.

# Hot Cup Coffee · Remotion

Композиция CoffeeCollage: 760 × 800, 30 кадров/с, цикл 12 секунд. Реальные фотографии кофейни, покадровое движение карточек и типографики.

- `npm ci` — установить зафиксированные зависимости.
- `npm run dev -- --no-open` — открыть Remotion Studio локально.
- `npm run lint` — ESLint и TypeScript.
- `npm run build:site` — собрать `../assets/motion-player.js` для сайта.

`src/Website.tsx` встраивает Player в статическую страницу. При выходе из области просмотра или скрытии вкладки воспроизведение останавливается. Учитываются системные настройки уменьшения движения; есть ручная пауза. MP4 не требуется.

Фотографии для Studio лежат в public/assets; сайт использует корневую assets. После замены фотографии обновляйте обе копии. Не копируйте motion-player.js в public.

Remotion и Player: 4.0.539. Production-пакеты: React, React DOM, Remotion, Player. CLI и Studio используются только при разработке. Сведения о лицензии: https://www.remotion.dev/license.

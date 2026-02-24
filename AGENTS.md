# AGENTS.md

## Cursor Cloud specific instructions

### Project Overview
GoFinances is a React Native / Expo SDK 42 personal finance mobile app (TypeScript). It uses styled-components/native, React Navigation 5, react-hook-form, and AsyncStorage for local persistence. There is no backend server or database — all data is stored on-device.

### Runtime Requirements
- **Node.js 16** (v16.20.2) — Expo SDK 42 and React Native 0.63.4 are incompatible with Node 18+. Use `nvm use 16.20.2`.
- **Yarn** — lockfile is `yarn.lock`; run `yarn install` for dependencies.
- **expo-cli@5** — installed globally via `npm install -g expo-cli@5`.

### Development Server
- `expo start` — starts Metro bundler on port 19000 (+ Expo DevTools on 19002). This is the primary dev server.
- `expo start --web` — also starts webpack on port 19006 for web preview.
- Metro serves bundles to Expo Go or emulators. Request bundles at `http://localhost:19000/index.bundle?platform=ios&dev=true` (or `platform=android`).

### Known Pre-existing Issues
1. **Web mode (`expo start --web`) does not render UI** — `styled-components/native` components fail to receive theme context when running via React Native Web (`styled-components` ThemeProvider and `/native` use different internal contexts). This causes `TypeError: Cannot read properties of undefined (reading 'background')`. Additionally, the `process.env` destructuring pattern in `src/contexts/auth.tsx` is not handled by `babel-plugin-inline-dotenv` for web builds.
2. **Jest tests fail** — the `jest` config uses `"preset": "react-native"` but should use `"jest-expo"` to properly transform ESM modules like `@expo-google-fonts/poppins`.
3. **TypeScript type-check fails** — `react-hook-form` type definitions use syntax incompatible with TypeScript 4.0 (parse errors in `node_modules/react-hook-form/dist/types/utils.d.ts`).

### Authentication
Auth is bypassed in `src/routes/index.tsx` (line 13-14: auth check is commented out, `<AppRoutes />` renders unconditionally). The `.env` file needs `CLIENT_ID` and `REDIRECT_URI` from `.env.example`, but empty values are fine since auth is not enforced.

### Environment Variables
Copy `.env.example` to `.env`. Values can be left empty for local development since auth is bypassed.

### Cloud VM Limitations
No Android emulator or iOS simulator is available. Verify the Metro bundler works by requesting bundles via curl. The web preview mode has pre-existing issues (see above).

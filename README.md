# Frontend-app

This is a near production-grade frontend of a real AI-powered startup app, **Oosal** — co-founded and developed by the author.  
For confidentiality reasons, this repository does not include the most recent production code.  
The app supports dynamic service ordering, curated company listings, user interaction flows, and end-to-end frontend infrastructure.  
The **AI chatbot integration is currently in development** and represented by placeholder components in this version.

---

## Overview

This project is the frontend for a smart service marketplace app that allows users to:

- Browse categorized service providers (e.g., Home Services, Electronics)
- Submit standard or custom service orders
- Add services to a cart and proceed to checkout
- Communicate via a unified order/request screen
- Manage profiles, preferences, and settings

Built using **React Native + Expo**, the app emphasizes **modular design**, **scalability**, and **cross-platform performance**.

---

## Features

- **Service Types**: Fixed-price and request-based service workflows
- **Navigation**: Stack + tab routing powered by React Navigation v6
- **Cart & Checkout**: Add, modify, and confirm service selections
- **Account Management**: Settings, notifications, country/profile selection
- **Request Flow**: Draft services, attach notes, and manage negotiation steps
- **Internationalization**: Arabic + English support via i18next
- **Optimized UI**: Responsive design, scalable themes, custom components
- **Error Handling**: Global error boundary with recovery behavior

---

## Architecture

This React Native application is structured with **feature-based foldering** and follows industry best practices for scalable mobile development.

### Folder Structure
ClientApp/
├── App.jsx # Entry point with global providers (context, query, nav)

├── AppNavigator/ # Tab-based navigator with stack navigators

├── HomeScreen/ # Screens: services, cart, checkout, search

├── OrderScreen/ # Screens: order tracking, ratings, chat

├── AccountSettings/ # Screens: profile, logout, notifications, payments

├── Request/ # Screens: service request creation and flow

├── auth/ # Login, Sign-up

├── onboarding/ # Splash, Welcome, Starter screens

├── shared/Components/ # Reusable UI: buttons, loaders, form inputs

├── locales/ # i18next translation files (Arabic & English) (underdevelopment)

├── CartContext.jsx # Cart state with helper actions

├── RootNavigator.jsx # Onboarding/Auth routing

├── ChatBot.js # Placeholder for future AI assistant


---

## Navigation Structure

Navigation is powered by **React Navigation v6**, organized as:

- `RootNavigator.jsx`: splash, onboarding, auth flow
- `AppNavigator.jsx`: main tab navigator after login
  - `HomeAndRequestNavigator.jsx`
  - `OrderNavigator.jsx`
  - `AccountNavigator.jsx`
  - `ChatBot.js` (placeholder for AI assistant)

---

## Internationalization

- Language setup with **i18next** + `react-native-localize`
- English + Arabic support
- Auto-detection of device language
- Resources stored in `/locales/`

---

## Technologies Used

- **React Native (Expo)**
- **React Navigation v6**
- **React Query**
- **React Context API**
- **i18next + react-native-localize**
- **Axios**
- **AsyncStorage**
- **Vector Icons (Ionicons)**
- **SafeAreaContext**
- **React Native Reanimated**
- **Formik + Yup** (if applicable in forms)
- **Jest** (`jestSetup.js` ready for testing)

---

## Testing & Reliability

- Global error boundaries using `AppErrorBoundary.jsx`
- Basic unit test setup included with Jest (`jestSetup.js`)
- Modular screens and reusable components for easy testing

---

## How to Run the App

```bash
git clone https://github.com/7mdz9/Frontend-app.git
cd Frontend-app/ClientAppx/ClientApp
npm install
npx expo start
```
## Run on Mobile (Expo Go)
Press s to switch to Expo Go mode (in the terminal)

Open the Expo Go app on your iOS or Android device

Scan the QR code displayed in the terminal or browser

Alternatively, click “Run in Expo Go” from the Expo DevTools browser interface

## Notes
Optimized for iOS, but compatible with Android

Features like AI agent, push notifications, and real backend integration are under development

Final production deployment and infrastructure are managed in a private environment








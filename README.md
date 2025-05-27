# Frontend-app

This is a near production-grade frontend of a real AI-powered startup app, Oosal — co-founded and developed by the author. For confidentiality reasons, this repository does not include the most recent production code. The app supports dynamic service ordering, curated company listings, user interaction flows, and end-to-end frontend infrastructure. The AI chatbot integration is currently in development and represented by placeholder components in this version.

## Overview

This project is the frontend for a service marketplace app that allows users to:
- Browse categorized service providers (e.g., Home Services, Electronics)
- Submit standard or custom service orders
- Add services to a cart and proceed to checkout
- Communicate via a unified order/request screen
- Manage profiles and preferences

Built using **React Native + Expo**, the app emphasizes modular design, performance, and scalability.

## Features

- **Service Types**: Supports both fixed-price orders and request-based negotiations
- **Navigation**: Structured routing with dynamic screen rendering
- **Cart & Checkout**: Add, modify, and process service selections
- **Account Management**: User settings, profile, and preferences
- **Request Flow**: Draft requests, attach notes, and manage negotiation steps
- **Optimized UI**: Responsive design, custom icons, and theming

## Architecture

/components → Reusable UI components
/screens → Core screen layouts (Home, Request, Orders, Account)
/api → Axios service wrappers
/assets → Images and static assets
/utils → Helpers, formatters, constants
/navigation → React Navigation stack and tabs


- **Modular and scalable**
- Clean separation of UI, logic, and API calls
- React Navigation v6 with nested stacks
- AsyncStorage for local persistence

## Technologies Used

- React Native (Expo)
- React Navigation
- AsyncStorage
- Axios
- Vector Icons (Ionicons)
- SafeAreaContext
- React Native Reanimated

# Imperial Suplementos - Loyalty App

## Project Overview
React Native loyalty app for Imperial Suplementos customers. Features points, cashback, tier system (Bronze/Prata/Ouro/Elite), rewards, subscriptions, and referral program.

## Recent Changes
- 2025-10-25: Initial project setup with Expo + TypeScript
- All dependencies installed (React Navigation, React Query, Zustand, NativeWind)
- Mock API architecture for demo

## Tech Stack
- **Framework**: Expo (latest SDK), React Native, TypeScript
- **Navigation**: React Navigation (stack + bottom tabs)
- **UI**: NativeWind (Tailwind for RN) + custom components
- **State Management**: 
  - Server state: @tanstack/react-query
  - Client state: Zustand
- **Forms**: react-hook-form + zod
- **Auth**: expo-auth-session (mock for Google/Apple)
- **Storage**: expo-secure-store (tokens), AsyncStorage (cache)
- **i18n**: i18next (pt-BR)

## Project Architecture
```
/src
  /components
    /atomic - ImperialButton, TierChip, Card, Skeleton, EmptyState, QRCodeCard
    /composite - PointsHeader, TierProgress, ProductCard, RewardCard
  /screens
    /Auth - Onboarding, Login, Register, CompleteProfile
    /Home - Dashboard with tier progress and balance
    /Wallet - History and redeem tabs
    /Rewards - Catalog and detail
    /Shop - Products by category
    /Profile - Settings and LGPD compliance
    /Referrals - Share and track invites
    /Subscriptions - Manage plans
    /Support - FAQ and contact
  /navigation - Navigation stacks and tabs
  /services - API client with React Query hooks
  /store - Zustand stores
  /mocks - JSON fixtures for demo
  /theme - Colors, spacing, Tailwind config
  /types - TypeScript definitions
  /utils - Helpers and formatters
  /i18n - Translation files
```

## Branding - Imperial
- Primary: #E10600 (vermelho Imperial)
- Secondary: #111111 (preto carvão)
- Neutrals: #1F1F1F, #2B2B2B, #ECECEC, #FFFFFF
- Style: Minimalist, sporty, premium

## Environment
- `USE_MOCKS=true` - Use local JSON fixtures instead of real API

## How to Run
```bash
npm start          # Start Expo dev server
npm run android    # Android
npm run ios        # iOS (macOS only)
npm run web        # Web
```

## Key Features
1. **Tier System**: Bronze → Prata → Ouro → Elite with progress tracking
2. **Points & Cashback**: Earn on purchases, redeem for discounts
3. **Rewards Catalog**: Exclusive products and experiences
4. **Subscriptions**: Recurring orders with bonus points
5. **Referrals**: Share unique link, earn on friend purchases
6. **LGPD Compliant**: Data download, consent management

## Mock Data Location
`/src/mocks/*.json` - me, loyalty, rewards, products, referrals, subscriptions, history

## Future Integration Points
- Replace mock services in `/src/services/api.ts` with real endpoints
- Implement real OAuth flows for Google/Apple
- Connect push notifications to backend
- Add payment processing for subscriptions

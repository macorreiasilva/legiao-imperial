# Imperial Suplementos - Loyalty App

React Native loyalty app for Imperial Suplementos customers with points, cashback, tier system, rewards, and more.

## Features

### 🎯 Core Features
- **Tier System**: Bronze → Prata → Ouro → Elite progression
- **Points & Cashback**: Earn on every purchase, track balance with expiration warnings
- **Rewards Catalog**: Redeem points for products, discounts, and experiences
- **Product Shop**: Browse products with points multiplier badges
- **Subscriptions**: Recurring orders with discounts and bonus points
- **Referral Program**: Share unique code and earn when friends purchase
- **LGPD Compliant**: Privacy controls and consent management

### 📱 Screens
- **Auth Flow**: Onboarding (3 slides) → Login
- **Home**: Dashboard with tier progress, balance, quick actions
- **Wallet**: Transaction history and redemption with QR code generation
- **Rewards**: Browse and redeem rewards catalog
- **Shop**: Product catalog by category
- **Profile**: User settings and privacy controls
- **Referrals**: Share link/QR and track invites
- **Subscriptions**: Manage recurring orders
- **Support**: FAQ, WhatsApp contact, store locations

## Tech Stack

- **Framework**: Expo (latest SDK)
- **Language**: TypeScript
- **UI**: NativeWind (Tailwind for React Native)
- **Navigation**: React Navigation (stack + tabs)
- **State**: React Query (server) + Zustand (client)
- **Forms**: react-hook-form + zod
- **i18n**: i18next (pt-BR)

## Getting Started

### Prerequisites
- Node.js 20+ installed
- Expo Go app on your phone (for testing)

### Installation

\`\`\`bash
cd imperial-loyalty-app
npm install
\`\`\`

### Running the App

\`\`\`bash
npm start
\`\`\`

Then:
- Scan the QR code with Expo Go (Android) or Camera app (iOS)
- Press `w` to open in web browser
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)

### Demo Credentials

Use these credentials to test the app:
- **Email**: demo@imperial.com
- **Password**: demo123

## Project Structure

\`\`\`
/src
  /components
    /atomic - Button, Card, Chip, QRCode, etc.
    /composite - PointsHeader, ProductCard, RewardCard
  /screens
    /Auth - Login, Onboarding
    /Home - Dashboard
    /Wallet - History & Redemption
    /Rewards - Catalog
    /Shop - Products
    /Profile - Settings
    /Referrals - Share & track
    /Subscriptions - Manage plans
    /Support - FAQ & contact
  /navigation - Navigation setup
  /services - API client (mock)
  /store - Zustand stores
  /mocks - JSON fixtures
  /theme - Colors, spacing
  /types - TypeScript definitions
  /utils - Formatters, helpers
  /i18n - Translations
\`\`\`

## Mock Data

The app currently uses mock data from \`/src/mocks/*.json\`. All API calls are simulated locally.

### Mock Files
- **me.json**: User profile (Carlos Silva, Tier Ouro)
- **loyalty.json**: Points balance with expiring lots
- **rewards.json**: 7 rewards including products and discounts
- **products.json**: 8 supplements across 5 categories
- **referrals.json**: Referral code with 3 invites
- **subscriptions.json**: 2 active subscription plans
- **history.json**: Transaction history

## Configuration

### Environment
Create a \`.env\` file if needed:
\`\`\`
USE_MOCKS=true
API_BASE_URL=https://api.imperial.local
\`\`\`

### Switching to Real API

To integrate with a real backend:

1. Update \`src/services/api.ts\`:
   - Set \`USE_MOCKS = false\`
   - Configure \`API_BASE_URL\` to your backend
   
2. Implement authentication token storage using \`expo-secure-store\`

3. Update API endpoints to match your backend contracts

## Branding

### Colors
- **Primary**: #E10600 (Imperial Red)
- **Secondary**: #111111 (Charcoal Black)
- **Neutrals**: #1F1F1F, #2B2B2B, #ECECEC, #FFFFFF

### Tier Colors
- **Bronze**: #CD7F32
- **Prata**: #C0C0C0
- **Ouro**: #FFD700
- **Elite**: #B9F2FF

## Development

### Available Scripts

\`\`\`bash
npm start          # Start Expo dev server
npm run android    # Open on Android
npm run ios        # Open on iOS
npm run web        # Open in browser
\`\`\`

### Adding New Screens

1. Create screen component in \`/src/screens/[Feature]/\`
2. Add to navigation in \`/src/navigation/AppNavigator.tsx\`
3. Update mock data if needed

### Adding New Components

1. Create in \`/src/components/atomic/\` or \`/src/components/composite/\`
2. Export from index.ts
3. Use NativeWind (className) for styling

## Future Enhancements

- [ ] Real backend API integration
- [ ] Social login (Google/Apple OAuth)
- [ ] Push notifications
- [ ] Payment processing for subscriptions
- [ ] Analytics tracking (Segment)
- [ ] E2E tests (Detox)
- [ ] Offline queue for write operations
- [ ] Product recommendations ML

## Support

For questions or issues:
- WhatsApp: [Link to support]
- Email: suporte@imperial.com
- In-app support screen

## License

Proprietary - Imperial Suplementos © 2025

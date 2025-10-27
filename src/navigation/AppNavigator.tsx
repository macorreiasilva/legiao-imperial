import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { LoginScreen } from "../screens/Auth/LoginScreen";
import { OnboardingScreen } from "../screens/Auth/OnboardingScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { ReferralsScreen } from "../screens/Referrals/ReferralsScreen";
import RewardsScreen from "../screens/Rewards/RewardsScreen";
import ShopScreen from "../screens/Shop/ShopScreen";
import { SubscriptionsScreen } from "../screens/Subscriptions/SubscriptionsScreen";
import { SupportScreen } from "../screens/Support/SupportScreen";
import { WalletScreen } from "../screens/Wallet/WalletScreen";
import { useAuthStore } from "../store/authStore";
import { useUIStore } from "../store/uiStore";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#E10600",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarLabel: "Carteira",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet" size={size} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            console.log("Doing something when tabPress");
            navigation.navigate("Wallet", { initialTab: "history" });
          },
        })}
      />

      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarLabel: "Recompensas",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gift" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarLabel: "Loja",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="store" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="AppTabs"
        component={AppTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Referrals"
        component={ReferralsScreen}
        options={{ title: "Indique & Ganhe" }}
      />
      <Stack.Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={{ title: "Assinaturas" }}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{ title: "Suporte" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Editar Perfil" }}
      />
    </Stack.Navigator>
  );
}

const AppNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isOnboardingCompleted = useUIStore(
    (state) => state.isOnboardingCompleted
  );
  const [showOnboarding, setShowOnboarding] = useState(!isOnboardingCompleted);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            {showOnboarding && (
              <Stack.Screen name="Onboarding">
                {() => (
                  <OnboardingScreen
                    onComplete={() => setShowOnboarding(false)}
                  />
                )}
              </Stack.Screen>
            )}
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={MainStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

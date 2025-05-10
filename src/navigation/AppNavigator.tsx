import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { ProfileScreen } from '../screens/dashboard/ProfileScreen';
import { SettingsScreen } from '../screens/dashboard/SettingsScreen';
import { AddMealScreen } from '../screens/food/AddMealScreen';
import { DailySummaryScreen } from '../screens/food/DailySummaryScreen';
import { AddCustomFoodScreen } from '../screens/food/AddCustomFoodScreen';
import { CustomFoodsScreen } from '../screens/food/CustomFoodsScreen';
import { useAuthStore } from '../store/authStore';
import { HomeScreen } from '../screens/HomeScreen';
import { FitnessScreen } from '../screens/FitnessScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function FoodStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DailySummary"
        component={DailySummaryScreen}
        options={{ title: 'Resumen Diario' }}
      />
      <Stack.Screen
        name="AddMeal"
        component={AddMealScreen}
        options={{ title: 'Agregar Comida' }}
      />
      <Stack.Screen
        name="AddCustomFood"
        component={AddCustomFoodScreen}
        options={{ title: 'Agregar Alimento' }}
      />
      <Stack.Screen
        name="CustomFoods"
        component={CustomFoodsScreen}
        options={{ title: 'Mis Alimentos' }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Fitness"
        component={FitnessScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="fitness-center" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
} 
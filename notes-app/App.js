import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import MainTabs from './src/navigation/MainTabs';

const STORAGE_KEY = 'notes_app_session';

export default function App() {
  const [token, setToken] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const savedToken = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedToken) {
        setToken(savedToken);
      }
    }

    loadSession();
  }, []);

  async function handleAuthSuccess(newToken) {
    setToken(newToken);
    await AsyncStorage.setItem(STORAGE_KEY, newToken);
  }

  async function handleLogout() {
    setToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {token ? (
          <MainTabs token={token} onLogout={handleLogout} />
        ) : showSignup ? (
          <SignupScreen onSignup={handleAuthSuccess} onShowLogin={() => setShowSignup(false)} />
        ) : (
          <LoginScreen onLogin={handleAuthSuccess} onShowSignup={() => setShowSignup(true)} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

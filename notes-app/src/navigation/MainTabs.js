import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotesScreen from '../screens/NotesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs({ token, onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#0d6efd',
      }}
    >
      <Tab.Screen name="Notes">
        {() => <NotesScreen token={token} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => <ProfileScreen token={token} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

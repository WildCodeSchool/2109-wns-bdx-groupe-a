import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoginSignUp from './src/components/LoginSignUp';
import Projects from './src/components/Projects';
import Tasks from './src/components/Tasks';
import Dashboard from './src/components/Dashboard';
import LoginSignIn from './src/components/LoginSignIn';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
const Tab = createBottomTabNavigator();
const DashboardStack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Projects") {
            iconName = focused ? "apps" : "apps-outline";
          } else if (route.name === "Tasks") {
            iconName = focused ? "ios-documents" : "ios-documents-outline";
          } else if (route.name === "Dashboard") {
            iconName = focused ? "speedometer" : "speedometer-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#6200EE",
        tabBarInactiveTintColor: "gray",
      })}
      >
        
        <Tab.Screen name="LoginSignIn" component={LoginSignIn} options={{tabBarItemStyle: {display: 'none'}, tabBarStyle: {display: 'none'}}} />
        <Tab.Screen name="LoginSignUp" component={LoginSignUp} options={{tabBarItemStyle: {display: 'none'}, tabBarStyle: {display: 'none'}}} />
        <Tab.Screen name="Projects" component={Projects} />
        <Tab.Screen name="Tasks" component={Tasks} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  </ApolloProvider>
    
  );
}

export default App;
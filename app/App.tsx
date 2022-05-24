import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Login from './src/components/Login';
import Projects from './src/components/Projects';
import Tasks from './src/components/Tasks';
import Dashboard from './src/components/Dashboard';
import { API_URL } from "@env"

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});
const Tab = createBottomTabNavigator();

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
        <Tab.Screen name="LogIn" component={Login} options={{tabBarItemStyle: {display: 'none'}, tabBarStyle: {display: 'none'}}} />
        <Tab.Screen name="Projects" component={Projects} />
        <Tab.Screen name="Tasks" component={Tasks} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  </ApolloProvider>
    
  );
}

export default App;
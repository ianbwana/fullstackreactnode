import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import Register from './screens/register';
import Dashboard from './screens/dashboard';


const Stack = createStackNavigator();

function MyStack() {
    return (
      <Stack.Navigator>
          <Stack.Group
    screenOptions={{ headerShown: false }}
  >
        <Stack.Screen name="Login" component={Login} options={{ swipeEnabled: false}}/>
        <Stack.Screen name="Register" component={Register} 
    options={{ swipeEnabled: false }} />
        <Stack.Screen name="Profile" component={Dashboard} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }

  export default MyStack;
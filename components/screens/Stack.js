import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../../pages/authentication/login';
import Register from '../../pages/authentication/register';
import AccountCreated from '../../pages/authentication/changedPassword';
import Drawer from './drawer/Drawer';
import TabScreen from './Tab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Members from '../../pages/drawer/members';
import SubmiTask from '../../pages/others/submiTask';
import ConfirmCode from '../../pages/authentication/confirmCode';
import SetNewPassword from '../../pages/authentication/setNewPassword';
import ChangedPassword from '../../pages/authentication/changedPassword';


const StackScreen =createStackNavigator()
const Tab = createBottomTabNavigator();

export default function Stack() {
  return (
    // <NavigationContainer>
      <StackScreen.Navigator screenOptions={{headerShown:false}} >
          <StackScreen.Screen name='login' component={Login}/>
          <StackScreen.Screen  name='register' component={Register}/>
          <StackScreen.Screen  name='changedPassword' component={ChangedPassword}/>
          <StackScreen.Screen name='members' component={Members}/>
          <StackScreen.Screen name='submitTask' component={SubmiTask}/>
          <StackScreen.Screen name='confirmCode' component={ConfirmCode}/>
          <StackScreen.Screen name='setNewPassword' component={SetNewPassword}/>
          <StackScreen.Screen name='dashboard' component={Drawer}/>
              {/* {()=>(TabScreen)

              }
          </StackScreen.Screen> */}
            
      </StackScreen.Navigator>
  )
}
import { View, Text } from 'react-native'
import React from 'react'
import CustomDrawerList from '.';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabScreen from '../Tab';


const DrawerScreen = createDrawerNavigator();

export default function Drawer(props) {
  return (
    <DrawerScreen.Navigator  initialRouteName='HomeScreen' 
    drawerContent={props => <CustomDrawerList {...props} />} >
      <DrawerScreen.Screen 
              name="HomeScreen"  
              component={TabScreen} 
            />
  
  </DrawerScreen.Navigator>
  )
}
import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons'
import tw from 'tailwind-react-native-classnames';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Home from '../../pages/tabbed/Home';
import Task from '../../pages/tabbed/task';
import HPM from '../../pages/tabbed/hpm';
// import Home from '../../pages/tabbed/Home';


const Chat=()=>{
    return(
        <Text>Home</Text>
    )
}
const MyAccount=()=>{
    return(
      <View style={tw`h-full my-auto text-center w-full`}>
          <View style={tw`m-auto`}>
          <MaterialIcon style={tw`text-gray-400 text-center py-3`} name='airplanemode-inactive' size={40}/>
          <Text style={tw`  text-center`}>Page Not Available Yet</Text>
          </View>
        </View>
    )
}
const Members=()=>{
    return(
        <Text>Home</Text>
    )
}

const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <Tab.Navigator  backBehavior='' 
    screenOptions={
      {headerShown:false, tabBarShowLabel:true,
      tabBarActiveTintColor:'#053B8D', 
      tabBarInactiveTintColor:'#C4C4C4',
      tabBarStyle:{
        shadowColor:'#fff'
      }
      } } >

        <Tab.Screen name='Home' 
        component={Home} 
        options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicon name="home" size={23} color={color}  />
        ),
      }}/>

      <Tab.Screen name='tasks' 
        component={Task} 
        options={{
        tabBarLabel: 'Tasks',
        tabBarIcon: ({ color, size }) => (
          <Ionicon name="ios-calendar" size={23} color={color}  />
        ),
      }}/>
      
      <Tab.Screen name='account' 
        component={MyAccount} 
        options={{
        tabBarLabel: 'Messages',
        tabBarIcon: ({ color, size }) => (
          <Ionicon name="chatbubbles" size={23} color={color}  />
        ),
      }}/>

      <Tab.Screen name='hpm' 
        component={HPM} 
        options={{
        tabBarLabel: 'HPM',
        tabBarIcon: ({ color, size }) => (
          <Ionicon name="ios-stats-chart" size={25} color={color}  />
        ),
      }}/>
      

  </Tab.Navigator>
  )
}
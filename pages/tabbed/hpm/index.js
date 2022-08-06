import { View, SafeAreaView, ScrollView, StatusBar, Platform,Text } from 'react-native'
import React, {useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { createStackNavigator } from '@react-navigation/stack';

import DueCard from '../../../components/card/dueCard'
import IconCard from '../../../components/card/iconCard'
import TobBar from '../../../components/helpers/topbar'
import TabbedButton from '../../../components/button/TabbedButton'
import individualTeam from './individualTeam'
import Individual from './individual'
import Team from './team'
 

const Stack = createStackNavigator();

export default function HPM({navigation}) {

  const [selected, setSelected] = useState(0)

  const handletabPress =(index, to)=>{
    setSelected(index)
    navigation.navigate(to)
  }

  return (
    <SafeAreaView style={tw`h-full`}>
        {Platform.OS == 'android'?
        <StatusBar/>:<></>    
    }

    <TobBar
        body={
            <View style={tw`flex-row justify-between px-2 py-3 bg-gray-100`}>
                <Ionicon name='md-chevron-back' onPress={()=>navigation.navigate('Home')} size={23} />
                <Text style={tw`font-bold`}>My Dashboard</Text>
                <Ionicon name='md-notifications' size={20} />

            </View>
        }
    />
    <View >
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={tw`flex-row  px-4 mb-1`}>
        <View style={tw`mr-4`}>
          <TabbedButton text='My  Performance' index={0} selected={selected} pressed={()=>handletabPress(0, 'individual-perf')}/>
        </View>
        <View style={tw`mr-4`}>
          <TabbedButton text='Team Performance' index={1} selected={selected} pressed={()=>handletabPress(1, 'team-perf')} />
        </View>
        <View style={tw`mr-10`}>
          <TabbedButton text='Individual Team Performance' index={2} selected={selected} pressed={()=>handletabPress(2, 'individualTeam-perf')}/>
        </View>
    </ScrollView>
    </View>
    {/* <View style={tw`h-20`}> */}
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='individual'>
        <Stack.Screen name='individual-perf' component={Individual} />
        <Stack.Screen name='team-perf' component={Team} />
        <Stack.Screen name='individualTeam-perf' component={individualTeam} />
      </Stack.Navigator>
          
    </SafeAreaView>
  )
}
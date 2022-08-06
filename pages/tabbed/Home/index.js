import { View, SafeAreaView, ScrollView, BackHandler, Alert, StatusBar, Platform,Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { createStackNavigator } from '@react-navigation/stack';
import localStorage from 'react-native-sync-localstorage'

import DueCard from '../../../components/card/dueCard'
import IconCard from '../../../components/card/iconCard'
import TobBar from '../../../components/helpers/topbar'
import TabbedButton from '../../../components/button/TabbedButton'
import Corporate from './corporate'
import Individual from './individual'
import Team from './team'
 

const Stack = createStackNavigator();

export default function Home({navigation}) {

  const [selected, setSelected] = useState(0)

  const handletabPress =(index, to)=>{
    setSelected(index)
    navigation.navigate(to)
  }

    useEffect(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go Exit this app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);
  
// console.log(localStorage.getItem('userInfo').role[0])
  return (
    <SafeAreaView style={tw`h-full`}>
        {Platform.OS == 'android'?
        <StatusBar/>:<></>    
    }

    <TobBar
        body={
            <View style={tw`flex-row justify-between px-2 py-3 bg-gray-100`}>
                <Ionicon name='menu' onPress={()=>navigation.toggleDrawer()} size={23} />
                <Text style={tw`font-bold`}>{localStorage.getItem('first_name')} Dashboard</Text>
                <Ionicon name='md-notifications' size={20} />
            </View>
        }
    />

    <View style={tw`flex-row justify-between px-4 mb-1`}>
      <TabbedButton text='Individual' index={0} selected={selected} pressed={()=>handletabPress(0, 'individual')}/>
      { localStorage.getItem('user_role') !='team_lead' && localStorage.getItem('user_role') !='admin'?<></>:
      <View style={tw`flex-row justify-between w-6/12`}>
      <TabbedButton text='Team' index={1} selected={selected} pressed={()=>handletabPress(1, 'team')} />
      <TabbedButton text='Corporate' index={2} selected={selected} pressed={()=>handletabPress(2, 'corporate')}/>
      </View>
    }</View>
    {/* <View style={tw`h-20`}> */}
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='individual'>
        <Stack.Screen name='individual' component={Individual} />
        { localStorage.getItem('user_role') !='team_lead' && localStorage.getItem('user_role') !='admin'?<></>:
        <Stack.Screen name='team' component={Team} />}
        { localStorage.getItem('user_role') !='team_lead' && localStorage.getItem('user_role') !='admin'?<></>:
        <Stack.Screen name='corporate' component={Corporate} />}
      </Stack.Navigator>
<Text style={tw`text-red-900`}>{localStorage.getItem('userInfo'.email)}</Text>

    {/* </View> */}

    {/* <Search /> */}
    {/* <ScrollView style={tw`px-4`}>
        <Text style={tw`mt-1 font-bold`}>Directory</Text>
        <View style={tw`flex-row justify-between px-1 my-3`}>
          <IconCard
            bg='bg-green-50'
            icon={<Ionicon name='people' size={20} style={tw`bg-red-50 p-2 text-green-400 my-auto rounded-full`} />}
            amount={20}
            description=' Members'
          />

          <IconCard
            bg='bg-red-50'
            icon={<Ionicon name='calendar' size={20} style={tw`bg-red-50 p-2 text-pink-400  my-auto rounded-full`} />}
            amount={30}
            description='Events'
          />
          
        </View>
        
        <View style={tw`flex-row justify-between px-1 my-3`}>
          <IconCard
            bg='bg-blue-50'
            // icon={<Ionicon name='person' size={18} style={tw`bg-red-50 p-2 text-blue-400 my-auto rounded-full`} />}
            amount={20}
            description='Committee Members'
          />

          <IconCard
            bg='bg-blue-100'
            icon={<MaterialIcon name='groups' size={22} style={tw`bg-gray-100 p-2 text-blue-500 my-auto rounded-full`} />}
            amount={30}
            description='Exco Members'
          />
          
        </View>

        <View style={tw`pt-3`}>
          <Text style={tw`font-bold text-base`}>Dues</Text>
        </View>
        <View style={tw` justify-between px-1 my-3`}>
          <DueCard
            bg='bg-blue-500'
            icon={<Ionicon name='person' size={20} style={tw`bg-pink-50 p-2  my-auto rounded-full`} />}
            amount='200,000'
            color='text-white'
            description='Total Income'
          />
          <View style={tw`h-2`}></View>
          <DueCard
            bg='bg-blue-100'
            icon={<MaterialIcon name='groups' size={22} style={tw`bg-gray-50 p-2  my-auto rounded-full`} />}
            amount='398,000'
            color='text-blue-700'
            description='Total Outstanding'
          />
          
        </View>
        


    </ScrollView> */}
      
    </SafeAreaView>
  )
}
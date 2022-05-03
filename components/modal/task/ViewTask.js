import React,  {useState} from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Ionicon from 'react-native-vector-icons/Ionicons';

import BasicInfo from './Basic Info';
import Target from './Target';
import TabbedButton from '../../button/TabbedButton';



// const Stack = createStackNavigator()

export default function ViewTask(props) {
const [visible, setVisible] = useState(true)
const [selected, setSelected] = useState(0)


console.log(props.details)
  return (
    <View style={tw`m-auto bg-white rounded-xl w-full`}>
        <View style={tw`w-10/12 flex-row justify-end mr-7`}>
            <Ionicon onPress={()=>props.setVisible(false)} name='close' style={tw` m-2 bg-red-800 p-1.5 text-white rounded-full text-right`}/>
        </View>
        <View style={tw`flex-row mx-5 mb-3`}>
            <View style={tw`mx-4`}>
                <TabbedButton text='Basic Info' pressed={()=>setSelected(0)} index={0} selected={selected}/>
            </View>
            <View style={tw`mx-4`}>
                <TabbedButton text='Target Info' pressed={()=>setSelected(1)} index={1} selected={selected}/>
            </View>
            
        </View>
        {/* <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='individual'>
            <Stack.Screen name='basic' componen h=5/6t={BasicInfo}/>
            <Stack.Screen name='target' component={Target}/>
        </Stack.Navigator> */}
        {/* <Text>Yooh</Text> */}
        
        { selected ==0 ?
            <BasicInfo details={props.details} />
            :
            <Target details={props.details}/>
        }
    </View>
            
  );
}

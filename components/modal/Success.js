import React,  {useState} from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons' 
import RoundedButton from '../button/RoundedButton';

export default function Success(props) {
const [visible, setVisible] = useState(true)
const navigation = useNavigation()

const cancel=()=>{
    // navigation.goBack()
    navigation.navigate(props.to)
    props.setVisible(false)
}

const logout=()=>{
    // navigation.goBack()
    navigation.navigate('login')
    props.setVisible(false)
}
  return (
    
            <View style={tw`m-auto bg-white rounded-xl w-9/12`}>
                <View style={tw`${props.bgColor} rounded-t-lg  `}>
                    <Ionicon name='md-paper-plane' style={tw`mx-auto mt-6 mb-2`} size={40} color='white'/>
                    <Text style={tw`font-bold text-base text-center text-white pb-3`}>{props.title}</Text>
                </View>
                <Text style={tw`px-5 text-center py-3 text-gray-700`}>{props.body}</Text>
                <View style={tw`px-5 flex-row mb-4 justify-around `}>
                    {/* <View style={tw`w-5/12`}>
                        <RoundedButton text='Logout' pressed={()=>logout()}/>
                    </View> */}
                    <Pressable style={tw`bg-blue-50 px-3 py-1.5 rounded-lg my-2`} onPress={()=>cancel()}>
                        <Text style={tw`my-auto text-base`}>OK</Text>
                    </Pressable>
                </View>
            </View>
  );
}

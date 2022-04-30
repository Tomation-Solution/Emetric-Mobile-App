import React,  {useState} from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons'

export default function ViewSubmittedTask(props) {
const [visible, setVisible] = useState(true)
const navigation = useNavigation()

const cancel=()=>{
    // navigation.goBack()
    navigation.navigate('HomeScreen')
    props.setVisible(false)
}

const logout=()=>{
    // navigation.goBack()
    navigation.navigate('login')
    props.setVisible(false)
}
  return (
    
            <View style={tw`m-auto  py-2 bg-white rounded-xl w-11/12`}>
                <View style={tw`w-full flex-row justify-end`}>
                    <Ionicon onPress={()=>props.setVisible(false)} name='close' style={tw` m-2 bg-red-800 p-1.5 text-white rounded-full text-right`}/>
                </View>
                
                
                <View style={tw`border-b border-blue-300 mb-3 mx-5`}>
                    <Text style={tw`font-bold text-sm  text-blue-800`}>Task Name</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui, urna arcu elementum sed ut gravida adipiscing proin. Arcu, ullamcorper dictum sed id euismod vitae.</Text>
                </View>

                <View style={tw`mx-5 my-2`}>
                    <Text style={tw`font-bold text-sm  text-blue-800`}>Task Type</Text>
                    <Text style={tw`px-1  py-2 text-gray-700`}>Quantitative</Text>
                </View>
               
                <View style={tw`flex-row mx-5 justify-between`}>
                    <View>
                        <Text style={tw`font-bold text-sm  text-blue-800`}>Qty Achieved</Text>
                        <Text style={tw`px-1  py-2 text-gray-700`}>2</Text>
                    </View>
                    <View>
                        <Text style={tw`font-bold text-sm  text-blue-800`}>Rework Limits</Text>
                        <Text style={tw`px-1  py-2 text-gray-700`}>2</Text>
                    </View>
                </View>    
                <View style={tw`mx-5 mt-2`}>
                    <Text style={tw`font-bold text-sm  text-blue-800`}>Submission Time Track</Text>
                    <Text style={tw`px-1  py-2 text-gray-700`}>00:25:00</Text>
                </View>
               
            </View>
  );
}

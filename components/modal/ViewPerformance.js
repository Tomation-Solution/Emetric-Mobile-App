import React,  {useState} from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons'

export default function ViewPerformance(props) {
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
    
            <View style={tw`m-auto bg-white rounded-xl w-10/12`}>
                <View style={tw`w-full flex-row justify-end`}>
                    <Ionicon onPress={()=>props.setVisible(false)} name='close' style={tw` m-2 bg-red-800 p-1.5 text-white rounded-full text-right`}/>
                </View>
                <View style={tw`border-b border-blue-300 mb-3 mx-5`}>
                    <Text style={tw`font-bold text-sm  text-blue-800`}>Task Name</Text>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui, urna arcu elementum sed ut gravida adipiscing proin. Arcu, ullamcorper dictum sed id euismod vitae.</Text>
                </View>
                <View style={tw`px-5 flex-row  justify-between mb-4 `}>
                    <View style={tw`w-5/12`}>
                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>Qly Point</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>2</Text>
                        </>
                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>Qty Point</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>2</Text>
                        </>

                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>TAT Point</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>2</Text>
                        </>

                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>Total Points</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>2</Text>
                        </>
                    </View>
                    
                    <View style={tw`w-5/12`}>
                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>Qly Point Achieved</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>2</Text>
                        </>
                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>Qty Point Achieved</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>2</Text>
                        </>

                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>TAT Point Achieved</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>2</Text>
                        </>

                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>Total Points Achieved</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>2</Text>
                        </>
                    </View>
                </View>
                <View style={tw`mx-5`}>
                    <Text style={tw`font-bold text-sm  text-blue-800`}>Percentage Cummulative Points Achieved </Text>
                    <Text style={tw`px-1  py-3 text-gray-700`}>2</Text>
                </View>
            </View>
  );
}

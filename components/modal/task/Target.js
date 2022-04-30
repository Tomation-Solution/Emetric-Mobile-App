import React,  {useState} from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons'

export default function Target(props) {
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
                
                <View style={tw`px-2 justify-between mb-4 `}>
              
                        <View style={tw`flex-row my-2 justify-between`}>
                            <Text style={tw`font-bold text-sm my-auto text-blue-800`}>Quantity Target Unit</Text>
                            <Text style={tw`px-1  mx-5  text-gray-700 my-auto`}>2</Text>
                        </View>

                        <View style={tw`flex-row my-2 justify-between`}>
                            <Text style={tw`font-bold text-sm my-auto text-blue-800`}>Turnaround Time Score Target</Text>
                            <Text style={tw`px-1  mx-5  text-gray-700 my-auto`}>2</Text>
                        </View>

                        <View style={tw`flex-row my-2 justify-between`}>
                            <Text style={tw`font-bold text-sm my-auto text-blue-800`}>Quantity Target Unit Achieved</Text>
                            <Text style={tw`px-1  mx-5  text-gray-700 my-auto`}>2</Text>
                        </View>

                        <View style={tw`flex-row my-2 justify-between`}>
                            <Text style={tw`font-bold text-sm my-auto text-blue-800`}>Quantity Target Point Achieved </Text>
                            <Text style={tw`px-1  mx-5  text-gray-700 my-auto`}>2</Text>
                        </View>

                        <View style={tw`flex-row my-2 justify-between`}>
                            <Text style={tw`font-bold text-sm my-auto text-blue-800`}>Quality Target Unit </Text>
                            <Text style={tw`px-1  mx-5  text-gray-700 my-auto`}>2</Text>
                        </View>

                        <View style={tw`flex-row my-2 justify-between`}>
                            <Text style={tw`font-bold text-sm my-auto text-blue-800`}>Target Point Achieved  </Text>
                            <Text style={tw`px-1  mx-5  text-gray-700 my-auto`}>2</Text>
                        </View>

                        <View style={tw`flex-row my-2 justify-between`}>
                            <Text style={tw`font-bold text-sm my-auto text-blue-800`}>Turn Around Time  Target Point </Text>
                            <Text style={tw`px-1  mx-5  text-gray-700 my-auto`}>2</Text>
                        </View>

                        <View style={tw`flex-row my-2 justify-between`}>
                            <Text style={tw`font-bold text-sm my-auto text-blue-800`}>Turn Around Time  Target Point Achieved</Text>
                            <Text style={tw`px-1  mx-5  text-gray-700 my-auto`}>2</Text>
                        </View>
                       
                    </View>
               
            </View>
  );
}

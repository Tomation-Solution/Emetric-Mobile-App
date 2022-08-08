import React,  {useState} from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons'

export default function BasicInfo(props) {
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
    
            <View style={tw`m-auto bg-white rounded-xl w-11/12`}>
                {/* <View style={tw`w-full flex-row justify-end`}>
                    <Ionicon onPress={()=>props.setVisible(false)} name='close' style={tw` m-2 bg-red-800 p-1.5 text-white rounded-full text-right`}/>
                </View> */}
                
                <View style={tw`px-3 flex-row  justify-between mb-2 `}>
                    <View style={tw`w-6/12`}>
                        <Text style={tw`font-bold text-sm  text-blue-800`}>Owner/ Team</Text>
                        <Text style={tw`px-1  py-2 text-gray-700`}>{props.details?.upline_initiative.owner.email}</Text>
                    </View>
                    <View style={tw`w-6/12`}>
                        <Text style={tw`font-bold text-sm  text-blue-800`}>Task Assignor</Text>
                        <Text style={tw`px-1  py-2 text-gray-700`}>{props.details?.upline_initiative.asignor ? props.details.upline_initiative.asignor.email:'None'}</Text>
                    </View>
                    {/* </View> */}
                </View>
                <View style={tw`border-b border-blue-300 mb-3 mx-5`}>
                    <Text style={tw`font-bold text-sm  text-blue-800`}>KPI/ Initiative</Text>
                    <Text>{props.details?.upline_initiative?.name}</Text>
                </View>
                <View style={tw`px-5 flex-row  justify-between mb-4 `}>
                    <View style={tw`w-5/12`}>
                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>Objective Type</Text>
                            <Text style={tw`px-1  py-2 text-gray-700`}>{props.details?.task_type}</Text>
                        </>
                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>Routine Option</Text>
                            <Text style={tw`px-1  py-2 text-gray-700`}>{props.details?.routine_option}</Text>
                        </>

                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>Rework Options</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>{props.details?.rework_limit}</Text>
                        </>

                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>Start Date & Time</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>{props.details?.start_date +' '+props.details?.start_time}</Text>
                        </>
                    </View>
                    
                    <View style={tw`w-5/12`}>
                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>Department</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>None</Text>
                        </>
                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>Duration</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>{props.details?.duration}</Text>
                        </>

                        <>
                            <Text style={tw`font-bold text-sm  text-blue-800`}>End Time</Text>
                            <Text style={tw`px-1  py-3 text-gray-700`}>{props.details?.end_date}</Text>
                        </>

                       
                    </View>
                </View>
               
            </View>
  );
}

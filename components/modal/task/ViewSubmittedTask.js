import React,  {useState} from 'react';
import { View, Text, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons'
import RoundedButton from '../../button/RoundedButton';
import ModalTemplate from '..';

export default function ViewSubmittedTask(props) {
const [visible, setVisible] = useState(true)
const navigation = useNavigation()
const [showFIle, setShowFile] = useState(false)

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
const handleView =()=>{
    setShowFile(true)
    // alert(props.subDetails.map(e=>e.submission).split('.'))

}

console.log(props.subDetails.map(e=>e.submission))
  return (

            <View style={tw`m-auto  py-2 bg-white rounded-xl w-10/12`}>
                <ModalTemplate
                    visible={showFIle}
                    
                    body={
                    <View style={tw`h-5/6 w-10/12 rounded-lg mx-auto bg-white my-auto`}>
                        <Ionicon onPress={()=>setShowFile(false)} name='close' style={tw`h-6 w-6 text-center text-white text-base rounded-lg bg-red-800`}/>

                        {/* <ScrollView style={tw`hw-full bg-white`}>  */}
                         <WebView
                            bounces={false}
                            scrollEnabled={true} 
                            source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }} />
                        {/* </ScrollView> */}
                    </View>}
                />
                <View style={tw`w-full flex-row justify-end`}>
                    <Ionicon onPress={()=>props.setVisible(false)} name='close' style={tw` m-2 bg-red-800 p-1.5 text-white rounded-full text-right`}/>
                </View>
                
                
                <View style={tw`border-b border-blue-300 mb-3 mx-5`}>
                    <Text style={tw`font-bold text-sm  text-blue-800`}>Task Name</Text>
                    <Text>{props.details.name}</Text>
                </View>

                <View style={tw`mx-5 my-2`}>
                    <Text style={tw`font-bold text-sm  text-blue-800`}>Task Type</Text>
                    <Text style={tw`px-1  py-2 text-gray-700`}>{props.details.task_type}</Text>
                </View>
               
                <View style={tw`flex-row mx-5 justify-between`}>
                    <View>
                        <Text style={tw`font-bold text-sm  text-blue-800`}>Qty Achieved</Text>
                        <Text style={tw`px-1  py-2 text-gray-700`}>{props.subDetails.map(e=>e.quantity_target_unit_achieved)}</Text>
                    </View>
                    <View>
                        <Text style={tw`font-bold text-sm  text-blue-800`}>Rework Limits</Text>
                        <Text style={tw`px-1  py-2 text-gray-700`}>{props.details.rework_limit}</Text>
                    </View>
                </View>    
                <View style={tw`mx-5 mt-2`}>
                    <Text style={tw`font-bold text-sm  text-blue-800`}>Submission Time Track</Text>
                    <Text style={tw`px-1  py-2 text-gray-700`}>{props.subDetails.map(e=>e.created)}</Text>
                </View>
            
               { props.subDetails.map(e=>e.submission)?
                <View style={tw`mx-5 mt-2`}>
                    <RoundedButton text='Submitted File' pressed={()=>handleView()}/>
                    {/* <Text style={tw`font-bold text-sm  text-blue-800`}>Submission Time Track</Text>
                    <Text style={tw`px-1  py-2 text-gray-700`}>{props.subDetails.map(e=>e.created)}</Text> */}
                </View>:<></>}

               
            </View>
  );
}

import React,  {useState} from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import Ionicon from 'react-native-vector-icons/Ionicons'


import RoundedButton from '../../button/RoundedButton';
import Input from '../../helpers/Input';
import { Checkbox, TextInput } from 'react-native-paper';


export default function Rate(props) {
const [visible, setVisible] = useState(true)
const [action, setAction] = useState(0)
const navigation = useNavigation()
const [document, setDocument] =useState(null)
const [adopt, setAdopt] = useState(false)
   
const _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
        if(!result.cancelled){
            setDocument(result.uri)
        }
	}
const handleAction=(id)=>{
    if(id==1){
        setAction(id)
        setAdopt(true)
    }else{
        setAction(id)
        setAdopt(false)
    }
}

const cancel=()=>{
    // navigation.goBack()
    // navigation.navigate('login')
    props.setVisible(false)
}

  return (
        action == 0 ?
            <View style={tw`m-auto bg-white rounded-xl w-9/12`}>
                <View style={tw`border-b border-green-300 my-3 mx-5`}>
                    <Text style={tw`font-bold text-sm text-center py-3 text-blue-800`}>Are you adopting submittted file?</Text>
                </View>
                <Text style={tw`px-5 text-center py-3 text-gray-700 `}>Are you adopting submittted file (report) as the final copy for report generation?</Text>
                <View style={tw`px-5 flex-row mb-4 justify-around `}>
                    <Pressable style={tw`bg-blue-100 h-10 w-5/12 my-auto rounded-xl`} onPress={()=>handleAction(2)}>
                        <Text style={tw`my-auto text-center`}>No</Text>
                    </Pressable>
                    <View style={tw`w-5/12`}>
                        <RoundedButton text='Yes' pressed={()=>handleAction(1)}/>
                    </View>
                    
                </View>
            </View>:
            <View style={tw`m-auto bg-white rounded-xl w-9/12 px-4`}>
            <View style={tw`border-b border-green-300 my-3 mx-5`}>
                <Text style={tw`font-bold text-base text-center py-3 text-blue-800`}>Rate Task</Text>
                {/* <TouchableOpacity onPress={()=>cancel()} style={tw`w-10/12 flex-row justify-end`}>
                    <Ionicon name='close' style={tw` m-2 bg-red-800 p-1.5 my-auto text-center text-white rounded-full text-right`}/>
                </TouchableOpacity>     */}
            </View>
            <Input label='Enter rate score (QLY)'/>
           { adopt ? <></> : 
            <View style={tw`my-3 `}>
                <Text style={tw`px-2 text-gray-700 font-bold pb-1.5 my-auto`}>Upload Correct File</Text>
                {/* <TextInput  /> */}
                <Pressable onPress={()=>_pickDocument()} style={tw`bg-blue-50 rounded-xl flex-row w-full h-9`}>
                    <Pressable style={tw`w-4/12 p-1 my-auto mx-1 rounded-md bg-gray-400`} >
                        <Text>Choose File</Text>
                    </Pressable>
                    <Text style={tw`my-auto text-gray-500`}>{document ? document: 'No file Chosen'}</Text>
                </Pressable>
            </View>}

            <Input label='Remark' multiline={true} />
            
            <View style={tw`flex-row my-3 `}>
                <Checkbox onPress={()=>setAdopt(!adopt)} status={adopt? 'checked' : 'unchecked'} style={tw`my-auto`}/>
                <Text onPress={()=>setAdopt(!adopt)} style={tw`px-2 text-gray-700 my-auto`}>Adopt submitted file</Text>
            </View>
            <View style={tw`px-5 flex-row mb-4 justify-around `}>
                <Pressable style={tw`bg-blue-100 h-10 w-5/12 my-auto rounded-xl`} onPress={()=>cancel()}>
                    <Text style={tw`my-auto text-center`}>Close</Text>
                </Pressable>
                <View style={tw`w-5/12`}>
                    <RoundedButton text='Submit' pressed={()=>cancel()}/>
                </View>
                
            </View>
        </View>
  );
}

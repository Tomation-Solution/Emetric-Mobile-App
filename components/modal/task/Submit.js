import React,  {useState} from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import Ionicon from 'react-native-vector-icons/Ionicons'
import * as FileSystem from 'expo-file-system';

import RoundedButton from '../../button/RoundedButton';
import Input from '../../helpers/Input';
import { Checkbox, Snackbar, TextInput } from 'react-native-paper';
import { SubmitTask } from '../../../actions/actions';


export default function Submit(props) {
const [visible, setVisible] = useState(true)
const [action, setAction] = useState(0)
const navigation = useNavigation()
// const [document, setDocument] =useState(null)
const [qauntityAcheived, setQuantityAccheived] =useState(null)
const [document, setDocument] =useState(null)
const [adopt, setAdopt] = useState(false)
const [uploadResult, setUploadResult] = useState(null)
   
const _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
        if(!result.cancelled){
            setDocument(result.uri)
            setUploadResult(result)
            console.log(result.uri.split('/').pop())
        }
	}

const handleSnack=(id)=>{
    if(id==1){
        cancel()
        props.setshowToast(true)
        
    }else{
        cancel()
        props.setshowToast(true)
        
    }
}

const cancel=()=>{
    // navigation.goBack()
    // navigation.navigate('login')
    props.setVisible(false)
}

const callback =(res)=>{
    console.log(res)
    handleSnack(1)
}
// console.log(props.details)

    const config={
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

// console.log(uploadResult)

//     let formData = new FormData();
//     // formData.append('quantity_target_unit_achieved',qauntityAcheived)
//     // formData.append('submission',document)
//     if(uploadResult){
//     formData.append('submission',{uri: document, name: document.split('/').pop(), type:uploadResult.mimeType.split('/')[1] });
//   }
//   formData.append('task[task_id]', props.id)

    const Submit=()=>{
        let formData = new FormData();
    if(qauntityAcheived){    
    formData.append('quantity_target_unit_achieved',qauntityAcheived)}
    // formData.append('submission',document)
    if(uploadResult){
    formData.append('submission',{uri: document, name: document.split('/').pop(), type:uploadResult.mimeType });
  }
  formData.append('task[task_id]', props.id)
        
        SubmitTask(formData,callback,config)
}

  return (
        
            <View style={tw`m-auto bg-white rounded-xl w-9/12 px-4`}>
                
            <View style={tw`border-b border-green-300 my-3 mx-5`}>
                <Text style={tw`font-bold text-base text-center py-3 text-blue-800`}>Submit Task</Text>
                {/* <TouchableOpacity onPress={()=>cancel()} style={tw`w-10/12 flex-row justify-end`}>
                    <Ionicon name='close' style={tw` m-2 bg-red-800 p-1.5 my-auto text-center text-white rounded-full text-right`}/>
                </TouchableOpacity>     */}
            </View>
            { props.details.task_type == 'quantitative' ?<></> :
            <Input label='Qty Unit Achieved' setValue={setQuantityAccheived}/>
           }
           { adopt ? <></> : 
            <View style={tw`my-3 `}>
                <Text style={tw`px-2 text-gray-700 font-bold pb-1.5 my-auto`}>Upload Correct File</Text>
                {/* <TextInput  /> */}
                <Pressable onPress={()=>_pickDocument()} style={tw`bg-blue-50 rounded-xl flex-row w-full h-9`}>
                    <Pressable style={tw`w-4/12 p-1 my-auto mx-1 rounded-md bg-gray-400`} >
                        <Text>Choose File</Text>
                    </Pressable>
                    <Text style={tw`my-auto text-gray-500 w-7/12`}>{document ? document: 'No file Chosen'}</Text>
                </Pressable>
            </View>}

                
            
            <View style={tw`flex-row my-3 `}>
                <Checkbox onPress={()=>setAdopt(!adopt)} status={adopt? 'checked' : 'unchecked'} style={tw`my-auto`}/>
                <Text onPress={()=>setAdopt(!adopt)} style={tw`px-2 text-gray-700 my-auto`}>Remove File Upload</Text>
            </View>
            <View style={tw`px-5 flex-row mb-4 justify-around `}>
                <Pressable style={tw`bg-blue-100 h-10 w-5/12 my-auto rounded-xl`} onPress={()=>cancel()}>
                    <Text style={tw`my-auto text-center`}>Close</Text>
                </Pressable>
                <View style={tw`w-5/12`}>
                    <RoundedButton text='Submit' pressed={()=>Submit()}/>
                </View>
                
            </View>
        </View>
  );
}

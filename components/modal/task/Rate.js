import React,  {useState} from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import Ionicon from 'react-native-vector-icons/Ionicons'


import RoundedButton from '../../button/RoundedButton';
import Input from '../../helpers/Input';
import { Checkbox, TextInput } from 'react-native-paper';
import { RateTask } from '../../../actions/actionsTeam';
import Toast from '../../helpers/Toast';


export default function Rate(props) {
const [visible, setVisible] = useState(true)
const [action, setAction] = useState(0)
const navigation = useNavigation()
const [document, setDocument] =useState(null)
const [adopt, setAdopt] = useState(false)
const [showToast, setShowToast] = useState(false)
const [message, setMessage] = useState(null)
const [success, setSuccess] = useState(false)
const [rateScore, setRateScore] =useState(null)
const [qtyRateScore, setQtyRateScore] =useState(null) 
const [remark, setRemark] =useState(null)
   
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
const config = {
    // method: 'PUT',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            //  'content-type': 'multipart/form-data',
        },
        body: formData
    };

let formData = new FormData();
// ratingData = formData.append()
// const convertToFormData=()=>{ 
    if(props.details.task_type == 'quantitative' || props.details.task_type == 'qualitative & quantitative'){
    formData.append('quantity_target_unit_achieved',qtyRateScore)}
    if(props.details.task_type == 'qualitative' || props.details.task_type == 'qualitative & quantitative'){
    formData.append('quality_target_point_achieved',rateScore)}
    formData.append('rating_remark',remark)   //append the values with key, value pair
    if(!adopt && document){
    // formData.append('submission',document)
    formData.append('submission',{ uri: document, name: document.split('/').pop(), type:'pdf' });
}
    formData.append('use_owner_submission', adopt)
// }

// formData.append("file",{
//     uri: image.uri,
//     type: 'image/jpeg',
//     name: image.uri,
//     data: image.uri,
// } );
// const config = {     
//     headers: { 'content-type': 'application/json' }
// }
// console.log(props.details.task_type)

const callback=(res)=>{
    console.log(res.status==200)
    setShowToast(true)
    // setMessage()
    if(res.status==200){
        setMessage('Task has been rated')
        setSuccess(true)
        props.setVisible(false)
        props.setReload(true)
    }
}

const handleRate=()=>{
    // convertToFormData();
    RateTask(props.id,callback, formData, config)
    // console.log(formData)
}
  return (
        action == 0 ?
            <View style={tw`m-auto bg-white rounded-xl w-9/12`}>
                <Toast showToast={showToast} setShowToast={setShowToast} message={message} success={success} />
                <View style={tw`border-b border-green-300 my-3 mx-5`}>
                    <Text style={tw`font-bold text-sm text-center py-3 text-blue-800`}>Are you adopting submittted file? </Text>
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
                <Toast showToast={showToast} setShowToast={setShowToast} message={message} success={success} />
            <View style={tw`border-b border-green-300 my-3 mx-5`}>
                <Text style={tw`font-bold text-base text-center py-3 text-blue-800`}>Rate Task</Text>
                {/* <TouchableOpacity onPress={()=>cancel()} style={tw`w-10/12 flex-row justify-end`}>
                    <Ionicon name='close' style={tw` m-2 bg-red-800 p-1.5 my-auto text-center text-white rounded-full text-right`}/>
                </TouchableOpacity>     */}
            </View>
            { props.details.task_type=='qualitative' ||props.details.task_type=='quantitative_and_qualitative' ?
            <Input label='Enter rate score (QLY)' setValue={setRateScore} />:<></>}
            { props.details.task_type=='quantitative' ||props.details.task_type=='quantitative_and_qualitative' ?
            <Input label='Enter rate score (QTY)' setValue={setQtyRateScore} />:<></>}
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

            <Input label='Remark' multiline={true} setValue={setRemark} />
            
            <View style={tw`flex-row my-3 `}>
                <Checkbox onPress={()=>setAdopt(!adopt)} status={adopt? 'checked' : 'unchecked'} style={tw`my-auto`}/>
                <Text onPress={()=>setAdopt(!adopt)} style={tw`px-2 text-gray-700 my-auto`}>Adopt submitted file</Text>
            </View>
            <View style={tw`px-5 flex-row mb-4 justify-around `}>
                <Pressable style={tw`bg-blue-100 h-10 w-5/12 my-auto rounded-xl`} onPress={()=>cancel()}>
                    <Text style={tw`my-auto text-center`}>Close</Text>
                </Pressable>
                <View style={tw`w-5/12`}>
                    { remark  &&rateScore || qtyRateScore ?
                    <RoundedButton text='Submit' pressed={()=>handleRate()}/>
                    : <Text style={tw`my-auto py-3 bg-gray-200 rounded-3xl text-center`}>Rate Task</Text>
                }
                </View>
                
            </View>
        </View>
  );
}

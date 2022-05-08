import { View, Pressable,Text } from 'react-native'
import React, {useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import Ionicon from 'react-native-vector-icons/Ionicons'
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';

import RoundedButton from '../button/RoundedButton';
import { UploadBulkTask } from '../../actions/actionsTeam';


export default function UploadTask(props) {
    const navigation = useNavigation()
    const [document, setDocument] =useState(null)
    const _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
        if(!result.cancelled){
            setDocument(result)
        }
	}
    // formData.append('submission',{ uri: document, name: document.split('/').pop(), type:'pdf' });
    const callback =(res)=>{
        console.log(res)
    }

    const close=()=>{
        navigation.navigate('tasks')
        props.setVisible(false)
    }
    const onSubmit =()=>{
        let formData = new FormData();
        formData.append('template_file',{ uri: document.uri, name: document.uri.split('/').pop(), type:document.mimeType.split('/')[1] });

        UploadBulkTask(callback, formData)
    }

  return (
    <View style={tw`bg-white w-10/12 m-auto pt-3 pb-5`}>
        <View style={tw`w-11/12 ml-4 flex-row justify-end`}>
            <Ionicon onPress={()=>close()} name='close' style={tw`text-right p-1 w-5 my-auto h-5 text-white rounded-full bg-red-800`}/>
        </View>
        <Pressable onPress={()=>_pickDocument()} style={[tw`${document ? 'pb-1 pt-3' :'py-5'} px-2 my-4 mx-auto  w-11/12 `,{borderWidth:1,borderColor:'#365C2A', borderStyle: 'dashed',
            borderRadius: 1, borderStyle:'dashed',}]}>
            
            <Ionicon name="ios-cloud-upload" style={tw`m-auto`} color={document ? 'purple': 'rgba(0,0,0,0.4)'} size={50}/>

            <Text style={tw`text-center text-gray-400`} numberOfLines={1}>
                { document ? document.name:
                    'Upload Meeting'
                    }
            </Text>
            
        </Pressable>
        { document ?
            <View style={tw`w-6/12 mx-auto`}>
                <RoundedButton pressed={()=>onSubmit()} text='Upload'/>
            </View>: <View style={tw`w-6/12 mx-auto`}>
                <Text style={tw`text-center bg-gray-200 py-3 rounded-lg`}>Upload</Text>
            </View>
        }
    </View>
  )
}
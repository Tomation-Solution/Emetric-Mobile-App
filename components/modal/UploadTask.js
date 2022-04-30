import { View, Pressable,Text } from 'react-native'
import React, {useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import Ionicon from 'react-native-vector-icons/Ionicons'
import * as DocumentPicker from 'expo-document-picker';

import RoundedButton from '../button/RoundedButton';


export default function UploadTask(props) {
    const [document, setDocument] =useState(null)
    const _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
        if(!result.cancelled){
            setDocument(result.uri)
        }
	}

  return (
    <View style={tw`bg-white w-10/12 m-auto pt-3 pb-5`}>
        <View style={tw`w-11/12 ml-4 flex-row justify-end`}>
            <Ionicon onPress={()=>props.setVisible(false)} name='close' style={tw`text-right p-1 w-5 my-auto h-5 text-white rounded-full bg-red-800`}/>
        </View>
        <Pressable onPress={()=>_pickDocument()} style={[tw`${document ? 'pb-1 pt-3' :'py-5'} px-2 my-4 mx-auto  w-11/12 `,{borderWidth:1,borderColor:'#365C2A', borderStyle: 'dashed',
            borderRadius: 1, borderStyle:'dashed',}]}>
            
            <Ionicon name="ios-cloud-upload" style={tw`m-auto`} color={document ? 'purple': 'rgba(0,0,0,0.4)'} size={50}/>

            <Text style={tw`text-center text-gray-400`} numberOfLines={1}>
                { document ? document:
                    'Upload Meeting'
                    }
            </Text>
            
        </Pressable>
        { document ?
            <View style={tw`w-6/12 mx-auto`}>
                <RoundedButton text='Upload'/>
            </View>: <View style={tw`w-6/12 mx-auto`}>
                <RoundedButton text='Upload'/>
            </View>
        }
    </View>
  )
}
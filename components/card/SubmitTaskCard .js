import { View, Text, Pressable } from "react-native"
import tw from "tailwind-react-native-classnames"

import IconButton from "../button/IconButton"
import RoundedButton from "../button/RoundedButton"
import SmallButton from "../button/SmallButton"


export const SubmitTaskCard =(props)=>{
    return(
        <Pressable style={tw`bg-white rounded-lg my-1 p-2`}>
            <View style={tw` justify-between`}>
                {/* <Text style={tw`my-auto text-xs`}>{props.time}</Text> */}
            <Text style={tw`pb-2 border-b mb-1 w-full border-gray-200`}>{props.name}</Text>
                
                <View style={tw`my-auto flex-row justify-between px-2 `}>
                    <Text style={tw`my-auto text-xs text-center mb-1 px-2 rounded-lg ${props.status=='pending' ? 'bg-yellow-300': (props.status == 'awaiting rating' ?'bg-blue-300':'bg-red-300')} `}>
                        {props.status ==  'awaiting_rating' ? 'Awaiting Rating' : props.status}
                    </Text>
                    <View style={tw`w-3/12`}>
                        {props.button1}
                    </View>
                    {/* <RoundedButton text='View' pressed={()=>props.navigation.navigate('view-member')}/> */}
                </View> 
                
            </View>
            
            { props.selected == props.id ?
            <View style={tw` flex-row justify-end  px-2 relative z-40 w-full`}>
                <View style={tw`bg-blue-100 w-4/12 px-3 rounded-lg`}>
                <View style={tw`w-full`}>
                    <SmallButton pressed={()=>props.setView(true)} text='View'/>
                </View>

                {/* <View style={tw`w-full`}>
                    <SmallButton pressed={()=>props.navigation.navigate('submitTask')} text='Submit'/>
                </View>

                <View style={tw`w-full`}>
                    <SmallButton pressed={()=>props.navigation.navigate('submitTask')} text='List Submitted Tasks'/>
                </View>
                
                <View style={tw`w-full`}>
                    <SmallButton pressed={()=>props.setRate(true)} text='Rate'/>
                </View>
                <View style={tw`w-full`}>
                    <SmallButton pressed={()=>props.setRework(true)} text='Rework'/>
                </View> */}
                </View>
            </View>:<></>}
        </Pressable>
    )
}
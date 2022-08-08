import { View, Text, Pressable } from "react-native"
import tw from "tailwind-react-native-classnames"

import IconButton from "../button/IconButton"
import RoundedButton from "../button/RoundedButton"
import SmallButton from "../button/SmallButton"


export const TaskCard =(props)=>{
    return(
        <Pressable style={tw`bg-white rounded-lg my-1.5  p-2`}>
        
            <Text style={tw`pb-2 border-b text-xs mb-1 border-gray-200`}>{props.name}</Text>
            <View style={tw`flex-row justify-between`}>
                <Text style={tw`my-auto text-xs`}>{props.time}</Text>
                <Text style={tw`my-auto px-2 text-xs rounded-lg ${props.status=='pending' ? 'bg-yellow-300': (props.status == 'awaiting rating' ?'bg-blue-300':'bg-red-300')} `}>
                    {props.status == 'over_due' ? 'Overdue': props.status}
                </Text>
                <View>
                    {props.button1}
                    {/* <RoundedButton text='View' pressed={()=>props.navigation.navigate('view-member')}/> */}
                </View> 
                
            </View>
            
            { props.selected == props.id ?
            <View style={tw` flex-row justify-end  px-2 relative z-40 w-full`}>
                <View style={tw`bg-blue-100 w-4/12 px-3 rounded-lg`}>
                <View style={tw`w-full`}>
                    <SmallButton pressed={()=>props.setView(true)} text='View'/>
                </View>

                {!props.isMe || props.details.task_status =='pending' || props.details.task_status =='closed' ?<></>:
                    <View style={tw`w-full`}>
                    <SmallButton pressed={()=>props.navigation.navigate('submitTask', {task_id:props.selected, details:props.details})} text='Submit'/>
                </View>}
                { props.details.task_status == 'pending' ? <></>:
                <View style={tw`w-full`}>
                    <SmallButton pressed={()=>props.navigation.navigate('submitTask', {task_id:props.selected, refresh:props?.refresh, setRefresh:props?.setRefresh,details:props?.details})} text='List Submitted Tasks'/>
                </View>}
                { props.isMe ?<></>:
                <View style={tw`w-full`}>
                    <SmallButton pressed={()=>props.setRate(true)} text='Rate'/>
                </View>}
                { props.isMe ?<></>:
                <View style={tw`w-full`}>
                    <SmallButton pressed={()=>props.setRework(true)} text='Rework'/>
                </View>
                }
                </View>
            </View>:<></>}
        </Pressable>
    )
}
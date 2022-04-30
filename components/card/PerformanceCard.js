import { View, Text } from "react-native"
import tw from "tailwind-react-native-classnames"
import IconButton from "../button/IconButton"
import RoundedButton from "../button/RoundedButton"

export const PerformanceCard =(props)=>{
    return(
        <View style={tw`bg-white rounded-lg my-1 p-2`}>
            {/* <Text style={tw`pb-2 border-b mb-1 w-9/12 border-gray-200`}>{props.name}</Text> */}
            <View style={tw`flex-row justify-between`}>
                {/* <Text style={tw`my-auto text-xs`}>{props.time}</Text>
                <Text style={tw`my-auto px-2 rounded-lg ${props.status=='pending' ? 'bg-yellow-300': (props.status == 'awaiting rating' ?'bg-blue-300':'bg-red-300')} `}>{props.status}</Text> */}
                <Text style={tw`pb-2 w-10/12 my-1 border-gray-200`}>{props.name}</Text>
                
                <View>
                    {props.button1}
                    {/* <RoundedButton text='View' pressed={()=>props.navigation.navigate('view-member')}/> */}
                </View> 
                
            </View>
        </View>
    )
}
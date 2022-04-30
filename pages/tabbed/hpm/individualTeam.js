import { ScrollView,View, FlatList, Picker, Text } from 'react-native'
import React, {useState} from 'react'
import tw from 'tailwind-react-native-classnames'
import { List } from 'react-native-paper'

import IconCard from '../../../components/card/iconCard'
import ModalTemplate from '../../../components/modal'
import RoundedButton from '../../../components/button/RoundedButton'
import { PerformanceCard } from '../../../components/card/PerformanceCard'
import ViewPerformance from '../../../components/modal/ViewPerformance'
import CustomPicker from '../../../components/helpers/Picker'

export default function IndividualTeam() {

    const [view, setView] = useState(false)
    const [expanded, setExpanded] = useState(false)
    // const [uploadTask, setUploadTask] = useState(false)
    const data = [
        {id:1, name:'Overall Performance', value:'2 %'},
        {id:2, name:'Job Quality Performance', value:'45 %'},
        {id:3, name:'Job Quantity Performance', value:'5 %'},
        {id:4, name:'Turnaround Time Performance', value:'3 %'}
    ]

    const HeadComponent=()=>{
        return(
            <View style={tw`flex-row flex-wrap justify-between `}> 
           
                { data.map(e=>
                    <IconCard
                        width={true}
                        key={e.id}
                        amount={e.value}
                        description={e.name}
                        bg='bg-blue-100'
                    />)
                    }

           

            </View>
        )
    }

    const BottomComponents = () =>{
        return(
            <View style={tw`mt-3`}>
        
                { data.map(e=>
                    <PerformanceCard name='Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com' 
                    time='2022- 04-22 08:00:00' 
                    status='awating rating' 
                    button1={
                    <View style={tw`w-14`}>
                        <RoundedButton text='View'/>
                    </View>}
                />)}
            </View>
        )
    }


  return (
    <View>
        <ModalTemplate visible={view}  body={<ViewPerformance setVisible={setView}/>}/>
        
        <View style={tw`w-5/12 mb-1 mx-3`}>
                <CustomPicker label='Get Team Member Task'/>
        </View>
        {/* <ModalTemplate visible={uploadTask}   body={<UploadTask setVisible={setUploadTask}/>}/> */}
        <FlatList
            data={data}
            keyExtractor={(item)=>item.id}
            ListHeaderComponent={<HeadComponent/>}
            // ListHeaderComponent={<HeadButtons/>}
            style={tw`p-5 bg-gray-100`}
            renderItem={
                ({item})=>
                <View style={tw`justify-around`}>
                    <PerformanceCard name='Responsibilities For The Day To Day Relationship Managment of Chanel Patners Demo 1@gmail.com' 
                    time='2022- 04-22 08:00:00' 
                    status='awating rating' 
                    button1={
                    <View style={tw`w-14`}>
                        <RoundedButton pressed={()=>setView(true)} text='View'/>
                    </View>}
                />
                </View>
            }
        />
    </View>
  )
}
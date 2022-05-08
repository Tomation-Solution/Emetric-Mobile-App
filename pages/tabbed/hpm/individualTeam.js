import { ScrollView,View, FlatList, Picker, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import tw from 'tailwind-react-native-classnames'
import { List } from 'react-native-paper'

import IconCard from '../../../components/card/iconCard'
import ModalTemplate from '../../../components/modal'
import RoundedButton from '../../../components/button/RoundedButton'
import { PerformanceCard } from '../../../components/card/PerformanceCard'
import ViewPerformance from '../../../components/modal/ViewPerformance'
import CustomPicker from '../../../components/helpers/Picker'
import { MemberDashboard, MemberTasks, MemberTasksByEmail, MemberTasksByEmailDash } from '../../../actions/actionsTeam'

export default function IndividualTeam() {

    const [view, setView] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [teamMembers, setTeamMembers] =useState(null)
    const [dashboardData, setDashboardData] = useState({
        perf:0, qlt:0, qly:0,ttp:0
    })
    // const [expanded, setExpanded] = React.useState(false);
    const [expandedMember, setExpandedMember] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);
    const handleMemberPress = () => setExpandedMember(!expandedMember);
    const [filter, setFilter] = useState(null)
    const [memberEmail, setMemberEmail] = useState(null)
    const [filterMember, setFilterMember] = useState(null)
    const [listData, setListData] = useState(null)
    const [memberId, setMemberId] = useState(null)
    const [selectedLog, setSelectedLog] =useState(null)

    const handleChildPress = (income) => {
        setExpanded(!expanded)
        setFilter(income.name)
    };

    const handleSelection =(id)=>{
        if(id==selected){
            setSelected(null)
        }else{
            setSelected(id)
        }
    }

    const handleView =(data)=>{
        setView(true)
        setSelectedLog(data)
    }

    
    const handleChildPressMember = (selectedMember) => {
        setMemberEmail(selectedMember.email)
        setExpandedMember(!expandedMember)
        setFilterMember(selectedMember.first_name+ ' '+selectedMember.last_name )
        setMemberId(selectedMember.user_id)
        
        // console.log(selectedMember.email)
    };

    const filterData=[
        {id:1, name:'Day'},
        {id:2, name:'Week'},
        {id:3, name:'Month'},
        {id:4, name:'Quarter'},
        {id:5, name:'Bi-Annual'},
        {id:6, name:'Annual'},
    ]

    useEffect(()=>{
        // TeamTasksLists(callback)
        MemberTasks(dashboardCallback)
        if(memberEmail){
            MemberTasksByEmail(memberEmail,callback)
            MemberDashboard(memberId,dashData)
        }
        
    },[memberEmail])

    
    const dashData=(res)=>{
        // console.log(res.map(e=>e.))
        setDashboardData({
            perf:res.map(e=>e.percentage_cumulative_target_point_achieved),
            qly:res.map(e=>e.percentage_cumulative_quality_target_point_achieved),
            qlt:res.map(e=>e.percentage_cumulative_quantity_target_point_achieved),
            ttp:res.map(e=>e.percentage_cumulative_turn_around_time_target_point_achieved),
        })
    }
    const callback = (res)=>{
        // console.log(res.data.data)
        
        setListData(res.data.data)
    }

    const dashboardCallback = (res)=>{
        // console.÷log(res.data.data[0].percentage_cumulative_quantity_target_point_achieved)
        setTeamMembers(res.data.data.map(e=>e.user))
    }


    // const [uploadTask, setUploadTask] = useState(false)
    const data = [
        {id:1, name:'Overall Performance', value:dashboardData.perf },
        {id:2, name:'Job Quality Performance', value:dashboardData.qlt},
        {id:3, name:'Job Quantity Performance', value:dashboardData.qly},
        {id:4, name:'Turnaround Time Performance', value:dashboardData.ttp}
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
                        percent={true}
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
        <ModalTemplate visible={view}  body={<ViewPerformance data={selectedLog} setVisible={setView}/>}/>
        <View style={tw`w-11/12 mb-1 mx-3 flex-row justify-between`}>
           
           {/* <List.Section style={tw`bg-red-300 `}
               title='Select Category' collapsable>
               // <View> */}
               <View style={tw`w-4/12`}>
               <List.Accordion style={tw`w-full text-red-900`} expanded={expanded}
                   onPress={handlePress} titleNumberOfLines={1}  title={!filter ?'Filter':filter}>
                  {filterData.map((e)=>
                   <List.Item style={tw`text-red-900 text-xs`} key={e.id} title={e.name} onPress={()=>handleChildPress(e)}/>)}
                   </List.Accordion>
               </View>
           {/* </List.Section> */}
           <View style={tw`w-7/12`}>
               <List.Accordion style={tw`w-full text-xs`} expanded={expandedMember}
       onPress={handleMemberPress} titleStyle={tw`text-blue-800`} titleNumberOfLines={1}  title={!filterMember ?'Select Member':filterMember}>
                  {teamMembers? teamMembers?.map((e)=>
                   <List.Item style={tw` text-xs`} key={e.id} title={e.first_name + ' '+ e.last_name} onPress={()=>handleChildPressMember(e)}/>):''}
                   </List.Accordion>
               </View>
           {/* <CustomPicker 
               label='Get Team Member Task'
               options={
                   teamMembers? teamMembers.map(e=>
                   ({id:e.user_id, label:e.first_name, value:e.last_name}))
               :''}
           /> */}
       </View>
{/* 
        <View style={tw`w-5/12 mb-1 mx-3`}>
                <CustomPicker label='Get Team Member Task'/>
        </View> */}
        {/* <ModalTemplate visible={uploadTask}   body={<UploadTask setVisible={setUploadTask}/>}/> */}
        <FlatList
            data={listData?listData:''}
            keyExtractor={(item)=>item.id}
            ListHeaderComponent={filterMember?<HeadComponent/>:<></>}
            // ListHeaderComponent={<HeadButtons/>}
            style={tw`p-5 bg-gray-100`}
            renderItem={
                ({item})=>
                <View style={tw`justify-around`}>
                    <PerformanceCard name={item.name} 
                    time='2022- 04-22 08:00:00' 
                    status='awating rating' 
                    button1={
                    <View style={tw`w-14`}>
                        <RoundedButton pressed={()=>handleView(item)} text='View'/>
                    </View>}
                />
                </View>
            }
        />
    </View>
  )
}
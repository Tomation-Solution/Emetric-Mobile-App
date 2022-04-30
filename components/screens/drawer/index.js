import React, {useState} from 'react';
import { View, Image,SafeAreaView, ScrollView,Text, Switch,Pressable } from 'react-native';
import { DrawerItem} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCom from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import tw from 'tailwind-react-native-classnames';

import Logout from '../../modal/Logout';
import ModalTemplate from '../../modal';
import Loading from '../../modal/Loading';


const handlePress=(props)=>{
    props.navigation.toggleDrawer()
    props.navigation.navigate(props.to)
    props.setSelected(props.id)
}

const DrawerButton =(props)=>{
    return(
        <DrawerItem activeTintColor='#6094F4' inactiveTintColor='#0B3178'
            key={props.id}
            style={tw`${props.bg}`}
                label={props.label}
                onPress={() => handlePress(props)}
                icon={({ focused, color, size }) => (props.icon) }
            />
    )
}
export default function CustomDrawerList({navigation}) {
    // const navigation = useNavigation();
    const [selected, setSelected] = useState(1)
    const [visible, setVisible] = useState(false)
    const [showDropdown, setshowDropdown] = useState(false)
    const [showPlatforms, setshowPlaform] = useState(false)
    const [currentPlatform, setCurrentPlatform] =useState('Member')
    const [showComiittee, setShowCommittee] = useState(false)
    const [directory, setDirectory] =useState({member:true, exco:false,comm:false})
    const [loadVisible, setLoadVisible] = useState(false)
    const [loadMessage, setLoadMessage] = useState('')

    const handlePlatform =(platform)=>{
        setCurrentPlatform(platform)
        setshowPlaform(false)
    }
    const drawerData=[
        {id:1, label:'Dashboard', to:'dashboard', icon:<MaterialCom name='view-dashboard-outline' size={22} style={tw`text-center text-blue-900`} color={'grey'}/>},
        {id:2, label:'Tasks', to:'events', icon:(<MaterialIcon name='event-available' style={tw`text-center text-blue-900`} color={'grey'} size={22}/>)},
        {id:3, label:'HPM', to:'news', icon:<Ionicon name="ios-bar-chart" size={22} style={tw`text-center text-blue-900`}
        />},
        {id:5, label:'Messages', to:'gallery', icon:<Ionicon name="chatbubbles-outline" size={22}  style={tw`text-center text-blue-900`}
        /> },
        
        {id:8, label:'Profile', to:'support', icon:<Ionicon name="ios-person-circle-outline" size={22} style={tw`text-center text-blue-900`}
     /> },
     {id:7, label:'About', to:'about', icon:<Ionicon name="md-settings-outline" size={22} style={tw`text-center text-blue-900`}
     /> }
    ]


   
  return (
        <SafeAreaView style={{flex:1}}>
            
             <ModalTemplate 
                visible={visible}
                body={<Logout setVisible={setVisible}/>}
                />

            <ModalTemplate 
                visible={loadVisible}
                body={<Loading setLoadVisible={setLoadVisible} 
                name={loadMessage} 
                to={()=>navigation.navigate('Home',{type:'committee'})}
                />}
            /> 
           
            <ScrollView >

            <Image style={tw`mx-auto mt-6 mb-2`} source={require('../../../images/Logo/r8.png')} />
            <Text style={tw`font-bold text-center mb-7`}>Demo</Text>
            { drawerData.map(e=>
            
                <DrawerButton
                    label={e.label}
                    navigation={navigation}
                    id={e.id}
                    key={e.id}
                    to={e.to}
                    setSelected={setSelected}
                    selected={selected}
                    bg={selected == e.id ?'bg-blue-100':''}
                    icon={e.icon}
                />)}
            
            
            <Pressable onPress={()=>setVisible(true)} style={tw`my-4 flex-row mx-5`}>
                <MaterialIcon name='logout' style={tw`mr-8 my-auto text-gray-500`} size={22} />
                <Text>Logout</Text>
            </Pressable>
            </ScrollView>
            <Text style={tw`mx-auto text-blue-900`}>POWERED BY</Text>
            <Image style={tw`h-14 w-28 mx-auto`} resizeMode='contain' source={require('../../../images/Logo/logo.png')}/>
        </SafeAreaView>
  );
}

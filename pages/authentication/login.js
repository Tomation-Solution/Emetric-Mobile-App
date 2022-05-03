import { View, SafeAreaView,Text, Image, TextInput,TouchableOpacity } from 'react-native'
import {useState} from 'react'
// import localStorage from 'react-native-sync-localstorage'

import tw from 'tailwind-react-native-classnames'
import RoundedButton from '../../components/button/RoundedButton'
import ModalTemplate from '../../components/button/RoundedButton'
import { LoginUser } from '../../actions/actions'
import Ionicon from 'react-native-vector-icons/Ionicons'




export default function Login ({navigation}) {

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [signInData, setSignInData] = useState({
    org_name:'',
    email:'',
    password:''
  })
  
  const data ={'email':signInData.email, 'password':signInData.password}
  const handleLogin =()=>{
    setLoading(true)
    LoginUser(data, signInData.org_name, callback)
  }

  const callback=(response)=>{
      if(response.status==200){
        setLoading(false)
        navigation.navigate('dashboard')
      }else{
        setMessage(response.message)
        setLoading(false)
      }
  }

  console.log(signInData)

  return (
    <SafeAreaView style={tw`h-full `}>
      <View style={tw`my-auto`}>
      {/* <ModalTemplate body={<OwingWidget/>} /> */}
      <Image style={tw`mx-auto my-8`} source={require('../../images/Logo/logo.png')}/>
      {/* <Text>{localStorage.getItem('tokens').access}</Text> */}
      <View style={tw`mx-10`}>
         <Text style={tw`text-base text-blue-900 font-bold pb-3`}>Login to Your Organization</Text>
          <Text>Input details to get started as admin</Text>
      </View>
       
        <View style={tw`mt-3 mx-5 py-6 bg-white  shadow-sm rounded-3xl px-5`}>
          
          <View>
              <View style={tw`my-3`}>
                <Text >Organization Name</Text>
                <TextInput onChangeText={(text)=>setSignInData({...signInData, org_name:text})}
                placeholder='Organization Name'
                style={tw`py-2 px-2 bg-gray-200 rounded-lg mt-1.5`}
                />
              </View>

              <View style={tw`my-2`}>
                <Text>Username</Text>
                <TextInput onChangeText={(text)=>setSignInData({...signInData, email:text})}
                placeholder='Username'
                style={tw`py-2 px-2 bg-gray-200 rounded-lg mt-1.5`}
                />
              </View>

              <View style={tw`my-2 `}>
                <Text>Password</Text>
                <View style={tw`flex-row px-1 bg-gray-200 my-2 py-0.5 rounded-lg`}>
                  <TextInput onChangeText={(text)=>setSignInData({...signInData, password:text})}
                  placeholder='Password'
                  style={tw`py-1 w-11/12 px-2 bg-gray-200 rounded-lg mt-1.5`}
                  secureTextEntry={showPassword ? true: false}
                  
                  />
                  <Ionicon onPress={()=>setShowPassword(!showPassword)} name={showPassword ?'eye-off':'eye'} style={tw`my-auto `} size={20}/>
                </View>
              </View>
          </View>
         
              <TouchableOpacity onPress={()=>handleLogin()}>
                <Text style={tw`text-blue-700 font-bold text-right`}> Forgot Password?</Text>
              </TouchableOpacity>
         
          <View style={tw`my-2`}>
            <RoundedButton 
              text={loading ?'loading ...':'Login'}
              pressed={()=>handleLogin()}
            />
          </View>
          {/* <TouchableOpacity onPress={()=>navigation.navigate('forgotPassword')}> 
            <Text style={tw`text-xs`}>Forgot Password?</Text>
          </TouchableOpacity> */}
          
      </View>
      </View>
    </SafeAreaView>
  )
}

// export default Login


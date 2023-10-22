import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity,StyleSheet,Image } from 'react-native';
import { Camera } from 'expo-camera';
import {useRouter} from 'expo-router';
import axios from 'axios';
import ImageScreen from "./component/ImageScreen.js";
const CameraLayout = () => {
  //const [hasPermission,setHasPermission] = useState(null)
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraStatus,setCameraStatus] = useState(Camera.Constants.Type.back)
  const [loding,setLoding] =useState(false)
  const router = useRouter();
  useEffect(() => {
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
    })();
  }, []);



  const takePicture = async () => {
  
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      const filename = photo.uri.split("/")
      const savename = filename.pop() 
      
      const formData = new FormData();
      formData.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: savename,
      });
      setLoding(true)
      const response = await axios.post('http://192.168.0.23:5000/upload',formData,{
        headers: {'Content-Type': 'multipart/form-data' }  // formData를 사용할 때 필요한 헤더
      })
      setLoding(false)
      router.push({ pathname: 'chatgpt', params: {cook:response.data} })
    }
  };

  if(loding){
    return(
      <View style={styles.container}>
        <ImageScreen type = "camera"/>
        <Text style = {styles.loadingText}>이미지 분석하는 중입니다</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={cameraStatus} ref={ref => setCameraRef(ref)} />
      <TouchableOpacity 
          style={styles.captureButton}
          onPress={() => takePicture()}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1, // 컨테이너를 전체 화면으로 확장
      justifyContent: 'center', // 자식 요소를 중앙에 위치시킵니다 (수직 정렬).
      alignItems: 'center', // 자식 요소를 중앙에 위치시킵니다 (수평 정렬).
      backgroundColor: '#fff', // 배경색을 흰색으로 설정하거나 필요한 색상 코드 사용
    },
    loadingText: {
      marginTop: 10, 
      fontSize: 18,
      color: 'black', 
      fontFamily:"Text"
    },
    captureButton: {
      alignSelf: 'center',
      marginVertical: 20,
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth:2,
      borderColor:'black',
      backgroundColor:'gray',
    },
    captureButtonInner:{
        flex :1 ,
        borderRadius :40 ,
        borderWidth :3 ,
        borderColor :'black' ,
        backgroundColor :'transparent' ,  
    }
  });
export default CameraLayout
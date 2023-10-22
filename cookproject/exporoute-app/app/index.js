import {Link, useRouter} from 'expo-router';
import {View,Text,Pressable, Image, Button, StyleSheet,TouchableOpacity,Modal} from 'react-native';
import React, { useState, useEffect } from 'react';
import ImageScreen from "./component/ImageScreen.js";
import CustomButton from './component/CustomButton.js';
const Main = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false); 
  const process = ["1. 요리에 사용할 식재료를 준비한다.","2. 시작하기 를 눌러 카메라로 식재료 사진을 찍는다.","3. 일정 시간 기다리면 ChatGPT가 맛있는 요리 레시피를 추천해준다!"]
  return (
      <View style={styles.container}>
        
        <Text style={styles.title}>Ai Cook</Text>
        <ImageScreen type = "title"/>
        <CustomButton event={() => router.replace("/camera")} text = {"시작하기"} />
        <CustomButton event={()=>setModalVisible(true)} text = {"사용방법"} />

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
          <View style={styles.modalView}>
            {
                process.map((data,index)=> {
                    return(
                        <View key = {index} >
                            <Text style={styles.modalText}>{data}</Text>
                        </View>
                    )
                    
            })
            }
            <CustomButton event={()=>setModalVisible(false)} text = {"닫기"} />
            </View>
        </Modal>
  </View>
  );
  
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 50 // Add padding to the top to move the elements down
    },
    title: {
        fontSize: 90,
        fontFamily:"title",
        marginTop:50,
        color:"#000000"
    },
    modalView: {
      margin: 20,
      backgroundColor: "#FFFFF0",
      borderRadius: 20,
      padding: 35
  },
  modalText: {
      color:'#000000',
      marginBottom: 15,
      textAlign: "left",
      lineHeight: 22,
      marginLeft:20,
      fontSize:15,
      fontFamily:"Text"
  }
});
export default Main;
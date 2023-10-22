import {useRouter, useLocalSearchParams} from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Text, View,ScrollView, StyleSheet,  FlatList,Modal } from 'react-native';
import axios from 'axios';
import { GPT_API } from '@env';
import { useIsFocused } from '@react-navigation/native';
import ImageScreen from "./component/ImageScreen.js";
import CustomButton from './component/CustomButton.js';
const Profile = (props) => {
    const {cook}= useLocalSearchParams();
    const router = useRouter();
    const [loading,setLoading] = useState(true)
    const [cookName, setCookName] = useState(cook)
    const numColumns = 2;
    const [modalVisible, setModalVisible] = useState(false);  // 모달의 상태 관리
    const [list,setList] = useState(["재료1","재료2","재료3","재료4"])
    const [process,setProcess] = useState(["1. 조리과정 1", "2. 조리과정 2", "3. 조리과정 3"])
    const isFocused = useIsFocused()
    
    const renderItem = ({ item }) => {
        // 각 재료를 표시하는 렌더링 로직
        return (
            <View style={styles.item}>
                <Text style={{fontSize:25,color:"black",fontFamily:"Text"}}>{item}</Text>
            </View>
        );
    };
    useEffect( () => {
        setLoading(true)
        const key = "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"
        const sendMessage = async () => {
            
            try {
                const response = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        messages : [
                            {
                                role : 'system',
                                content : 'You are a cook'
                            },
                            {
                                role : 'user',
                                content : `래시피가 필요하다 ${cook}을 사용하여 만들 수 있는 요리의 이름, 재료, 조리과정을 {"Cook":"이름","List":["재료1","재료2"],"Process":["조리과정1","조리과정2"]} 형식의 JSON Type로 줘라`
                            },
                        ],
                        model : 'gpt-3.5-turbo'
                    },
                    {
                        headers : {
                            'Content-Type' : 'application/json',
                            Authorization : `Bearer ${GPT_API}`
                        }
                    }
                );
                console.log(response.data.choices[0].message.content)
                const json = JSON.parse(response.data.choices[0].message.content);

                setCookName(json.Cook)
                setList(json.List)
                setProcess(json.Process)
                
                setLoading(false)
            } catch (err) {
                console.log(err, 'api call error');
            }
        }
        sendMessage();
    }, [isFocused]);

    if (loading){
        return(
            <View style={styles.container}>
                <ImageScreen type = "chatgpt"/>
                <Text  style = {styles.loadingText}>ChatGpt가 음식을 만드는 중입니다.</Text>
            </View>
        )
    }
    
    return (
        <>
            <Text style={styles.title}>{cookName}</Text>
            <View style={styles.listContainer}>
                <FlatList
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={numColumns} // 여러 열로 구성된 그리드 설정
                />
            </View>
            
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
            <ScrollView contentContainerStyle={styles.modalView}>
              {
                process.map((data,index)=> {

                    
                    return(
                        <View key = {index} style={styles.modalTextView}>
                            <Text style = {{color:"black",fontFamily:"Text"}}>{data}</Text>
                        </View>
                    )
                    
            })
            }

                <CustomButton event={()=>setModalVisible(false)} text = {"닫기"} />
            </ScrollView>
            </Modal>
            <View style = {{ flexDirection: 'row',justifyContent: 'center'}}>
                <CustomButton event={() => setModalVisible(true)} text = {"조리과정"} />
                <CustomButton event={() => router.replace("/camera")} text = {"다시찍기"} />
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 48,
        margin: 10,
        textAlign:"center",
        fontFamily:"Text"
    },
    loadingText: {
        marginTop: 10, 
        fontSize: 18,
        color: 'black', 
        fontFamily:"Text"
    },
    listContainer: {
        flex: 1,
        marginVertical: 10, // 원하는 간격으로 조정 가능합니다.
    },
    item: {
        backgroundColor: 'white', // 박스의 배경 색상
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 10, // 박스 사이의 간격
        height: 100, // 각 박스의 높이, 원하는 높이로 조정 가능합니다.
        borderRadius : 20

    },
    modalView: {
        margin: 20,
        backgroundColor: "#FFFFF0",
        borderRadius: 20,
        padding: 35,
        alignItems: "center"
    },
    modalTextView:{
        backgroundColor: "#f0f0f0",
        width: '100%',
        paddingHorizontal :15 ,
        paddingVertical :10 ,
        marginVertical :5 ,
        borderRadius:20
    }
});
export default Profile;
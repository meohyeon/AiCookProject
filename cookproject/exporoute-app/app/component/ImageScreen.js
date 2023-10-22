import React from 'react';
import {StyleSheet,Image} from "react-native"

export default ImageScreen = (props) => {
    const imageUrl = props.type == "title" ? "titleImage" : "lodingImage";
    var imagePath = require("../assets/imgs/cookimg.png")
    if (props.type == "camera") {
        imagePath = require("../assets/imgs/cameraloading.gif")
    }
    else if (props.type == "chatgpt"){
        imagePath = require("../assets/imgs/gptloading.gif")
    }
    return(
        <Image 
            style={styles[imageUrl]}
            source={imagePath}
        />
    )
}
const styles = StyleSheet.create({

    titleImage: {
        width: 200,
        height: 200,
        marginTop: 120,
        marginBottom: 120,
        borderRadius: 100  // 이 부분을 추가합니다
    },

    lodingImage: {
        width: 200,
        height: 200,
        marginBottom: 50,
    },
});

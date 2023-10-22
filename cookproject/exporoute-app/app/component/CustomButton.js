import {StyleSheet,TouchableOpacity,Text} from "react-native"

export default CustomButton = ({text,event}) => {
    
    return(
        <TouchableOpacity 
            style={styles.button}
            onPress={event}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:'orange', // Button background color set to orange
        borderRadius :30 , 
        paddingVertical :10 , 
        paddingHorizontal :40 ,
        margin:20, 
        borderColor:'white', // Button border color set to white
        alignItems: 'center'
    },
    buttonText:{
        color:'white',   
        fontSize :20,
        fontFamily : "Text"
    }
}); 

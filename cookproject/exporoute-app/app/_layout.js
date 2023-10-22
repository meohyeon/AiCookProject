import {Stack, useRouter} from "expo-router";
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome'; 
const StackLayout = () => {
    const router = useRouter();
    const [fontLoaded] = useFonts({
        "title" : require("./assets/fonts/Title_ttf.ttf"),
        "Text" : require("./assets/fonts/KoMedium.ttf")
    });
    if(!fontLoaded) {
        return null;
    } 
    return(
        <Stack initialRouteName = "index" screenOptions={{
            headerStyle:{
                backgroundColor: 'orange',
            } ,
            headerTintColor:'#ffffff' ,
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerTitleStyle: {
                fontFamily:"title",
                fontSize: 18, 
            },
            headerRight: () => ( 
            <Icon 
                name="home" 
                size={28} 
                color="#fff" 
                style={{ marginRight: 10 }} 
                onPress={() => router.replace("/")}
        />
        ),
        }}>
        <Stack.Screen 
            name = "index"
            options={{ headerShown: false }} 
        />

        <Stack.Screen 
            name = "camera" 
        />
        <Stack.Screen 
            name = "chatgpt" 
            options={{ title: "Create Recipe" }}
        />
        
        </Stack>

        
    )
}

export default StackLayout;

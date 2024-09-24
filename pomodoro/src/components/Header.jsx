import { View , Text, TouchableOpacity, StyleSheet} from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];



export const Header=({currentTime, setCurrentTime, setTime})=>{
    const handlePess = ( index ) => {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;

        setCurrentTime(index);
        setTime(newTime * 60);
    }
    return(
        <View style={{flexDirection: "row"}}>
            {options.map((item, index)=> (
                <TouchableOpacity key={index}
                                  onPress={()=> handlePess(index)}
                                  style={[ styles.itemStyle, currentTime !== index && { borderColor: "transparent" }]}>
                    <Text style={{fontWeight: "bold"}}>{item}</Text>
                </TouchableOpacity>
            ))}


        </View>
    )
}

const styles = StyleSheet.create({
    itemStyle: {
        alignItems: "center",
        borderRadius: 10,
        width: "33%",
        borderWidth: 3,
        padding: 5,
        borderColor: "white",
        marginVertical: 20
    }
})
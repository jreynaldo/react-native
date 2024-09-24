import {Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useState, useEffect } from 'react';
import {Header} from './src/components/Header';
import Timer from "./src/components/Timer";
import {Audio } from 'expo-av';

const colors = ["#F7DC8F", "#A2D9CE","#D7BDE2"];
export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25*60);
  const [currentTime, setCurrentTime] = useState("POMO"|"SHORT"|"BREAK");
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    let interval  = null;
    if(isActive){
      interval = setInterval(()=> {
        setTime(time - 1);
      }, 1000)
    }else {
          clearInterval(interval);
    }

    if(time === 0){
      setIsActive(false);
      setIsWorking((prev) => ! prev);
      setTime(isWorking ? 300 : 1500)
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStartStop = async ()=> {
    await playSound();
    setIsActive(!isActive);
  }

  const playSound =  async () => {
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );
    await sound.pauseAsync();
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View style={{
              flex:1,
              paddingHorizontal: 15,
              paddingTop: Platform.OS === "android" && 30,
            }}>


      <Header currentTime ={currentTime}
              setCurrentTime ={setCurrentTime}
              setTime={setTime}/>
      <Timer time={time}/>
     <TouchableOpacity style={styles.button} onPress={handleStartStop}>
      <Text style={{ color: "white", fontWeight: "bold"}}>{ isActive ? "STOP": "START"}</Text>
     </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15
  }
});

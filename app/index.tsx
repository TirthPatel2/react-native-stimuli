import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Checkbox from "@/components/ui/Checkbox";
import { useAppContext } from "@/context/AppContext";
import { colorOptions, numberList } from "@/utils/constants";

const numbers = numberList(10);
const arrows = ["up", "down", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"];

const Home = () => {
  const router = useRouter();
  const {
    selectedArrow,
    selectedColor,
    selectedNumber,
    updateSelectedArrow,
    updateSelectedColor,
    updateSelectedNumber,
    resetContext,
  } = useAppContext();

  const [showAllNumbers, setShowAllNumbers] = useState(false);

  return (
    <View style={style.container}>
      <View style={style.content}>
        {/* Colors */}
        <View style={style.titleContainer}><Text style={style.title}>Colors</Text></View>
        <View style={style.list}>
          {colorOptions.map((color: any) =>
            <Text
              key={color}
              style={{
                height: 25,
                width: 25,
                borderRadius: 25 / 2,
                backgroundColor: color,
              }}
              onPress={() => updateSelectedColor({ ...selectedColor, [color]: !selectedColor[color] })}>
              {selectedColor[color] && <Icon
                name="check-bold"
                size={24}
              />}
            </Text>)}
        </View>
        {/* Arrows */}
        <View style={style.titleContainer}><Text style={style.title}>Arrows</Text></View>
        <View style={style.list}>
          {arrows.map((arrow: any) =>
            <Text
              key={arrow}
              onPress={() => updateSelectedArrow({ ...selectedArrow, [arrow]: !selectedArrow[arrow] })}>
              <Icon
                name={`arrow-${arrow}-thick`}
                size={40}
                color={selectedArrow[arrow] ? "black" : "gray"}
              />
            </Text>)}
        </View>
        {/* Numbers */}
        <View style={style.titleContainer}><Text style={style.title}>Numbers</Text></View>
        <View style={style.list}>
          {numbers.slice(0, showAllNumbers ? 10 : 6).map((num: number) => (
            <Checkbox
              key={num}
              label={num.toString()}
              toggleValue={() => updateSelectedNumber({
                ...selectedNumber,
                [num]: !selectedNumber[num],
              })}
              isChecked={selectedNumber[num] || false}
            />))}
        </View>
        <TouchableOpacity>
          <Text
            style={style.btn}
            onPress={() => setShowAllNumbers((prev) => !prev)}
          >
            {`View ${showAllNumbers ? "Less" : "More"}`}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Control Buttons */}
      <View style={style.bottomButtons}>
        <TouchableOpacity style={style.bottomBtn} onPress={() => {
          router.push("/result");
        }}>
          <Text style={style.bottomBtnLable}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.bottomBtn} onPress={() => {
          resetContext();
          setShowAllNumbers(false);
        }}>
          <Text style={style.bottomBtnLable}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
  },
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 50,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  colorOptions: {},
  btn: {
    width: "100%",
    textAlign: "center",
    padding: 10,
    color: "blue",
  },
  bottomButtons: {
    flexDirection: "row",
    flexShrink: 0,
    gap: 0,
    borderTopWidth: 1,
  },
  bottomBtn: {
    width: "50%",
    alignItems: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,

  },
  bottomBtnLable: {
    color: "blue",
    fontSize: 25,
  },
})

export default Home;

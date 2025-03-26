import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Checkbox from "@/components/ui/Checkbox";
import { useAppContext } from "@/context/AppContext";
import { colorOptions, numberList } from "@/utils/constants";

const numbersOptions = numberList(10);
const arrowsOptions = ["up", "down", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"];

const Home = () => {
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
  const [arrows, setArrows] = useState(selectedArrow);
  const [colors, setColors] = useState(selectedColor);
  const [numbers, setNumbers] = useState(selectedNumber);

  useEffect(() => {
    setArrows(selectedArrow);
    setColors(selectedColor);
    setNumbers(selectedNumber);
  }, [selectedArrow, selectedColor, selectedNumber]);

  return (
    <View style={style.container}>
      <View style={style.content}>
        {/* Colors */}
        <View style={style.titleContainer}><Text style={style.title}>Colors</Text></View>
        <View style={style.list}>
          {colorOptions.map((color: any) =>
            <Text
              key={color}
              style={[style.colorOptions, { backgroundColor: color }]}
              onPress={() => setColors((prev: any) => ({ ...prev, [color]: !prev[color] }))}>
              {colors[color] && <Icon
                name="check-bold"
                size={24}
              />}
            </Text>)}
        </View>
        {/* Arrows */}
        <View style={style.titleContainer}><Text style={style.title}>Arrows</Text></View>
        <View style={style.list}>
          {arrowsOptions.map((arrow: any) =>
            <Text
              key={arrow}
              onPress={() => setArrows((prev: any) => ({ ...prev, [arrow]: !prev[arrow] }))}>
              <Icon
                name={`arrow-${arrow}-thick`}
                size={40}
                color={arrows[arrow] ? "black" : "gray"}
              />
            </Text>)}
        </View>
        {/* Numbers */}
        <View style={style.titleContainer}><Text style={style.title}>Numbers</Text></View>
        <View style={style.list}>
          {numbersOptions.slice(0, showAllNumbers ? 10 : 6).map((num: number) => (
            <Checkbox
              key={num}
              label={num.toString()}
              toggleValue={() => setNumbers((prev: any) => ({
                ...prev,
                [num]: !prev[num],
              }))}
              isChecked={numbers[num] || false}
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
          updateSelectedArrow(arrows);
          updateSelectedColor(colors);
          updateSelectedNumber(numbers);
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
  colorOptions: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
  },
  btn: {
    width: "100%",
    textAlign: "center",
    padding: 10,
    color: "blue",
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexShrink: 0,
    gap: 0,
  },
  bottomBtn: {
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,

  },
  bottomBtnLable: {
    color: "white",
    fontSize: 25,
  },
})

export default Home;

import { useAppContext } from "@/context/AppContext";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Result = () => {
    const {
        selectedArrow,
        selectedColor,
        selectedNumber,
    } = useAppContext();

    const visuals = useMemo(() => {
        const filterValuedFields = (data: any) => Object.keys(data).filter((field: string) => data[field]);
        return {
            arrows: filterValuedFields(selectedArrow),
            colors: filterValuedFields(selectedColor),
            numbers: filterValuedFields(selectedNumber),
        };
    }, [selectedArrow, selectedColor, selectedNumber]);

    return (
        <View>
            <View style={style.container}>
                <Text style={[style.content, style.stimuliTitle]}>
                    Stumuli
                </Text>
                <Text style={[style.content, style.visualTitle]}>
                    {visuals.colors.length > 0 ? "Visual" : "Not Visual"}
                </Text>
                <View style={style.content}>
                    <View style={style.list}>
                        {visuals.colors.map((color: any) =>
                            <Text
                                key={color}
                                style={[style.colorOptions, { backgroundColor: color }]}
                                 />)}
                    </View>
                    <View style={style.list}>
                        {visuals.numbers.map((number: any) => <Text key={number} style={style.visualNumber}>{number}</Text>)}
                    </View>
                    <View style={style.list}>
                        {visuals.arrows.map((arrow: any) =>
                            <Text key={arrow} >
                                <Icon
                                    name={`arrow-${arrow}`}
                                    size={30}
                                    color="gray"
                                />
                            </Text>)}
                    </View>
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    content: {
        flex: 1,
    },
    stimuliTitle: {
        fontSize: 25,
    },
    visualTitle: {
        fontSize: 20,
        color: "gray",
    },
    list: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    colorOptions: {
      height: 25,
      width: 25,
      borderRadius: 25 / 2,
    },
    visualNumber: {
        color: "gray",
        fontSize: 20,
    },
});

export default Result;

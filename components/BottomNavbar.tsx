import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { routes } from "@/utils/routes";

const BottomNavbar = ({ navigation, state }: any) => {
    return (
        <View style={styles.navContainer}>
            {routes.map((route: any, index: number) => <TouchableOpacity
                key={route.name}
                style={styles.navBtn}
                onPress={() => navigation.navigate(route.name)}
            ><Icon
                    name={route.icon}
                    color={state.index === index ? "#007AFF" : "#000"}
                    size={24}
                />
                <Text style={[styles.navBtnText, {
                    color: state.index === index ? "#007AFF" : "#000",
                }]}>{route.label}</Text>
            </TouchableOpacity>)}
        </View>
    );
}

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    navBtn: {
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    navBtnText: {
        fontSize: 16,
    },
});

export default BottomNavbar;

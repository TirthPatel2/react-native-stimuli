import React, { useState, useEffect, useRef, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import Svg, { Circle } from "react-native-svg";

const TimerAnimation = () => {
    const [timeLeft, setTimeLeft] = useState(30);
    const [isActive, setIsActive] = useState(false);
    // if we will implement state for timeElapsed and update it on each second
    // it will reduce performance so better to avoid too many state changes
    const [isSkip, setIsSkip] = useState(false);

    const animationProgress = useRef(new Animated.Value(0)).current;
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    const timeElapsed = useMemo(() => (isSkip ? 6 : 31) - timeLeft, [timeLeft]);

    const runAnimation = (duration: number) => {
        animationRef.current = Animated.timing(animationProgress, {
            toValue: 1,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
        });

        animationRef.current.start(({ finished }) => {
            if (finished) {
                setIsActive(false);
                setTimeLeft(1);
                setIsSkip(false);
            }
        });
    };

    const toggleAnimation = () => {
        if (!isActive) {
            setIsActive(true);
            const duration = timeLeft * 1000;
            runAnimation(duration);
        } else {
            pauseAnimation();
        }
    };

    const pauseAnimation = () => {
        setIsActive(false);
        animationRef.current?.stop();
    };

    const resetAnimation = () => {
        pauseAnimation();
        animationProgress.setValue(0);
        setTimeLeft(30);
    };

    const skipToEnd = () => {
        setIsSkip(true);
        pauseAnimation();
        setTimeLeft(5);
        setIsActive(true);
        runAnimation(5000);
    };

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current as NodeJS.Timeout);
                        return 1;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive]);

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>Time Elapsed: {timeElapsed}s</Text>
            <View style={styles.circleContainer}>
                <Svg height="120" width="120" viewBox="0 0 120 120">
                    <Circle
                        cx="60"
                        cy="60"
                        r={radius}
                        stroke="gray"
                        strokeWidth="5"
                        fill="transparent"
                    />
                    <AnimatedCircle
                        cx="60"
                        cy="60"
                        r={radius}
                        stroke="orange"
                        strokeWidth="5"
                        strokeDasharray={circumference}
                        strokeDashoffset={animationProgress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [circumference, 0],
                        })}
                        strokeLinecap="round"
                        fill="transparent"
                        transform="rotate(-90, 60, 60)"
                    />
                </Svg>
                <View style={styles.timerTextContainer}>
                    <Text style={styles.timerText}>{timeLeft}s</Text>
                </View>
            </View>

            <View style={styles.controls}>
                {timeLeft > 1 && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleAnimation}
                    >
                        <Text style={styles.buttonText}>
                            {isActive ? "Pause" : (timeLeft === 30 ? "Start" : "Resume")}
                        </Text>
                    </TouchableOpacity>
                )}

                {timeLeft > 5 && (
                    <TouchableOpacity
                        style={[styles.button, styles.skipButton]}
                        onPress={skipToEnd}
                    >
                        <Text style={styles.buttonText}>Skip</Text>
                    </TouchableOpacity>
                )}

                {(isActive || timeLeft < 30) && (
                    <TouchableOpacity
                        style={[styles.button, styles.resetButton]}
                        onPress={resetAnimation}
                    >
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    circleContainer: {
        width: 120,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        position: "relative",
    },
    timerTextContainer: {
        position: "absolute",
        alignItems: "center",
    },
    timerText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    button: {
        backgroundColor: "blue",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    skipButton: {
        backgroundColor: "green",
    },
    resetButton: {
        backgroundColor: "red",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default TimerAnimation;
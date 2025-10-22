import React, { ReactNode, useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";

export const ScaleInView = ({ children }: { children: ReactNode }) => {
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 100,
      tension: 200,
    }).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      {children}
    </Animated.View>
  );
};
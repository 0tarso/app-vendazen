import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";

import { NavigationRoute, ParamListBase } from "@react-navigation/native";
import { COLORS } from "@/src/constants/Colors";

interface TabItemProps {
  state: BottomTabBarProps["state"];
  descriptors: BottomTabBarProps["descriptors"];
  navigation: BottomTabBarProps["navigation"];
  route: NavigationRoute<ParamListBase, string>;
  index: number;
}

export default function TabItem({ state, descriptors, navigation, route, index }: TabItemProps) {
  const { options } = descriptors[route.key];
  const label = options.tabBarLabel ?? options.title ?? route.name;

  const iconName = {
    "home": "home-outline",
    "customers": "people-outline",
    "purchases": "bag-check-outline",
    // "projetos": "folder-outline",
  }[route.name] || "ellipse-outline";

  const isFocused = state.index === index;

  const scale = useRef(new Animated.Value(isFocused ? 1.2 : 1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isFocused ? 1.2 : 1,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      onPress={onPress}
      style={styles.tab}
      activeOpacity={0.8}
    >
      <Animated.View style={{ alignItems: "center", transform: [{ scale }] }}>
        <Ionicons
          name={iconName as any}
          size={24}
          color={isFocused ? COLORS.GreenPrimary : COLORS.GrayFont}
        />
        <Text
          style={[{
            color: isFocused ? COLORS.GreenPrimary : COLORS.GrayFont,
            fontSize: 10,
          }, styles.tabText]}
        >
          {label as string}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",

  },
  tabText: {
    fontFamily: 'MontserratSemiBold'
  }
})
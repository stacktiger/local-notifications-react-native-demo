import React, { useState } from "react";
import { View, TouchableOpacity, TextStyle, Text } from "react-native";
import type { ViewStyle } from "react-native";

export type Radio = {
  label: string;
};

type Props = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  initial?: number;
  circleSize?: number;
  data?: Radio[];
  onChange: Function;
  activeColor?: string;
  inactiveColor?: string;
};

export const RadioGroup = ({
  initial = -1,
  data = [],
  onChange,
  style = {},
  circleSize = 18,
  textStyle = {},
  activeColor = "#673AB7",
  inactiveColor = "#777",
}: Props) => {
  const [state, setState] = useState({
    activeIndex: initial,
  });

  const changeRadio = (item: Radio, activeIndex: number) => {
    setState({ ...state, activeIndex });
    onChange(item, activeIndex);
  };

  return (
    <View style={style}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              { flexDirection: "row", alignItems: "center" },
              index > 0 ? { marginTop: 10 } : null,
            ]}
            activeOpacity={1}
            onPress={() => changeRadio(item, index)}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={[
                  {
                    borderWidth: 1,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  {
                    borderColor:
                      state.activeIndex === index ? activeColor : inactiveColor,
                    width: circleSize + 8,
                    height: circleSize + 8,
                  },
                ]}
              >
                <View
                  style={{
                    opacity: state.activeIndex === index ? 1 : 0,
                  }}
                >
                  <View>
                    <View
                      style={[
                        { borderWidth: 1, borderRadius: 100 },
                        {
                          backgroundColor:
                            state.activeIndex === index
                              ? activeColor
                              : inactiveColor,
                          borderColor:
                            state.activeIndex === index
                              ? activeColor
                              : inactiveColor,
                          width: circleSize,
                          height: circleSize,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{ paddingLeft: 8 }}>
              <Text
                style={[
                  {
                    fontWeight: "500",
                    textTransform: "uppercase",
                    color: "#777",
                    fontSize: 13,
                  },
                  textStyle,
                  state.activeIndex === index ? { color: "#673AB7" } : null,
                ]}
              >
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioGroup;

import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { useTheme } from 'styled-components'

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import Resume from "../screens/Resume";
import { Flutter } from "../screens/Flutter";

const Tab = createBottomTabNavigator()

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88,
        }
      }}
    >
      <Tab.Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons name="format-list-bulleted" color={color} size={size} />
          ),
          tabBarLabel: "Listagem",
        }}
      />
      <Tab.Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) =>
            <Feather name="dollar-sign" color={color} size={size} />
          )
        }}
      />
      {/* <Tab.Screen
        name="Resume"
        component={Resume}
        options={{
          tabBarIcon: (({ size, color }) =>
            <Feather name="pie-chart" color={color} size={size} />
          )
        }}
      /> */}
      <Tab.Screen
        name="Flutter"
        component={Flutter}
        options={{
          tabBarIcon: (({ size, color }) =>
            <Feather name="pie-chart" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

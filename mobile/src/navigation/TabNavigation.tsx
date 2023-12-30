import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { BrewNavigation } from "./BrewNavigation";
import { CoffeeNavigation } from "./CoffeeNavigation";
import { ToolNavigation } from "./ToolNavigation";

import { GetIconProps } from "@/types/Icon";
import { tabRoutes } from "@/utils/routes";

const Tab = createBottomTabNavigator();

function getIcon(routeName: string, { focused }: GetIconProps) {
  if (routeName === tabRoutes.brews) {
    const name = focused ? "list" : "list-outline";
    return <Ionicons name={name} size={24} color="black" />;
  }
  if (routeName === tabRoutes.coffees) {
    const name = focused ? "coffee" : "coffee-outline";
    return <MaterialCommunityIcons name={name} size={24} color="black" />;
  }
  if (routeName === tabRoutes.tools) {
    const name = focused ? "coffee-maker" : "coffee-maker-outline";
    return <MaterialCommunityIcons name={name} size={24} color="black" />;
  }
}

export function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: (props) => getIcon(route.name, props),
          headerShown: false,
        })}
      >
        <Tab.Screen name={tabRoutes.brews} component={BrewNavigation} />
        <Tab.Screen name={tabRoutes.coffees} component={CoffeeNavigation} />
        <Tab.Screen name={tabRoutes.tools} component={ToolNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

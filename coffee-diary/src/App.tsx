import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";

import { BrewsScreen } from "@/screens/BrewsScreen";
import { CoffeeMakersScreen } from "@/screens/CoffeeMakers";
import { CoffeesScreen } from "@/screens/CoffeeScreen";
import { GrindersScreen } from "@/screens/GrindersScreen";
import { GetIconProps } from "@/types/Icon";
import { routes } from "@/utils/routes";

const Tab = createBottomTabNavigator();

function getIcon(routeName: string, { focused }: GetIconProps) {
  if (routeName === routes.brews) {
    const name = focused ? "list" : "list-outline";
    return <Ionicons name={name} size={24} color="black" />;
  }
  if (routeName === routes.coffees) {
    const name = focused ? "coffee" : "coffee-outline";
    return <MaterialCommunityIcons name={name} size={24} color="black" />;
  }
  if (routeName === routes.coffeeMakers) {
    const name = focused ? "coffee-maker" : "coffee-maker-outline";
    return <MaterialCommunityIcons name={name} size={24} color="black" />;
  }
  if (routeName === routes.grinders) {
    const name = focused ? "aperture" : "aperture-outline";
    return <Ionicons name={name} size={24} color="black" />;
  }
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: (props) => getIcon(route.name, props),
        })}
      >
        <Tab.Screen
          name={routes.brews}
          component={BrewsScreen}
          options={{ title: routes.brews }}
        />
        <Tab.Screen
          name={routes.coffees}
          component={CoffeesScreen}
          options={{ title: routes.coffees }}
        />
        <Tab.Screen
          name={routes.coffeeMakers}
          component={CoffeeMakersScreen}
          options={{ title: routes.coffeeMakers }}
        />
        <Tab.Screen
          name={routes.grinders}
          component={GrindersScreen}
          options={{ title: routes.grinders }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);

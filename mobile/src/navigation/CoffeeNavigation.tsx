import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";

import { coffeeRoutes } from "./routes";

import { CoffeeListScreen } from "@/screens/CoffeeListScreen";
import { NewCoffeeScreen } from "@/screens/NewCoffeeScreen";

const CoffeeStack = createNativeStackNavigator();

export function CoffeeNavigation() {
  return (
    <CoffeeStack.Navigator>
      <CoffeeStack.Screen
        name={coffeeRoutes.coffeeList}
        component={CoffeeListScreen}
        options={({ navigation }) => ({
          title: "Coffees",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate(coffeeRoutes.newCoffee)}
            >
              <Ionicons name="add" size={24} color="black" />
            </Pressable>
          ),
        })}
      />
      <CoffeeStack.Screen
        name={coffeeRoutes.newCoffee}
        // @ts-ignore
        component={NewCoffeeScreen}
        options={{
          title: "New Coffee",
        }}
      />
    </CoffeeStack.Navigator>
  );
}

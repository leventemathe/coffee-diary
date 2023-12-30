import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";

import { brewRoutes } from "./routes";

import { BrewListScreen } from "@/screens/BrewListScreen";
import { NewBrewScreen } from "@/screens/NewBrewScreen";

const BrewStack = createNativeStackNavigator();

export function BrewNavigation() {
  return (
    <BrewStack.Navigator>
      <BrewStack.Screen
        name={brewRoutes.brewList}
        component={BrewListScreen}
        options={({ navigation }) => ({
          title: "Brews",
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate(brewRoutes.newBrew)}>
              <Ionicons name="add" size={24} color="black" />
            </Pressable>
          ),
        })}
      />
      <BrewStack.Screen
        name={brewRoutes.newBrew}
        component={NewBrewScreen}
        options={{
          title: "New Brew",
        }}
      />
    </BrewStack.Navigator>
  );
}

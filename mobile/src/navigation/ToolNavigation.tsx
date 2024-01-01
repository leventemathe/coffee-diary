import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { toolRoutes } from "./routes";

import { NewCoffeeMakerScreen } from "@/screens/NewCoffeeMakerScreen";
import { NewGrinder } from "@/screens/NewGrinderScreen";
import { ToolListScreen } from "@/screens/ToolListScreen";

const ToolStack = createNativeStackNavigator();

export function ToolNavigation() {
  return (
    <ToolStack.Navigator>
      <ToolStack.Screen
        name={toolRoutes.toolList}
        // @ts-ignore
        component={ToolListScreen}
        options={{ title: "Tools" }}
      />
      <ToolStack.Screen
        name={toolRoutes.newCoffeeMaker}
        // @ts-ignore
        component={NewCoffeeMakerScreen}
        options={{ title: "New Coffee Maker" }}
      />
      <ToolStack.Screen
        name={toolRoutes.newGrinder}
        // @ts-ignore
        component={NewGrinder}
        options={{ title: "New Grinder" }}
      />
    </ToolStack.Navigator>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { toolRoutes } from "./routes";

import { ToolListScreen } from "@/screens/ToolListScreen";

const ToolStack = createNativeStackNavigator();

export function ToolNavigation() {
  return (
    <ToolStack.Navigator>
      <ToolStack.Screen name={toolRoutes.toolList} component={ToolListScreen} />
    </ToolStack.Navigator>
  );
}

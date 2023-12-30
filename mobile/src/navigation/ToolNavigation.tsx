import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ToolListScreen } from "@/screens/ToolListScreen";
import { toolRoutes } from "@/utils/routes";

const ToolStack = createNativeStackNavigator();

export function ToolNavigation() {
  return (
    <ToolStack.Navigator>
      <ToolStack.Screen name={toolRoutes.toolList} component={ToolListScreen} />
    </ToolStack.Navigator>
  );
}

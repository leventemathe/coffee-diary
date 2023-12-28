import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerRootComponent } from "expo";

import { TabNavigation } from "./navigation/TabNavigation";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TabNavigation />
    </QueryClientProvider>
  );
}

registerRootComponent(App);

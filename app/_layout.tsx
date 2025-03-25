import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ContextProvider } from "@/context/AppContext";
import BottomNavbar from "@/components/BottomNavbar";
import { routes } from "@/utils/routes";

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <ContextProvider>
      <Tab.Navigator
        screenOptions={{
          animation: "fade",
        }}
        tabBar={(props) => <BottomNavbar {...props} />}
      >
        {routes.map((route: any) => <Tab.Screen key={route.name} name={route.name} component={route.component} />)}
      </Tab.Navigator>
    </ContextProvider>
  );
}

import { ContextProvider } from "@/context/AppContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ContextProvider>
      <Stack screenOptions={{
        contentStyle: {
          paddingHorizontal: 10,
          paddingTop: 10,
        },
      }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="result" options={{ title: "Result" }} />
      </Stack>
    </ContextProvider>
  );
}

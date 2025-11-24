import { Stack } from "expo-router";
import { RetirementDateProvider } from "../src/components/RetirementDateProvider";
import { ModalProvider } from "../src/components/ModalProvider";

export default function RootLayout() {
  return (
    <RetirementDateProvider>
      <ModalProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="retirement-day"
            options={{
              title: "退職日",
              headerBackVisible: true,
              headerBackTitle: "戻る",
            }}
          />
        </Stack>
      </ModalProvider>
    </RetirementDateProvider>
  );
}

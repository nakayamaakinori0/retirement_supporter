import { Stack } from "expo-router";

export default function ForRetirementLetterLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F5FCF4",
        },
        headerTintColor: "#333",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="confirm"
        options={{
          title: "入力内容の確認",
        }}
      />
    </Stack>
  );
}

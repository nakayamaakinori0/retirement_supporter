import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#F5FCF4",
        },
        tabBarActiveTintColor: "#1DC3F4",
        tabBarInactiveTintColor: "#666",
        headerStyle: {
          backgroundColor: "#F5FCF4",
        },
        headerTintColor: "#333",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="form-retirement-letter"
        options={{
          title: "退職願・退職届",
          headerTitle: "退職願・退職届",
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          headerTitle: "ホーム",
        }}
      />
      <Tabs.Screen
        name="font-styles"
        options={{
          title: "フォント",
          headerTitle: "フォント一覧",
        }}
      />
    </Tabs>
  );
}


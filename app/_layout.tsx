import { useEffect } from "react";
import { Stack } from "expo-router";
import { RetirementDateProvider } from "../src/components/RetirementDateProvider";
import { ModalProvider } from "../src/components/ModalProvider";
import { initializeAds } from "../src/libs/initializeAds";

export default function RootLayout() {
  // 広告SDKの初期化とATTの同意取得はアプリ起動時に一度だけ行う
  useEffect(() => {
    initializeAds();
  }, []);

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
          <Stack.Screen
            name="form-retirement-letter-confirm"
            options={{
              title: "入力内容の確認",
              headerBackTitle: "戻る",
            }}
          />
        </Stack>
      </ModalProvider>
    </RetirementDateProvider>
  );
}

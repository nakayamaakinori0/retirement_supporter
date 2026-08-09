import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import dayjs from "../../src/libs/day";
import { useModal } from "../../src/hooks/useModal";
import CalenderModal from "../../src/components/CalenderModal";
import { DateData } from "react-native-calendars";
import { Colors } from "../../src/constants/colors";

export default function FormRetirementLetterScreen() {
  const [formType, setFormType] = useState<"願" | "届">("願");
  const [submissionDate, setSubmissionDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [retirementDate, setRetirementDate] = useState("");
  const router = useRouter();
  const { showModal } = useModal();
  const today = dayjs().format("YYYY-MM-DD");

  // 提出日のカレンダーモーダルハンドラー
  const handleSubmissionDatePress = (day: DateData) => {
    setSubmissionDate(day.dateString);
  };

  const handleOpenSubmissionDateCalendar = () =>
    showModal(
      () => (
        <CalenderModal
          onDayPress={handleSubmissionDatePress}
          selectedDate={submissionDate}
          minDate={today}
        />
      ),
      {},
      "upper",
      "upper"
    );

  // 退職予定日のカレンダーモーダルハンドラー
  const handleRetirementDatePress = (day: DateData) => {
    setRetirementDate(day.dateString);
  };

  const handleOpenRetirementDateCalendar = () =>
    showModal(
      () => (
        <CalenderModal
          onDayPress={handleRetirementDatePress}
          selectedDate={retirementDate}
          minDate={today}
        />
      ),
      {},
      "upper",
      "upper"
    );

  const handleConfirm = () => {
    router.push({
      pathname: "/form-retirement-letter-confirm",
      params: {
        formType,
        submissionDate: submissionDate
          ? dayjs(submissionDate).format("YYYY年MM月DD日")
          : "",
        companyName,
        employerName,
        departmentName,
        employeeName,
        retirementDate: retirementDate
          ? dayjs(retirementDate).format("YYYY年MM月DD日")
          : "",
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>書類タイプ</Text>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, formType === "願" && styles.activeType]}
            onPress={() => setFormType("願")}
          >
            <Text
              style={[
                styles.typeText,
                formType === "願" && styles.activeTypeText,
              ]}
            >
              退職願
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, formType === "届" && styles.activeType]}
            onPress={() => setFormType("届")}
          >
            <Text
              style={[
                styles.typeText,
                formType === "届" && styles.activeTypeText,
              ]}
            >
              退職届
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>提出日</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={handleOpenSubmissionDateCalendar}
        >
          <Text style={styles.dateText}>
            {submissionDate
              ? dayjs(submissionDate).format("YYYY年MM月DD日")
              : ""}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>会社名</Text>
        <TextInput
          style={styles.input}
          value={companyName}
          onChangeText={setCompanyName}
          placeholder="株式会社〇〇"
        />

        <Text style={styles.label}>雇用者名</Text>
        <TextInput
          style={styles.input}
          value={employerName}
          onChangeText={setEmployerName}
          placeholder="山田太郎"
        />

        <Text style={styles.label}>部署名</Text>
        <TextInput
          style={styles.input}
          value={departmentName}
          onChangeText={setDepartmentName}
          placeholder="〇〇部"
        />

        <Text style={styles.label}>氏名</Text>
        <TextInput
          style={styles.input}
          value={employeeName}
          onChangeText={setEmployeeName}
          placeholder="山田太郎"
        />

        <Text style={styles.label}>退職予定日</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={handleOpenRetirementDateCalendar}
        >
          <Text style={styles.dateText}>
            {retirementDate
              ? dayjs(retirementDate).format("YYYY年MM月DD日")
              : ""}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.generateButton} onPress={handleConfirm}>
          <Text style={styles.generateButtonText}>確認</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.primary,
  },
  typeSelector: {
    flexDirection: "row",
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: Colors.bg,
  },
  activeType: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeText: {
    fontSize: 16,
    color: Colors.secondary,
  },
  activeTypeText: {
    color: Colors.accent,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: Colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: Colors.bg,
    color: Colors.primary,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: Colors.bg,
  },
  dateText: {
    fontSize: 16,
    color: Colors.primary,
  },
  generateButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  generateButtonText: {
    color: Colors.accent,
    fontSize: 18,
    fontWeight: "bold",
  },
});

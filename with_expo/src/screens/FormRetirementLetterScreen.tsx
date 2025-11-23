import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export const FormRetirementLetterScreen = () => {
  const [formType, setFormType] = useState<'願' | '届'>('願');
  const [submissionDate, setSubmissionDate] = useState('2025年01月23日');
  const [companyName, setCompanyName] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [retirementDate, setRetirementDate] = useState('2025年02月23日');
  const router = useRouter();

  const handleConfirm = () => {
    if (!companyName || !employeeName) {
      Alert.alert('エラー', '会社名と氏名は必須項目です。');
      return false;
    }
    router.push({
      pathname: '/form-retirement-letter/confirm',
      params: {
        formType,
        submissionDate,
        companyName,
        employerName,
        departmentName,
        employeeName,
        retirementDate,
      },
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>書類タイプ</Text>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, formType === '願' && styles.activeType]}
            onPress={() => setFormType('願')}>
            <Text
              style={[
                styles.typeText,
                formType === '願' && styles.activeTypeText,
              ]}>
              退職願
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, formType === '届' && styles.activeType]}
            onPress={() => setFormType('届')}>
            <Text
              style={[
                styles.typeText,
                formType === '届' && styles.activeTypeText,
              ]}>
              退職届
            </Text>
          </TouchableOpacity>
        </View>

        <Text> 提出日 </Text>
        <TextInput
          style={styles.input}
          value={submissionDate}
          onChangeText={setSubmissionDate}
          placeholder="株式会社〇〇 御中"
        />

        <Text style={styles.label}>会社名 *</Text>
        <TextInput
          style={styles.input}
          value={companyName}
          onChangeText={setCompanyName}
          placeholder="株式会社〇〇"
        />

        <Text style={styles.label}>部署名</Text>
        <TextInput
          style={styles.input}
          value={departmentName}
          onChangeText={setDepartmentName}
          placeholder="〇〇部長"
        />

        <Text style={styles.label}>氏名 *</Text>
        <TextInput
          style={styles.input}
          value={employeeName}
          onChangeText={setEmployeeName}
          placeholder="山田太郎"
        />

        <Text style={styles.label}>退職予定日</Text>
        <TextInput
          style={styles.input}
          value={retirementDate}
          onChangeText={setRetirementDate}
          placeholder="2025年01月31日"
        />

        <Text style={styles.label}>提出日</Text>
        <TextInput
          style={styles.input}
          value={submissionDate}
          onChangeText={setSubmissionDate}
          placeholder="2025年01月01日"
        />

        <TouchableOpacity style={styles.generateButton} onPress={handleConfirm}>
          <Text style={styles.generateButtonText}>確認</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCF4',
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 8,
  },
  activeType: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  typeText: {
    fontSize: 16,
    color: '#666',
  },
  activeTypeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  generateButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

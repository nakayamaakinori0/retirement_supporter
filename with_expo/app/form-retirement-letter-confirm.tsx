import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    formType = '届',
    submissionDate = '',
    companyName = '',
    employerName = '',
    departmentName = '',
    employeeName = '',
    retirementDate = '',
  } = params;

  const handleEdit = () => {
    router.back();
  };

  const handleGenerate = () => {
    // TODO: PDF生成処理
    console.log('PDF生成');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.previewContainer}>
        {/* タイトル */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>退　　職　　{formType}</Text>
        </View>

        {/* 提出日 */}
        <View style={styles.submissionDateContainer}>
          <Text style={styles.submissionDate}>{submissionDate}</Text>
        </View>

        {/* 宛先 */}
        <View style={styles.recipientContainer}>
          <Text style={styles.companyName}>{companyName}</Text>
          <View style={styles.employerNameContainer}>
            <Text style={styles.employerLabel}>代表取締役</Text>
            <Text style={styles.employerName}>{employerName}</Text>
            <Text style={styles.honorific}>殿</Text>
          </View>
        </View>

        {/* 差出人 */}
        <View style={styles.senderContainer}>
          {departmentName ? (
            <Text style={styles.departmentName}>{departmentName}</Text>
          ) : null}
          <View style={styles.employeeNameContainer}>
            <Text style={styles.employeeName}>{employeeName}</Text>
            <Text style={styles.seal}>印</Text>
          </View>
        </View>

        {/* 本文 */}
        <View style={styles.bodyContainer}>
          <Text style={styles.privateNotation}>私儀</Text>
          <Text style={styles.bodyText}>
            このたび一身上の都合により、
          </Text>
          <Text style={styles.bodyText}>
            {retirementDate}をもって退職いたします。
          </Text>
        </View>

        {/* 結び */}
        <View style={styles.closingContainer}>
          <Text style={styles.closing}>以上</Text>
        </View>
      </View>

      {/* ボタン */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>修正</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
          <Text style={styles.generateButtonText}>生成</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCF4',
  },
  previewContainer: {
    margin: 20,
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 500,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 8,
  },
  submissionDateContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  submissionDate: {
    fontSize: 16,
  },
  recipientContainer: {
    marginBottom: 40,
  },
  companyName: {
    fontSize: 16,
    marginBottom: 5,
  },
  employerNameContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  employerLabel: {
    fontSize: 16,
  },
  employerName: {
    fontSize: 16,
    marginLeft: 8,
  },
  honorific: {
    fontSize: 16,
  },
  senderContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  departmentName: {
    fontSize: 16,
    marginBottom: 5,
  },
  employeeNameContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  employeeName: {
    fontSize: 16,
    marginRight: 5,
  },
  seal: {
    fontSize: 14,
  },
  bodyContainer: {
    marginBottom: 30,
    marginLeft: 20,
  },
  privateNotation: {
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 15,
    marginRight: 40,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 28,
  },
  closingContainer: {
    alignItems: 'flex-end',
    marginTop: 20,
    marginRight: 40,
  },
  closing: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#2E7D32',
    fontSize: 18,
    fontWeight: 'bold',
  },
  generateButton: {
    flex: 1,
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

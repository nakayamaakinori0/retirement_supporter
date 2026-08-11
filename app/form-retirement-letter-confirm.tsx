import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { generateRetirementLetterHTML } from '../src/libs/generateRetirementLetterPDF';
import { Colors } from '../src/constants/colors';
import { showInterstitialAd } from '../src/libs/interstitialAd';

export default function ConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleGenerate = async () => {
    if (isGenerating) return;

    setIsGenerating(true);

    // 広告はPDF生成の前に1回だけ挟む。
    // 広告が原因で生成が止まることは許容しないため、PDF生成の try とは
    // 分けて、ここで出た例外は握りつぶす
    try {
      await showInterstitialAd();
    } catch (error) {
      console.error('広告の表示に失敗しました:', error);
    }

    try {
      // 外部テンプレートを使用してHTMLを生成
      const html = generateRetirementLetterHTML({
        formType: String(formType),
        submissionDate: String(submissionDate),
        companyName: String(companyName),
        employerName: String(employerName),
        departmentName: String(departmentName),
        employeeName: String(employeeName),
        retirementDate: String(retirementDate),
      });

      // HTMLからPDFを生成
      const { uri } = await Print.printToFileAsync({ html });

      // 共有可能かチェック
      const isSharingAvailable = await Sharing.isAvailableAsync();

      if (isSharingAvailable) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: '退職届を共有',
          UTI: 'com.adobe.pdf',
        });
      } else {
        console.log('共有機能が利用できません');
      }
    } catch (error) {
      console.error('PDF生成エラー:', error);
    } finally {
      setIsGenerating(false);
    }
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
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEdit}
          disabled={isGenerating}
        >
          <Text style={styles.editButtonText}>修正</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.generateButton, isGenerating && styles.disabledButton]}
          onPress={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.generateButtonText}>生成</Text>
          )}
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
  previewContainer: {
    margin: 20,
    padding: 30,
    backgroundColor: Colors.bg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
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
    color: Colors.primary,
  },
  submissionDateContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  submissionDate: {
    fontSize: 16,
    color: Colors.primary,
  },
  recipientContainer: {
    marginBottom: 40,
  },
  companyName: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.primary,
  },
  employerNameContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  employerLabel: {
    fontSize: 16,
    color: Colors.primary,
  },
  employerName: {
    fontSize: 16,
    marginLeft: 8,
    color: Colors.primary,
  },
  honorific: {
    fontSize: 16,
    color: Colors.primary,
  },
  senderContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  departmentName: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.primary,
  },
  employeeNameContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  employeeName: {
    fontSize: 16,
    marginRight: 5,
    color: Colors.primary,
  },
  seal: {
    fontSize: 14,
    color: Colors.primary,
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
    color: Colors.primary,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 28,
    color: Colors.primary,
  },
  closingContainer: {
    alignItems: 'flex-end',
    marginTop: 20,
    marginRight: 40,
  },
  closing: {
    fontSize: 16,
    color: Colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: Colors.bg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: '600',
  },
  generateButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateButtonText: {
    color: Colors.accent,
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: Colors.secondary,
    opacity: 0.5,
  },
});

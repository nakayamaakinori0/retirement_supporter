import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

export const FormRetirementLetterScreen = () => {
  const [formType, setFormType] = useState<'願' | '届'>('願');
  const [companyName, setCompanyName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [reason, setReason] = useState('一身上の都合');
  const [retirementDate, setRetirementDate] = useState('2025年02月23日');
  const [submissionDate, setSubmissionDate] = useState('2025年01月23日');

  const generateHTML = () => {
    const title = formType === '願' ? '退職願' : '退職届';
    const content =
      formType === '願'
        ? `つきましては、${retirementDate}をもって退職いたしたく、ここにお願い申し上げます。`
        : `つきましては、${retirementDate}をもって退職いたします。`;

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Hiragino Mincho ProN', serif;
          width: 210mm;
          height: 297mm;
          margin: 0;
          padding: 20mm;
          box-sizing: border-box;
        }
        .title {
          text-align: center;
          font-size: 24pt;
          margin-bottom: 40px;
        }
        .content {
          margin: 40px 0;
          line-height: 2;
          font-size: 14pt;
        }
        .date {
          text-align: right;
          margin: 20px 0;
        }
        .recipient {
          margin: 20px 0;
        }
        .sender {
          text-align: right;
          margin: 40px 0;
        }
      </style>
    </head>
    <body>
      <h1 class="title">${title}</h1>
      
      <div class="recipient">
        ${companyName}<br/>
        ${departmentName} 御中
      </div>
      
      <div class="content">
        私事、<br/>
        このたび、${reason}により、退職させていただきたく存じます。<br/>
        ${content}
      </div>
      
      <div class="date">${submissionDate}</div>
      
      <div class="sender">
        ${employeeName} 印
      </div>
    </body>
    </html>
    `;
  };

  const generatePDF = async () => {
    try {
      if (!companyName || !employeeName) {
        Alert.alert('エラー', '会社名と氏名は必須です');
        return;
      }

      const options = {
        html: generateHTML(),
        fileName: `${formType === '願' ? '退職願' : '退職届'}_${new Date()
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, '')}`,
        directory: Platform.OS === 'ios' ? 'Documents' : 'Download',
      };

      const file = await RNHTMLtoPDF.convert(options);

      if (file.filePath) {
        Alert.alert('成功', 'PDFが生成されました', [
          {text: 'キャンセル', style: 'cancel'},
          {
            text: '共有',
            onPress: () => sharePDF(file.filePath!),
          },
        ]);
      }
    } catch (error) {
      Alert.alert('エラー', 'PDF生成に失敗しました');
    }
  };

  const sharePDF = async (filePath: string) => {
    try {
      await Share.open({
        url: Platform.OS === 'ios' ? filePath : `file://${filePath}`,
        type: 'application/pdf',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

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

        <Text style={styles.label}>退職理由</Text>
        <TextInput
          style={styles.input}
          value={reason}
          onChangeText={setReason}
          placeholder="一身上の都合"
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

        <TouchableOpacity style={styles.generateButton} onPress={generatePDF}>
          <Text style={styles.generateButtonText}>PDFを生成</Text>
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

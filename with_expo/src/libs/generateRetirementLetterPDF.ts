export interface RetirementLetterData {
  formType: string;
  submissionDate: string;
  companyName: string;
  employerName: string;
  departmentName: string;
  employeeName: string;
  retirementDate: string;
}

export const generateRetirementLetterHTML = (
  data: RetirementLetterData
): string => {
  const {
    formType,
    submissionDate,
    companyName,
    employerName,
    departmentName,
    employeeName,
    retirementDate,
  } = data;

  return `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'MS Mincho', 'Yu Mincho', serif;
          padding: 60px;
          line-height: 1.8;
        }
        .title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 12px;
          margin: 40px 0 60px 0;
        }
        .submission-date {
          text-align: right;
          font-size: 14px;
          margin-bottom: 40px;
        }
        .recipient {
          margin-bottom: 50px;
        }
        .company-name {
          font-size: 14px;
          margin-bottom: 8px;
        }
        .employer-name {
          font-size: 14px;
        }
        .sender {
          text-align: right;
          margin-bottom: 40px;
        }
        .department-name {
          font-size: 14px;
          margin-bottom: 8px;
        }
        .employee-name {
          font-size: 14px;
        }
        .seal {
          display: inline-block;
          margin-left: 8px;
          font-size: 12px;
        }
        .body {
          margin: 40px 0 40px 30px;
        }
        .private-notation {
          text-align: right;
          margin-bottom: 20px;
          margin-right: 60px;
          font-size: 14px;
        }
        .body-text {
          font-size: 14px;
          margin-bottom: 10px;
        }
        .closing {
          text-align: right;
          margin-top: 30px;
          margin-right: 60px;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="title">退　　職　　${formType}</div>

      <div class="submission-date">${submissionDate}</div>

      <div class="recipient">
        <div class="company-name">${companyName}</div>
        <div class="employer-name">代表取締役 ${employerName} 殿</div>
      </div>

      <div class="sender">
        ${departmentName ? `<div class="department-name">${departmentName}</div>` : ''}
        <div class="employee-name">${employeeName}<span class="seal">印</span></div>
      </div>

      <div class="body">
        <div class="private-notation">私儀</div>
        <div class="body-text">このたび一身上の都合により、</div>
        <div class="body-text">${retirementDate}をもって退職いたします。</div>
      </div>

      <div class="closing">以上</div>
    </body>
    </html>
  `;
};

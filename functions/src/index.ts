


const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

function inquiryTypeToJapanese(type: string): string {
  switch (type) {
    case 'general':
      return '一般';
    case 'feedback':
      return 'フィードバック';
    case 'complaint':
      return '苦情';
    // 他のタイプに対する日本語の変換もここに追加できます
    default:
      return type; // 未知のタイプの場合、元の値をそのまま返す
  }
}

exports.sendEmailConfirmation = functions.database.ref('/inquiries/{inquiryId}')
  .onCreate((snapshot: any, context: any) => {
    const inquiry = snapshot.val();

    const mailOptions = {
      from: '"Your Company Name" <noreply@yourcompany.com>',
      to: inquiry.email,
      subject: '問い合わせの確認',
      text: `問い合わせを受け付けました。以下の内容でお問い合わせを受け付けました。
      名前: ${inquiry.name}
      年齢: ${inquiry.age}
      問い合わせタイプ: ${inquiryTypeToJapanese(inquiry.inquiryType)}
      電話番号: ${inquiry.tel}
      メールアドレス: ${inquiry.email}
      住所: ${inquiry.address}
      備考: ${inquiry.notice}
      プライバシーポリシー: ${inquiry.privacyPolicy ? '同意する' : '同意しない'}
      ありがとうございます。`,
    };

    return mailTransport.sendMail(mailOptions)
      .then(() => {
        console.log('Email sent to:', inquiry.email);
      })
      .catch((error: any) => {
        console.error('Error sending email:', error);
      });
  });

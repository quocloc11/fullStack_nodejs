//const { config } = require('dotenv')

require('dotenv').config();
import nodemailer from 'nodemailer'
let sendSimpleEmail=async (dataSend)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        }
      });
        let info = await transporter.sendMail({
          from: '"Quoc loc 👻" <tranquocloc1201@gmail.com>', // sender address
          to: dataSend.reciverEmail, // list of receivers
          subject: "Thông tin đặt lịch khám bệnh", // Subject line
          text: "Hello world?", // plain text body
          html: getBodyHTMLEmail(dataSend),
        });
}

let getBodyHTMLEmail=(dataSend)=>{
  let result = ''
  if(dataSend.language === 'vi'){
      result=
      `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bênh trên quốc lộc</p>
        <p>Thông tin đặt lịch khám bênh:</p>
        <div><b>Thời gian: ${dataSend.time}</></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</></div>

        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt khám bệnh</p>
          <div>
          <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
          </div>
          <div>Xin chân thành cảm ơn</div>
        `
  }
  if(dataSend.language=== 'en'){
          result=
          `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You are receiving this email because you have scheduled a medical examination on the national highway</p>
        <p>Information on scheduling medical examinations:</p>
        <div><b>Time: ${dataSend.time}</></div>
        <div><b>Doctor: ${dataSend.doctorName}</></div>

        <p>If the above information is true, please click on the link below to confirm and complete the medical examination booking procedure.</p>
          <div>
          <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
          </div>
          <div>Sincerely thank!</div>
        `
  }
  return result;
 }

 let getBodyHTMLEmailRemedy = (dataSend)=>{
  let result = ''
  if(dataSend.language === 'vi'){
      result=
      `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bênh online trên quốc lộc thành công</p>
        <p>Thông tin đon thuoc hoa don duoc gui trong file dinh kem:</p>
        <p>Thông tin được gửi trong file đính kèm</p>
        
          <div>Xin chân thành cảm ơn</div>
        `
  }
  if(dataSend.language === 'en'){
          result=
          `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You are receiving this email because you have scheduled a medical examination on the national highway</p>
        <p>Information on scheduling medical examinations:</p>
          <div>Sincerely thank!</div>
        `
  }
  return result;
}

 let sendAttachment=async(dataSend)=>{
  return new Promise(async(resolve,reject)=>{

    try{
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    }
  });
    let info = await transporter.sendMail({
      from: '"Quoc loc 👻" <tranquocloc1201@gmail.com>', // sender address
      to: dataSend.email, // list of receivers
      subject: "Kết quả đặt lịch khám bệnh", // Subject line
      html: getBodyHTMLEmailRemedy(dataSend),
      attachments:[{
        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
        content: dataSend.imgBase64.split("base64,")[1],
        encoding:'base64'
      }
      ]
    });
    resolve(true)
  }catch(e){
    reject(e)
  }
  })
 }

module.exports={
    sendSimpleEmail:sendSimpleEmail,
    sendAttachment:sendAttachment
}

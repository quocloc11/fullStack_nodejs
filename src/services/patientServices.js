import db from '../models/index'
require('dotenv').config()
import emailService from './emailService'
let postBookAppointment = (data) =>{
    return new Promise(async (resolve,reject)=>{
        try{
            if(!data.email || !data.doctorId || !data.timeType || !data.timeType || !data.date
                || !data.fullName
                ){
                resolve({
                    errCode:1,
                    errMessage:'Missing parmeter'
                })
            }else{
                
                await emailService.sendSimpleEmail({
                    reciverEmail:data.email,
                    patientName:data.fullName,
                    time:data.timeString,
                    doctorName:data.doctorName,
                    language:data.language,
                    redirectLink:'https://www.youtube.com/watch?v=Mrmv1gCEMRk&list=PLgPzXsTqAkBR09I0MlBE4Ky6OQ-Jn6W2H&index=8'
                })

                let user=await db.User.findOrCreate({
                    where:{email:data.email},
                    defaults:{
                        email:data.email,
                        roleId:'R3'
                    }
                })

                console.log('usss',user[0])
                if(user && user[0]){
                    await db.Booking.findOrCreate({
                        where:{ patientId:user[0].id },
                        defaults:{
                            statusId:'S1',
                            doctorId:data.doctorId,
                            patientId:user[0].id,
                            date:data.date,
                            timeType:data.timeType,
                        }

                    })
                }

                resolve({
                    errCode:0,
                    errMessage:'Save infor paitent succed!'
                })
            }
        }catch(e){
            reject(e)
        }
    })

}
module.exports = {
    postBookAppointment:postBookAppointment
}
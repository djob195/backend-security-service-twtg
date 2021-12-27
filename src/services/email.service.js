const nodemailer = require('nodemailer');
const {EmailConfig} = require("configs-twtg");
const _getTransport = () =>{
    return nodemailer.createTransport({
        service: EmailConfig.service,
        auth: {
          user: EmailConfig.authUser,
          pass: EmailConfig.authPassword
        }
      });
}

const _getEmailOptions = (subject, email, password) =>{
    return {
        from: EmailConfig.authUser,
        to: email,
        subject,
        text: `Hola, gracias por escogernos, tu contraseña es: ${password}`,
        html: _bodyPassword(password,email)
    }
}

const _bodyPassword = (password,email) => {
    return `
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="6z
    <tr>
        <td bgcolor="#70bbd9">
            <td align="center" bgcolor="#20419a" style="padding: 40px 0 30px 0;">
                <img src="https://firebasestorage.googleapis.com/v0/b/twowheelstogo-572d7.appspot.com/o/logotipos%2FDLlogo2.png?alt=media&token=24fc77df-61df-4aaf-9c42-0f533a281aa8" alt="Logo de delivery lab" width="550" height="150" style="display: block;" />
            </td>
        </td>
    </tr>
    <tr>
        <td  bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
            <h1 style="color: #000; font-family: Arial, sans-serif; font-size: 24px; padding-bottom: 20px; text-align:center;font-weight:700;">BIENVENIDO A DELIVERY LAB</h1>
            <p style="color: #BEBEBE; font-family: Arial, sans-serif; font-size: 16px;"> CONECTATE A LA SIGUIENTE PÁGINA https://tw2g.app/login </p>
            <p style="color: #BEBEBE; font-family: Arial, sans-serif; font-size: 16px;">UTILIZA LOS SIGUIENTES DATOS DE AUTENTICACIÓN</p>
            <div style="border: 1px solid #dcdcdc; padding: 30px 30px 10px 30px;">
            <p style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">Usuario:  <strong style="color: #008BFF;padding-left:5px;">${email}</strong></p>
                    <p style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">Contraseña:<strong style="color: #008BFF;padding-left:5px;">${password}</strong></p>
            </div>
        </td>
    </tr>
    <tr >
        <td bgcolor="#20419a" style="padding: 10px 30px 10px 30px;">
        <h6 style="color:#dcdcdc;"> Derechos reservados por Delivery Lab &#169; </h6>
        </td>
    </tr>
</table>
    `;
}

module.exports = {
    sendPassword: async (email, password) =>{
        let transporter = _getTransport();
        let mailOptions = _getEmailOptions('Acceso a tu Delivery Lab', email, password);
        try {
            await transporter.sendMail(mailOptions);   
        } catch (error) {
            let err = new Error("");
            throw err;
        }
    },
    forgotPassword: async (email, password) =>{
        let transporter = _getTransport();
        let mailOptions = _getEmailOptions('Recuperación de tu contraseña de tu Delivery Lab', email, password);
        try {
            await transporter.sendMail(mailOptions);   
        } catch (error) {
            let err = new Error("");
            throw err;
        }
    },
};

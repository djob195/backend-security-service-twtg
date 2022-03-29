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
        html: _bodyPassword(password)
    }
}

const _bodyPassword = (password) => {
    return `
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="6
        <tr>
            <td bgcolor="#70bbd9">
                <td align="center" bgcolor="#20419a" style="padding: 40px 0 30px 0;">
                    <img src="https://twowheelstogo-572d7.web.app/static/media/DLlogo.28780847.png" alt="Logo de delivery lab" width="550" height="150" style="display: block;" />
                </td>
            </td>
        </tr>
        <tr>
            <td  bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                <h1 style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">Gracias por pertenecer a Delivery Lab</h1>
				<p style="color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">Ingresa la siguiente contraseña, para entrar al portal de Delivery Lab: <strong>${password}</strong></p>
            </td>
        </tr>
        <tr>
            <td bgcolor="#20419a" style="padding: 10px 30px 10px 30px;" style="color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                Derechos reservados por Delivery Lab &#169;
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

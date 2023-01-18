import { https } from "firebase-functions";
import { defineString } from 'firebase-functions/params'
import * as cors from 'cors'
import * as sgMail from '@sendgrid/mail'


/** */
const corsHandler = cors({ origin: true })
const sendGridAPIKey = defineString('SENDGRID_API_KEY')
const sendGridTemplateID = defineString('SENDGRID_TEMPLATE_ID')
const sendGridSenderEmail = defineString('SENDGRID_SENDER_EMAIL')
sgMail.setApiKey(sendGridAPIKey.value())


/** */
export const sendMail = https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    const { to = null, name = null, total = null, products = null } = req.body.data || {}

    if ( !!to || !!name || !!total || Array.isArray(products) ) {
      sgMail
        .send({
          from: {
            name: 'Óptica Merida',
            email: sendGridSenderEmail.value(),
          },
          to,
          subject: 'Factura electronica',
          templateId: sendGridTemplateID.value(),
          dynamicTemplateData: { name, total, products }
        })
        .then(sgMailRes => {
          res.status(sgMailRes[0].statusCode).json({
            message: 'Mail sent succesfuly'
          })
        }).catch(error => {
          res.status(500).json({ error })
        })
    } else
      res.status(400).json({
        message: "to, name, total, products attrs are required",
        to, name, total, products,
      })
  })
})

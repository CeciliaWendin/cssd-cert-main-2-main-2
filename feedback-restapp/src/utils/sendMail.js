import mailUtil from '@sitevision/api/server/MailUtil';
import logUtil from '@sitevision/api/server/LogUtil';
//import i18n from '@sitevision/api/common/i18n';

function sendMail(mailData) {

   logUtil.info(JSON.stringify(mailData.pageName));
   try {

      const mailBuilder = mailUtil.getMailBuilder();

      const mail = mailBuilder
         .setSubject(` ${mailData.pageName}`)
         .setHtmlMessage(`${mailData.userName} has provided this feedback: ${mailData.feedback},
         Link to site: <a href="${mailData.pageURL}">${mailData.pageName}</a> `)
         .addRecipient(mailData.email)
         .build();

      mail.send();

      // Om e-posten skickades utan fel, returnera true
      return true;
   } catch (error) {
      // eslint-disable-next-line no-undef
      console.error("Cant send email:", error);

      // Om ett fel uppstod vid e-postskickning, returnera false
      return false;
   }
}

export default sendMail;
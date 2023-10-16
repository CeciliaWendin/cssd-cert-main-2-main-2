import router from "@sitevision/api/common/router";
import sendMail from '../utils/sendMail';
//import logUtil from "@sitevision/api/server/LogUtil";

router.get("/sendMail", (req, res) => {

let mail = {
  email: req.params.email,
  userName: req.params.userName,
  feedback: req.params.feedback,
  pageURL: req.params.pageURL,
  pageName: req.params.pageName,
}
   const mailSent = sendMail(mail);

   if (mailSent) {
      return res.status(204).send("Email was successfully sent.");
    } else {
      return res.status(400).send("Failed to send Email.");
    }
});
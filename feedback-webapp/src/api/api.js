import restAppInvokerFactory from "@sitevision/api/server/RestAppInvokerFactory";
const restApp = restAppInvokerFactory.fromPath("rest-api/feedback-restapp");
import logUtil from '@sitevision/api/server/LogUtil';

function sendMail(mail) {
    logUtil.info(`API: ${JSON.stringify(mail)}`);
    let data = restApp.get('/sendMail', {
        email: mail.email,
        userName: mail.userName,
        feedback: mail.feedback,
        pageName: mail.pageName,
        pageURL: mail.pageURL
    }).body;

    return data;
}

export { sendMail }
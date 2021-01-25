/**
 * 发送信息
 * @param {*} params 
 * @param {*} axios 
 */
function sendMessage(params,axios) {
    return axios.post('https://api.ukeducations.cn/sms/message',{phoneNumbers: params.phoneNumbers});
}
/**
 * 判断验证码是否有效
 * @param {*} params 
 */
function verification(params,axios) {
    return axios.post('https://api.ukeducations.cn/sms/verification/authcode',{...params});
}

/**
 * 发送邮件
 * @param {*} params 
 * @param {*} axios 
 */
function sendMail(params,axios) {
    let name = params.name;
    let phoneNumbers = params.phoneNumbers;
    return axios.get(`https://adstocnapi.westwin.com/api/Customer/Receive?CustomerName=${name}&CustomerPhone=${phoneNumbers}&CustomerDescription=defaultValue&CustomerEmail=info%40ukeducations.cn&CustomerCompany=westwin&CustomerWebSite=defaultwebsite.com&CustomerType=18`)
}

export {
    sendMessage,
    sendMail,
    verification
}






import axios from 'axios';
import _ from 'lodash';

let strapiErrors =(response, fetcher) => {
    let statusCode;
    let errors = []
    if (fetcher === "axios") {
        return processAxiosErrors(response)
    }
    processStatus(response)
}

/**
 * @typedef {import('axios').AxiosResponse} GenericResponse
 * @param {GenericResponse} res
 */
let processAxiosErrors = (res) => {
    let { statusCode = res.status, statusMsg = res.statusText } = res.data
    processStatus(statusCode)
    let { errObj } = processAxiosErrMsgs(res)
    return { statusCode, statusMsg, errObj }
}

/**
 * @typedef {import('koa').BaseResponse|import("@hapi/boom")|
 * import('axios').AxiosResponse} GenericResponse
 * @param {GenericResponse} res
 */
let processStatus = async (status) => {
    if (status === 400) {
    }
}

let processAxiosErrMsgs = (res) => {
    let mergedErrors = _.merge(res.data.data, res.data.message)
    let errObj = {}
    mergedErrors.forEach(msgObj => {
        msgObj.messages.forEach(obj => {
            let { id, message } = obj
            errObj[id] = message
        });
    });
    console.log(errObj)
    return { errObj }
}
export default strapiErrors 
export let errorsLibrary = {
    "login_params_missing": { msg: "Some login parameters are missing." },
    "network_err": { msg: "Network error." },
    "Auth.form.error.invalid": { msg: "Password and username/email do not match." },
    "Auth.form.error.confirmed": { msg: "Your account email is not confirmed." },
    "Auth.form.error.password.provide":{msg:"Please provide your password."},
    "Auth.form.error.email.provide":{msg:"Please provide your email."},
    "Auth.form.error.email.format":{msg:"Please provide valid email address."},
    "Auth.form.error.username.taken":{msg:"Username already taken."},

}
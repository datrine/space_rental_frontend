import axios from 'axios';
import _ from 'lodash';

let strapiErrors = (response, fetcher) => {
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
    let errObj = {}
    let { data } = res;
    if (data.statusCode === 403) {
        errObj["Access.Forbidden"] = "Unauthorized to access resource."
    }
    if (typeof data?.data === "object" && typeof data?.message === "object") {
        let mergedErrors = _.merge(data.data, data.message)
        errObj = {}
        mergedErrors.forEach(msgObj => {
            msgObj.messages.forEach(obj => {
                let { id, message } = obj
                errObj[id] = message
            });
        });
    }

    console.log(errObj)
    return { errObj }
}
export default strapiErrors
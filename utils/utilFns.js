import { getSession, signIn, useSession } from "next-auth/client";
import { DateTime, Interval } from "luxon"
import { nanoid } from "nanoid";
import { DateUtils } from "react-day-picker";
import { uniqueId } from "lodash";
import { space } from "./models/space";
import {buildDateInfo,dateRangeFromDateStrings,dateStringsFromDateRange,datesFromStrings,
    stringsFromDates,daysSorter,rangeFromDates,listOfDatesBetween,numberOfDays} from "./dateFns"

export let appColor = "#60941a"

function stateMgr() {
    let loadingState = {
        None: 0,
        Loading: 1,
        Failed: 2,
        Loaded: 3,
        Current: undefined,
        getLoadingState() {
            return this.Current;
        },
        setLoadingState(state) {
            for (const key in this) {
                if (this[key] === state) {
                    this.Current = this[key];
                    //console.log("Initial current is set to " + this.Current)
                    return
                }
            }
        },
        init() {
            let { None, setLoadingState } = this
            setLoadingState(None)
            return this;
        }
    }
    return loadingState.init()
}

let screenMgr = () => {
    if (typeof window !== "undefined") {
        let screenType;
        let screenWidth = screen.width
        if (screenWidth < 992) {
            screenType = "small";
            return { screenType }
        }
        else if (screenWidth >= 992) {
            screenType = "large";
            return { screenType }
        }
    }
}

async function middlewareRunner(req, res, middleware) {
    return new Promise((resolve, reject) => {
        //console.log("SAZDSXDXDF");
        middleware(req, res, (result) => {
            if (result instanceof Error) {
                // console.log(result)
                return reject(result);
            }
            //console.log(result)
            return resolve(result);
        });
    })
}

let memoFn = (() => {
    let cache = {}
    let timeId = 0;
    return async (...args) => {
        clearTimeout(timeId)
        timeId = setTimeout(() => {
            cache = {}
            console.log("Cache cleared...")
        }, 40000)
        if (typeof args[0] === "function") {
            let fn = args[0]
            let memoKey = args[args.length - 1]
            if (memoKey in cache) {
                return cache[memoKey];
            }
            Array.prototype.splice.call(args, 0, 1);
            Array.prototype.splice.call(args, args.length - 1, 1);
            cache[memoKey] = await new Promise(async (res, rej) => {
                try {
                    let result = await fn(...args)
                    return res(result)
                } catch (error) {
                    return rej({ err: error })
                }
            })
            return cache[memoKey]
        }
        else {
            let memoKey = args[0];
            Array.prototype.splice.call(args, 0, 1);
            if (args.length > 0) {
                let obj = { ...args[0] }
                cache[memoKey] = obj
            }
            return cache[memoKey];
        }
    }
})();
/**
 * 
 * @param {Object} opts
 * @param {string} opts.nameOfColumnOnDb
 * @param {File} opts.files
 * @param {FormData} opts.formData
 */
let procMulFiles = (opts = { nameOfColumnOnDb, files, formData }) => {
    if (typeof files === "object") {
        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            procSingleFile({ file, nameOfColumnOnDb, formData })
        }
    }
    return opts.formData
}

/**
 * 
 * @param {Object} opts
 * @param {string} opts.field The field of the entry which the file(s) will be precisely linked to.
 * @param {FileList} opts.files
 * @param {string?} opts.url The url to send to
 * @param {string?} opts.path (optional).The folder where the file(s) will be uploaded to 
 * @param {number} opts.refId The ID of the entry which the file(s) will be linked to.
 * @param {string} opts.ref The name of the model which the file(s) will be linked to.
 * @param {string?} opts.source (optional): The name of the plugin where the model is located.
 */
let uploader = async (opts = { files, formData, field, path, url, ref, refId, source: "upload" }) => {
    try {
        let url = opts.url ? opts.url : `${process.env.NEXT_PUBLIC_CMS_URL}/upload`
        let session = await getSession();
        let formData = new FormData()
        for (let index = 0; index < opts.files.length; index++) {
            const file = opts.files[index];
            formData.append("files", file, file.name)
        }
        formData.set("field", opts.field)
        formData.set("ref", opts.ref)
        formData.set("refId", opts.refId)
        formData.set("path", opts.path)
        formData.set("source", opts.source)
        let res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${session.user.jwt}`
            },
            body: formData
        });
        let data = await res.json()
        // console.log(data)
        if (res.status >= 400) {
            throw data
        }
        return { data }
    } catch (err) {
        // console.log(err)
        throw err
    }

}

let generalPutAPI = async (opts = { url, model, entryId, dataReq }) => {
    try {
        let { url, model, entryId, dataReq } = opts
        //console.log(dataReq)
        if (!url && !model) {
            throw "Either a model or a url";
        }
        if (model) url = `${process.env.NEXT_PUBLIC_CMS_URL}/${model}/${entryId}`
        let session = await getSession();
        let res = await fetch(url, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${session.user.jwt}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataReq)
        })
        let dataRes = await res.json()
        //console.log(dataRes)
        return { data: dataRes }
    } catch (error) {
        // console.log(error)
        return { err: error }
    }
}

let autoSignIn = async ({ callbackUrl }) => {
    let { user } = await getSession()

    return await signIn("credentials", {
        strapiToken: user.jwt,
        strapiProfileId: user.profileId,
        callbackUrl: callbackUrl ? callbackUrl : "/dashboard",
    })
}

let imgObjProcessor = (obj = {}, format) => {
    if (format) {
        if (obj.formats) {
            if (format === "large") {
                return obj.formats["large"]
            }
            if (format === "medium") {
                return obj.formats["medium"]
            }
            if (format === "small") {
                return obj.formats["small"]
            }
        }
    }
    return obj;
}

let getImgUrl = (obj, format) => {
    let imgObj = imgObjProcessor(obj, format);
    return imgObj?.url;
}


let IdObj = (obj) => {
    if (typeof obj !== "object") {
        throw `${obj} must be an object`
    }
    if (!obj["id"]) {
        obj["id"] = uniqueId()
    }
    //console.log(obj["id"])
    return obj
}

let spaceB = space.spaceBills
/**
 * 
 * @param {spaceB} spaceBills 
 */
let billEstimator = (spaceBills, lengthOfStay) => {
    let billEstimate = 0;
    if (spaceBills.billFormat === "day") {
        billEstimate = Number(lengthOfStay) *
            Number(spaceBills.charge)
    }
    else
        if (spaceBills.billFormat === "week") {
            billEstimate = (Number(lengthOfStay) / 7) *
                Number(spaceBills.charge)
        }
        else
            if (spaceBills.billFormat === "month") {
                billEstimate = (Number(lengthOfStay) / 31) *
                    Number(spaceBills.charge)
            }
    billEstimate = (Number(billEstimate + Number(spaceBills.otherBills) || 0)).toFixed(2)
    console.log('billEstimate: ' + billEstimate);
    return billEstimate
}
export {
    middlewareRunner, memoFn, screenMgr, stateMgr, procMulFiles, uploader,
    generalPutAPI, autoSignIn, imgObjProcessor, getImgUrl, buildDateInfo, daysSorter,
    listOfDatesBetween, datesFromStrings, stringsFromDates, numberOfDays, IdObj, rangeFromDates,
    dateRangeFromDateStrings, dateStringsFromDateRange, billEstimator
};
import validator from 'validator';
import { memoFn } from "./utilFns"
let registerValidator = async (instance = {
    userEmail: "", userName: "", userPhone: "", userPass: "", userRePass: "", referral
}) => {
    let { userEmail, userName, userPass, userPhone, userRePass, referral } = instance
    console.log(instance)
    let errorList = []

    if (!validator.isLength(userName, { min: 1 })) {
        let errObj = {
            msg: "Username cannot be blank",
            info: "Fill username",
            prop: "userName",
            value: userName
        }
        errorList.push(errObj)
    }

    if (!validator.isLength(userName, { min: 4 })) {
        let errObj = {
            msg: "Username length cannot be less than 4",
            info: "Username length must be up to 4.",
            prop: "userName",
            value: userName
        }
        errorList.push(errObj)
    }
    else {
        try {
            let res = await memoFn(fetch, `/api/verify/username?q=${userName}`, {
                method: "GET"
            }, userName)
            let resObj;
            if (("bodyUsed" in res) && (res.bodyUsed === false)) {
                resObj = await memoFn(userName, await res.json())
            }
            else if (("isExistingUsername" in res)) {
                resObj = await memoFn(userName);
            }
            let { isExistingUsername, err } = resObj
            if (isExistingUsername) {
                let errObj = {
                    msg: "Username already exists",
                    info: "Ensure username is unique",
                    prop: "userName",
                    value: userName,
                }
                errorList.push(errObj)
            } else if (err) {
                let errObj = {
                    msg: err,
                    info: "Retry later please...",
                    prop: "userName",
                    value: userName,
                }
                errorList.push(errObj)
            }
        } catch (error) {
            let errObj = {
                msg: error,
                info: "Retry later please...",
                prop: "userName",
                value: userName,
            }
            errorList.push(errObj)
        }
    }
    if (!validator.isMobilePhone(userPhone, "en-NG")) {
        let errObj = {
            msg: "Phone format is not valid",
            info: "Ensure phone is a valid format",
            prop: "userPhone",
            value: userPhone,
        }
        errorList.push(errObj)
    }

    if (!validator.isEmail(userEmail)) {
        let errObj = {
            msg: "Email is not valid",
            info: "Ensure email is a valid format",
            prop: "userEmail",
            value: userEmail,
        }
        errorList.push(errObj)
    }
    else if (validator.isEmail(userEmail)) {
        try {
            let res = await memoFn(fetch, `/api/verify/email?q=${userEmail}`, {
                method: "GET"
            }, userEmail)
            let resObj;
            if (("bodyUsed" in res) && (res.bodyUsed === false)) {
                resObj = await memoFn(userEmail, await res.json())
                console.log(resObj)
            }
            else if (("isExistingEmail" in res)) {
                resObj = await memoFn(userEmail);
            }
            let { isExistingEmail, err } = resObj
            if (isExistingEmail) {
                let errObj = {
                    msg: "Email already exists",
                    info: "Ensure email is unique",
                    prop: "userEmail",
                    value: userEmail,
                }
                errorList.push(errObj)
            } else if (err) {
                let errObj = {
                    msg: err,
                    info: "Retry later please...",
                    prop: "userEmail",
                    value: userEmail,
                }
                errorList.push(errObj)
            }
        } catch (error) {
            let errObj = {
                msg: error,
                info: "Retry later please...",
                prop: "userEmail",
                value: userEmail,
            }
            errorList.push(errObj)
        }
    }

    if (validator.isAlpha(userPass)) {
        let errObj = {
            msg: "Password not valid without a number or a special character",
            info: "Include a number or a special character",
            prop: "userPass",
            value: userPass,
        }
        errorList.push(errObj)
    }

    let passwordScore = validator.isStrongPassword(userPass,
        {
            minLength: 6, minLowercase: 1, minUppercase: 0, minNumbers: 1,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10, pointsForContainingLower: 8, pointsPerUnique: 8,
            pointsForContainingUpper: 8, returnScore: true
        })
    if (passwordScore < 70) {
        let errObj = {
            msg: "Password not strong enough",
            info: "Ensure password length is at least 6 characters and has at least a number",
            prop: "userPass",
            value: userPass,
        }
        errorList.push(errObj)
    }

    if (!validator.equals(userPass, userRePass)) {
        let errObj = {
            msg: "Passwords don't match",
            info: "",
            prop: "userPass",
            value: userPass,
        }
        errorList.push(errObj)
    }

    if (errorList.length > 0) {
        return { valid: false, errorList };
    };
    return { valid: true, instance };
}



let fetchError = ({ errorList = [], prop = "" }) => {
    if (prop) {
        let errObj = errorList.find(errObj => errObj.prop === prop);
        if (typeof errObj === "object") {
            return errObj;
        }
        return false;
    }
}

export { registerValidator, fetchError }
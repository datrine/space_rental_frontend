import validator from 'validator';
import { memoFn } from "./utilFns"
let registerValidator = async (instance = {
    email: "", username: "", phonenum: "", password: "", repass: "", referral
}) => {
    let { email, username, password, phonenum, repass: repass, referral } = instance
    console.log(instance)
    let errorList = []

    if (!validator.isLength(username, { min: 1 })) {
        let errObj = {
            msg: "Username cannot be blank",
            info: "Fill username",
            prop: "username",
            value: username
        }
        errorList.push(errObj)
    }

    if (!validator.isLength(username, { min: 4 })) {
        let errObj = {
            msg: "Username length cannot be less than 4",
            info: "Username length must be up to 4.",
            prop: "username",
            value: username
        }
        errorList.push(errObj)
    }
    else {
        try {
            let res = await memoFn(fetch, `/api/verify/username?username=${username}`, {
                method: "GET"
            }, username)
            let resObj;
            if (("bodyUsed" in res) && (res.bodyUsed === false)) {
                resObj = await memoFn(username, await res.json())
            }
            else if (("isExistingUsername" in res)) {
                resObj = await memoFn(username);
            }
            let { isExistingUsername, err } = resObj
            if (isExistingUsername) {
                let errObj = {
                    msg: "Username already exists",
                    info: "Ensure username is unique",
                    prop: "username",
                    value: username,
                }
                errorList.push(errObj)
            } else if (err) {
                let errObj = {
                    msg: "Error: Unable to verify username "+username,
                    info: "Retry later please...",
                    prop: "username",
                    value: username,
                }
                errorList.push(errObj)
            }
        } catch (error) {
            console.log(error)
            let errObj = {
                msg: "Unable to validate username",
                info: "Retry later please...",
                prop: "username",
                value: username,
            }
            errorList.push(errObj)
        }
    }
    if (!validator.isMobilePhone(phonenum, "en-NG")) {
        let errObj = {
            msg: "Phone format is not valid",
            info: "Ensure phone is a valid format",
            prop: "phonenum",
            value: phonenum,
        }
        errorList.push(errObj)
    }

    if (!validator.isEmail(email)) {
        let errObj = {
            msg: "Email is not valid",
            info: "Ensure email is a valid format",
            prop: "email",
            value: email,
        }
        errorList.push(errObj)
    }
    else if (validator.isEmail(email)) {
        try {
            let res = await memoFn(fetch, `/api/verify/email?email=${email}`, {
                method: "GET"
            }, email)
            let resObj;
            if (("bodyUsed" in res) && (res.bodyUsed === false)) {
                resObj = await memoFn(email, await res.json())
                console.log(resObj)
            }
            else if (("isExistingEmail" in res)) {
                resObj = await memoFn(email);
            }
            let { isExistingEmail, err } = resObj || {}
            if (isExistingEmail) {
                let errObj = {
                    msg: "Email already exists",
                    info: "Ensure email is unique",
                    prop: "email",
                    value: email,
                }
                errorList.push(errObj)
            } else if (err) {
                let errObj = {
                    msg: "Error: Unable to verify email "+email,
                    info: "Retry later please...",
                    prop: "email",
                    value: email,
                }
                errorList.push(errObj)
            }
        } catch (error) {
            console.log(error)
            let errObj = {
                msg: typeof error === "object" ? "Unable to validate email" : error,
                info: "Retry later please...",
                prop: "email",
                value: email,
            }
            errorList.push(errObj)
        }
    }

    if (validator.isAlpha(password)) {
        let errObj = {
            msg: "Password not valid without a number or a special character",
            info: "Include a number or a special character",
            prop: "password",
            value: password,
        }
        errorList.push(errObj)
    }

    let passwordScore = validator.isStrongPassword(password,
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
            prop: "password",
            value: password,
        }
        errorList.push(errObj)
    }

    if (!validator.equals(password, repass)) {
        let errObj = {
            msg: "Passwords don't match",
            info: "",
            prop: "password",
            value: password,
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
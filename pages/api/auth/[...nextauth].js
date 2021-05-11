import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import knex from "../../../utils/conn"
import Url from "url"
import { errorsLibrary } from '../../../utils/errorLib'

const options = {
    // Configure one or more authentication providers
    providers: [
        Providers.Credentials({// The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                //console.log(credentials)
                const myUrl = new URL(credentials.callbackUrl, process.env.SELF_HOST_URL)
                myUrl.searchParams.delete("err")
                // Add logic here to look up the user from the credentials supplied
                const userFn = async ({ strapiToken, strapiProfileId, username, emailOrUsername, password, role }) => {
                    // You need to provide your own logic here that takes the credentials
                    // submitted and returns either a object representing a user or value
                    // that is false/null if the credentials are invalid.
                    try {
                        let url = "";
                        let res;
                        if (emailOrUsername && password) {
                            url = `${process.env.SELF_HOST_URL}/api/login/`;
                            res = await fetch(url,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        identifier: emailOrUsername, password, role
                                    })
                                });
                        }
                        //
                        else if (strapiToken && strapiProfileId) {
                            url = `${process.env.SELF_HOST_URL}/api/refreshUser/`;
                            res = await fetch(url,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        strapiToken, strapiProfileId
                                    })
                                });
                        }
                        let { user, jwt, err, ...restOf } = await res.json()
                        if (err) {
                            //console.log(err)
                            return { err, ...restOf }
                        }
                        if (user) {
                            user = { ...credentials, ...user, jwt }
                            return { user };
                        }
                    } catch (error) {
                        throw error;
                    }
                }
                if (sanitizeLogin(credentials)) {
                    // Any object returned will be saved in `user` property of the JWT
                    if (!credentials.isQuickReload) {
                        return new Promise(async (res, rej) => {
                            try {
                                credentials.callbackUrl = myUrl.href
                                let { user, err, errType, errMsg, statusCode, errObj } =
                                    await userFn(credentials)
                                if (user) {
                                    if (!user.jwt) user.jwt = credentials.strapiToken
                                    delete credentials.strapiToken
                                    delete credentials.strapiProfileId
                                    res(user)
                                } else if (err) {
                                    const myUrl = new URL(credentials.callbackUrl)
                                    if (errObj) {
                                        for (const key in errObj) {
                                            let paramValue =
                                                Object.keys(errorsLibrary).find(ky => ky === key) || key
                                            myUrl.searchParams.set("err", paramValue)
                                            myUrl.searchParams.set("errMsg", errObj[key])
                                        }
                                    } else {
                                        myUrl.searchParams.set("err", errType)
                                        myUrl.searchParams.set("errMsg", errMsg)
                                    }
                                    rej(myUrl.href)
                                }
                            } catch (error) {
                                console.log(error)
                                rej(null)
                            }
                        })
                    }else{
                        let {sessionInString}=credentials
                        let session=JSON.parse(sessionInString)
                        let user=session.user
                        console.log(user)
                        return Promise.resolve(user)
                    }
                } else {
                    myUrl.searchParams.set("err", "login_params_missing")
                    // If you return null or false then the credentials will be rejected
                    return Promise.reject(myUrl.href)
                    // You can also Reject this callback with an Error or with a URL:
                    // return Promise.reject(new Error('error message')) // Redirect to error page
                    // return Promise.reject('/path/to/redirect')        // Redirect to a URL
                }
            }
        }),
        // ...add more providers here
    ],
    callbacks: {
        signIn: async (user, account, profile) => {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                console.log("is allowed")
                return Promise.resolve(true)
            } else {
                // Return false to display a default error message
                console.log("not allowed")
                return Promise.resolve(false)
                // You can also Reject this callback with an Error or with a URL:
                // return Promise.reject(new Error('error message')) // Redirect to error page
                // return Promise.reject('/path/to/redirect')        // Redirect to a URL
            }
        },
        redirect: async (url, baseUrl) => {
            return Promise.resolve(url)
            /*  return url.startsWith(baseUrl)
                  ? Promise.resolve(url)
                  : Promise.resolve(baseUrl)*/
        },
        session: async (session, user) => {
            session.user = user;
            session.user.image = user.prof_pic?.format?.small?.url
            //console.log(session)
            return Promise.resolve(session)
        },
        jwt: async (token, user, account, profile, isNewUser) => {
            const isSignIn = (user) ? true : false
            // Add auth_time to token on signin in
            if (isSignIn) {
                token.auth_time = Math.floor(Date.now() / 1000);
                token.username = user.username;
                let { password, callbackUrl, ...rest } = user;
                token = { ...token, ...rest }
            }
            return Promise.resolve(token)
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: "/first_timer" // If set, new users will be directed here on first sign in
    },
    // A database is optional, but required to persist accounts in a database
    //database: process.env.DATABASE_URL,
}

function sanitizeLogin(credentials) {
    let { strapiToken, strapiProfileId, username, emailOrUsername, password, role,
        isQuickReload, sessionInString } = credentials;
    console.log(credentials)
    let value = (strapiToken && strapiProfileId) || (emailOrUsername && password) ||
        (isQuickReload && sessionInString);
    console.log(value ? "Parameters are complete" : "Parameters are missing")
    return value
}

export default (req, res) => NextAuth(req, res, options)
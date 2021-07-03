import _ from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import userSettings from "../../utils/models/settings";
import { space } from "../../utils/models/space";
import useSWR from "swr"
import { UserSessionContext } from "../../pages/_app";

export const ISearchContext = createContext({
    params: {
        lowerBudget: 200,
        upperBudget: 1000,
        typeOfSpace: "",
        cityOrTown: "",
    }, changeParams: () => { }
});

export const ISpaceContext = createContext({
    spaceData: _.cloneDeep(space),
});


export const SpaceContext = createContext({
    spaceData: _.cloneDeep(space),changeContext: () => { },
});
/**
 * 
 * @param {space} spaceDataProps 
 * @returns 
 */

export const ISpaceToBookContext = createContext({
    spaceToBookData: _.clone({
        spaceId: 0,
        spaceMeta: {
            datesToStayInfo: {
                dateMode: "asRange",
                singleDatesStrings: [],
                dateRangeStrings: {
                    from: new Date().toDateString(),
                    to: new Date().toDateString()
                }
            }
        }
    }), changeContext: () => { }
});


export const IUserSettingsContext = createContext({
    userSettings: {
        id: undefined,
        userId: undefined,
        settingsJSON: _.clone({
            ...userSettings
        }),
    }, changeContext: () => { }, updateDBFirstThenChangeContext: () => { }
});

export function UserSettingsContextProviderPre({ children }) {
    let ctx = useContext(UserSessionContext)
    let { session: { user } } = ctx
    if (!user) {
        return<>{children}</>
    }
    return<><UserSettingsContextProvider>
        {children}
        </UserSettingsContextProvider></>
}
export function UserSettingsContextProvider({ children }) {
    let ctx = useContext(UserSessionContext)
    let { session: { user } } = ctx
    let userId = user.userId;
    let id = user.settingsId;
    let { userSettings, error, loading } = userSettingFetcher({ userId, id });
    let settingExists = loading ? null : (!loading && !error) && userSettings
    let updateDBFirstThenChngCxt = async (settings) => {
        try {
            let whatToSend = { ...settings.settingsJSON }
            let res = await fetch(`api/settings/${settings.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(whatToSend)
            })
            let settingFromServer = await res.json()
            changeUserSettingsState(settingFromServer);

        } catch (error) {
            console.log(error)
        }
    }
    let [userSettingsState, changeUserSettingsState] = useState(user.userId);
    useEffect(() => {
        if (settingExists!==true && typeof settingExists !== "object") {
            (async () => {
                try {
                    let res = await fetch(`/api/settings`, {
                        method: "POST",
                        body: JSON.stringify({ userId })
                    });
                    let settingsSaved = await res.json();
                    changeUserSettingsState(settingsSaved)
                } catch (error) {
                    console.log(error)
                }
            })();
        }
    }, [settingExists]);
    if (loading) {
        return <>{children}</>
    }
    if (error) {
        return <>{children}</>
    }
    if (!userSettings) {
        return <>{children}</>
    } else {
        return <>
            <IUserSettingsContext.Provider value={{
                userSettings: userSettingsState,
                updateDBFirstThenChangeContext: updateDBFirstThenChngCxt
            }} >
                {children}
            </IUserSettingsContext.Provider>
        </>
    }
}

function userSettingFetcher({ userId, id }) {
    let url = "";
    if (id) {
        url = `/api/settings/${id}`;
    }
    else if (userId) {
        url = `/api/settings?userId=${userId}`;
    }
    console.log(url)
    let { data, error, isValidating } = useSWR(`${url}`, fetcher, {
        revalidateOnFocus: false,
        revalidateOnMount: false,
        revalidateOnReconnect: false,
        })
    if (Array.isArray(data)) {
        data = data[0]
    }
    return { userSettings: data, error, loading: isValidating }
}
let fetcher = (url) => fetch(url).then(res => res.json())


import _ from 'lodash';
import React,{createContext} from 'react'
import { profile,session, space } from './models/exportModels'

export const UserSessionContext = React.createContext({
    session: _.cloneDeep(session),changeContext: () => { } 
});

let profileDefault = { ..._.cloneDeep(profile), ..._.cloneDeep(session.user) }
export const ProfileContext = createContext({ profile: profileDefault, changeContext: () => { } })



export let spaceDataDefault = {
    nameOfSpace: "",
    descOfSpace: "",
    typeOfSpace: "",
    spaceInfo: {
        houseType: "", spaceCategory: "", spaceCondition: "",
        bedroomNumber: 1, bathroomNumber: 1, kitchenNumber: 0, sittingNumber: 0
    },
    flatmateInfo: [],
    spaceRules: [{ desc: "Pets allowed" }, { desc: "Smoking allowed" }, { desc: "Couple allowed" }],
    locationInfo: {},
    space_pics: [],
    spaceAvailabiltyInfo: { lengthOfStay: 1, datesInfo: {} },
    spaceBills: { charge: 0, otherBills: 0, billFormat: "day" },
    spaceAmenities: [{ id: "", desc: "Shared Living Room" }], ...space
};


export const SpaceContext = React.createContext({
    spaceData: _.cloneDeep(space),
});

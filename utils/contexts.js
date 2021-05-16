
import _ from 'lodash';
import React,{createContext} from 'react'
import { profile,session, space } from './models/exportModels'



export const SpaceContext = React.createContext({
    spaceData: _.cloneDeep(space),
});

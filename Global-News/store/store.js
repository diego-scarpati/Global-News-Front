import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger"

import attendanceReducer from "./attendance";
import licenseReducer from "./license";
import teamReducer from "./team";
import userReducer from "./user";
import availabilityReducer from "./availability"
import officeReducer from "./office"
import positionReducer from "./position";
import calendarReducer from "./calendar"
import routeReducer from "./route"
import hrReducer from "./hhrr"

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), 
    reducer:{
        user: userReducer,
        team: teamReducer,
        license: licenseReducer,
        attendance: attendanceReducer,
        availability: availabilityReducer,
        office: officeReducer,
        position: positionReducer,
        calendar : calendarReducer,
        route : routeReducer,
        hhrr : hrReducer,
    }
})

export default store
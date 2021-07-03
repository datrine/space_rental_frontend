import { DateTime, Interval } from "luxon"
import { DateUtils } from "react-day-picker";

let buildDateInfo = ({ dateMode, singleDatesStrings, dateRangeStrings }, adjust = false) => {
    if (!adjust) {
        if (dateMode === "asRange") {
            return { dateMode, dateRangeStrings }
        } else if (dateMode === "asSingles") {
            return { dateMode, singleDatesStrings }
        }
    } else {
        return adjustDateInfo({ dateMode, singleDatesStrings, dateRangeStrings })
    }
}
/**
 * 
 * @param {object} opts 
 * @param {string} opts.dateMode
 * @param {Array} opts.singleDatesStrings
 * @param {string} opts.dateRangeStrings
 */
let numberOfDays = (opts) => {
    return listAllDatesAsStrings(opts).length
}

let daysSorter = (dayToSortA, dayToSortB) => {
    if (DateUtils.isDayBefore(dayToSortA, dayToSortB)) {
        return -1
    }
    else if (DateUtils.isSameDay(dayToSortA, dayToSortB)) {
        return 0
    }
    else if (DateUtils.isDayAfter(dayToSortA, dayToSortB)) {
        return 1
    }
}

let listOfDatesBetween = ({ from, to }) => {
    if (!(to instanceof DateTime)) {
        to = DateTime.fromJSDate(to)
    }
    if (!(from instanceof DateTime)) {
        from = DateTime.fromJSDate(from)
    }
    let days = []
    let dayPlus = from
    let dayPluser = 0
    let daysBetween =
        Interval.fromDateTimes(from, to).count("days");
    while (daysBetween > dayPluser) {
        let newDay = dayPlus.plus({ day: dayPluser }).toJSDate()
        days.push(newDay)
        dayPluser++
    }
    //console.log(days.length)
    return days
}

let datesFromStrings = (array = []) => array.map((ds) => {
    return new Date(ds)
})

let stringsFromDates = (array = [new Date()]) => array.map((date) => date.toISOString())

let dateRangeFromDateStrings = (dateRangeStrings) => {
    let dateRangeDateObj = {
        from: new Date(dateRangeStrings.from),
        to: new Date(dateRangeStrings.to)
    }
    return dateRangeDateObj;
}

let dateStringsFromDateRange = (dateRangeStrings) => {
    return {
        from: (new Date(dateRangeStrings.from)).toISOString(),
        to: (new Date(dateRangeStrings.to)).toISOString()
    };
}

let rangeFromDates = (days = []) => {
    days = days.sort(daysSorter);
    return { from: days[0], to: days[days.length - 1] }
}

/**
 * 
 * @param {object} opts 
 * @param {string} opts.dateMode
 * @param {Array} opts.singleDatesStrings
 * @param {string} opts.dateRangeStrings
 */
let listAllDatesAsStrings = ({ dateMode, singleDatesStrings, dateRangeStrings }) => {
    let listOfDates = []
    if (dateMode === "asRange") {
        listOfDates = listOfDatesBetween(dateRangeFromDateStrings(dateRangeStrings))
    } else if (dateMode === "asSingles") {
        listOfDates = singleDatesStrings
    }
    return listOfDates;
}

/**
 * 
 * @param {object} opts 
 * @param {string} opts.dateMode
 * @param {Array} opts.singleDatesStrings
 * @param {string} opts.dateRangeStrings
 */
let listAllDatesAsDateObjs = (opts = { dateMode, singleDatesStrings, dateRangeStrings }) => {
    let listOfDates = []
    listOfDates = listAllDatesAsStrings(opts).map((dateStr) => new Date(dateStr));
    return listOfDates;
}

/**
 * 
 * @param {[Date]} dates 
 */
let filterOutPastDates = (dates) => {
    let listOfValidDates = dates.filter((date) => !isPastDate(date));
    return listOfValidDates;
}

/**
 * 
 * @param {[Date]} dates 
 */
let filterOutNowFutureDates = (dates) => {
    let listOfValidDates = dates.filter((date) => isPastDate(date));
    return listOfValidDates;
}

let adjustDateInfo = (opts = { dateMode, singleDatesStrings, dateRangeStrings }) => {
    if (opts.dateMode === "asRange") {
        let dateRangeStrings = dateRangeFromDateStrings(rangeFromDates(filterOutPastDates(listAllDatesAsDateObjs(opts))))
        return { dateMode: opts.dateMode, dateRangeStrings }
    } else if (dateMode === "asSingles") {
        let singleDatesStrings = listAllDatesAsStrings(filterOutPastDates(listAllDatesAsDateObjs(opts)))
        return { dateMode: opts.dateMode, singleDatesStrings }
    }
}


/**
 * 
 * @param {Date} date 
 * @returns 
 */
let isPastDate = (date) => {
    return Date.now() > date.getTime();
}

export {
    buildDateInfo, daysSorter,
    listOfDatesBetween, datesFromStrings, stringsFromDates, numberOfDays, rangeFromDates,
    dateRangeFromDateStrings, dateStringsFromDateRange, listAllDatesAsDateObjs,
    listAllDatesAsStrings, adjustDateInfo

};
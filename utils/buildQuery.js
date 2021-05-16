import qs from "qs"
export function queryStringForUrl(fields = [{ address_eq, cityOrT }]) {
   return qs.stringify({
        _where: [...fields
        ]
    })
}


export function byLocationSpec({ address_eq }) {
    return { address_eq }
}

export function orRer(filters = []) {
    return { _or: [...filters] }
}
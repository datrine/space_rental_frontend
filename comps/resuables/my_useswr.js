
import useSWR from "swr"

function profileFetcher(id) {
    let { data, error, isValidating } = useSWR(`/api/profiles/${id}`, fetcher,{
        revalidateOnFocus:false
    })
    //console.log(data || error || isValidating)
    return { profileFromServer:data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});

export { profileFetcher }
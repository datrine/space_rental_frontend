function OrderGangan({trackingId}) {
    
}



function ordersFetcher() {
    let { data, error, isValidating } = useSWR(`/api/orders?`, fetcher, {
        revalidateOnFocus: false,
    });
    //console.log(data || error || isValidating)
    return { ordersFromServer: data, error, loading: isValidating }
}

let fetcher = (url) => fetch(url).then(async res => {
    if (!res.ok) throw await res.json()
    return res.json()
});
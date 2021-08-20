import { Container } from "@material-ui/core"
import useSWR from "swr"

function TransactionsIndex({hookChangeActiveTab}) {
    return<>
    <Container>
        <h3>Welcome to transactions</h3>
    </Container>
    </>
}

function ordersFetcher(renterId, userId) {
    let { data, error, isValidating } = useSWR(`/api/orders?renterId=${renterId}&userId=${userId}`, fetcher, {
        revalidateOnFocus: false,
    });
    //console.log(data || error || isValidating)
    return { ordersFromServer: data, error, loading: isValidating }
}


export {TransactionsIndex}
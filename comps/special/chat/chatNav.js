import { Container } from "@material-ui/core"
import { ArrowBack } from "@material-ui/icons"

function ChatHeadNav({ backUrl = "", showBackUrl = true }) {
    return <>
        <Container className="pt-4 mt-5 mb-1 pb-2">
            <span style={{ visibility: showBackUrl === true ? "visible": "hidden"  }} >
                <a href={backUrl}>
                <ArrowBack /></a></span>
        </Container></>
}

export { ChatHeadNav }
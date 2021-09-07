import { Container } from "@material-ui/core";
import { useState } from "react";
import ComposeEmail from "./compose";

function EmailAdmin({ hookChangeActiveTab }) {
    let [viewState, changeViewState] = useState("index");
    let view = null;
    switch (viewState) {
        case "index":
            view = <>
                <Container>
                    <button onClick={
                        e => {
                            changeViewState("compose")
                        }
                    }>Compose</button>
                </Container>
            </>
            break;
        case "compose":
            view = <>
                <ComposeEmail />
            </>
            break;
        default:
            break;
    }
    return <>
        {view}
    </>
}

export default EmailAdmin
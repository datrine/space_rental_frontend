import { useEffect, useState } from 'react';
import { screenMgr } from "../utils/utilFns"
export default function View({ mobileView, pcView }) {
    let { screenType } = screenMgr() || {};
    let [viewState, changeViewState] = useState(null);
    useEffect(() => {
        (async () => {
            let indexView = null;
            switch (screenType) {
                case "small":
                    indexView = mobileView
                    break;

                case "large":
                    indexView = pcView
                    break;
                default:
                    indexView = <>Loading...</>
                    break;
            }
            changeViewState(indexView)
        })()

    }, [screenType])
    return <>
        {viewState}
    </>
}
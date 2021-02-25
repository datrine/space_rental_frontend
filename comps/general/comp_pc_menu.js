import { faArrowCircleRight, faArrowLeft, faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

let PCMenu = () => {
    //let [expanded, toggleExpanded] = useState(false)
    return <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 pt-1">
                    <a className="w3-btn mr-2 w3-round-medium"><img width={40} height={40} /></a>
                    <a className="w3-btn mr-2 w3-round-medium">Book A Room</a>
                    <a className="w3-btn w3-round-medium">Partners</a>
                </div>
                <div className="col-md-6 pt-1">
                    <button className="float-right w3-btn">Account</button>
                </div>
            </div>
        </div>
    </>
}




export { PCMenu }
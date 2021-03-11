import { faArrowCircleRight, faArrowLeft, faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

let HamburgerMenu = ({ expandedProps = false, hookChangeExpandedMenu }) => {
    // let [expanded, toggleExpanded] = useState(expandedProps)
    return <>
        <span className="w3-btn" onClick={
            e => {
                hookChangeExpandedMenu(!expandedProps)
            }
        }>
            <FontAwesomeIcon icon={expandedProps ? faTimes : faBars} /></span>
    </>
}

let CollapsedMenu = ({ hookToggleExpanded }) => {
    return <>
        <button className="w3-btn" onClick={
            e => {
                hookToggleExpanded(true)
            }
        }>
            <FontAwesomeIcon icon={faBars} /></button>
    </>
}

let ExpandedMenu = ({ hookToggleExpanded, defaultList = listOfMenu }) => {
    let [currentMenuHeadObj, changeMenuHeadObj] = useState(listOfMenu[0])
    let [currentMenuList, changeMenuList] = useState([])
    useEffect(() => {
        let subList = defaultList.filter((item) => {
            return currentMenuHeadObj.name === item.parentName;
        })
        changeMenuList(subList)
    }, [currentMenuHeadObj])
    return <>
        <div className="container-fluid"
         style={{ position: "absolute", backgroundColor: "rgba(0,0,0,0.6)",
         top:70,bottom:0,zIndex:1000 }}>
             <div className="w3-text-white">
            <h3 style={{fontWeight:"bolder"}} >
                <button className="w3-btn" onClick={
                    e => {
                        if (currentMenuHeadObj.name !== "home") {
                            let parentListOfCurrentMenuHeadObj = defaultList.filter((item) => {
                                return item.parentName === currentMenuHeadObj.parentName;
                            })
                            let newMenuHeadObj = defaultList.find((item) => {
                                return item.name === currentMenuHeadObj.parentName
                            })
                            if (newMenuHeadObj) {
                                changeMenuHeadObj(newMenuHeadObj)
                            }
                            if (parentListOfCurrentMenuHeadObj.length > 0) {
                                changeMenuList(parentListOfCurrentMenuHeadObj)
                            }
                        } else {
                            hookToggleExpanded(false)
                        }
                    }
                }>
                    <FontAwesomeIcon
                        icon={currentMenuHeadObj.name === "home" ? faTimes : faArrowLeft} /></button>
                <span className="w3-padding"
                    style={{ fontSize: "25px" }}>{currentMenuHeadObj.displayName}</span>
            </h3>  <MenuList list={currentMenuList}
                hookChangeMenuHeadObj={changeMenuHeadObj} /></div></div>
    </>
}

let MenuList = ({ list, hookChangeMenuHead, hookChangeMenuHeadObj }) => {
    return <>
        <ul className="w-100 w3-text-white" style={{ listStyle: "none" }}>
            {list.map(({ name, icon, isList, link, displayName }, index) =>
                <li style={{ fontSize: "20px", textAlignLast: "left" }} key={index}>
                    {isList ?
                        <button className="w-100 w3-btn w3-card mb-3" onClick={
                            e => {
                                hookChangeMenuHeadObj(list[index])
                            }
                        }> {icon ? <img /> : null} {displayName}
                            <span className="float-right" style={{}}>
                                <FontAwesomeIcon icon={faArrowCircleRight} /></span> </button> :
                        <a className="w-100 w3-btn w3-card mb-3" href={link}>
                            {icon ? <img /> : null} {displayName}</a>}
                </li>)}
        </ul>
    </>
}

let listOfMenu = [
    { name: "home", displayName: "Home" },
    { parentName: "home", displayName: "Home", name: "home", icon: "", isList: false, link: "" },
    { parentName: "home", displayName: "Account", name: "account", icon: "", isList: true, link: "" },
    { parentName: "home", displayName: "About", name: "about", icon: "", isList: false, link: "" },
    { parentName: "account", displayName: "Sign in", name: "login", icon: "", isList: true },
    { parentName: "account", displayName: "Sign Up", name: "register", icon: "", isList: false, link: "/account?tabValue=register" },
    { parentName: "login", displayName: "Admin", name: "admin_login", icon: "", isList: false, link: "/account?tabValue=login" },
    { parentName: "login", displayName: "User", name: "general_login", icon: "", isList: false, link: "/account?tabValue=login" },
]


export { HamburgerMenu, ExpandedMenu }
import { Button, Card, CardContent, Container, Grid } from "@material-ui/core";
import { useContext, useState } from "react"
import { AdminContext } from "../../pages/admin"
import SpacesAdmin from "./spaces";
import CreateSpace from "./spaces/create";
import { TransactionsIndex } from "./trasanctions";
import OrdersAdmin from "./trasanctions/confirm_order";

function AdminDashboard(params) {
    let ctx = useContext(AdminContext);
    return <>
        <ViewOfAdmin />
    </>
}

function ViewOfAdmin({ }) {
    let [activeTab, changeActiveTab] = useState("index");
    let tabView = null;
    switch (activeTab) {
        case "index":
            tabView = <IndexTab hookChangeActiveTab={changeActiveTab} />
            break;
        case "transactions":
            tabView = <TransactionsIndex hookChangeActiveTab={changeActiveTab} />
            break;
        case "orders":
            tabView = <OrdersAdmin hookChangeActiveTab={changeActiveTab} />
            break;
        case "spaces":
            tabView = <SpacesAdmin hookChangeActiveTab={changeActiveTab} />
            break;
            case "create_space":
                tabView = <CreateSpace hookChangeActiveTab={changeActiveTab} />
                break;
            
        default:
            break;
    }
    let changeTabFn = (tabName) => {
        changeActiveTab(tabName);
    }

    return <>  <Container>
        <Grid container>
            <Grid item container sm={2} direction="column" alignItems="flex-start" >
                <Button onClick={e => {
                    changeTabFn("index")
                }} >Index</Button>
                <CollapseBtn
                    headBtnName="Transactions"
                    onClickHandler={(e) => {
                        changeTabFn("transactions");
                    }}
                    subMenus={[
                        {
                            headBtnName: "Orders", onClickHandler: (e) => {
                                changeTabFn("orders")
                            }, subMenus: []
                        },
                        {
                            headBtnName: "Payments", onClickHandler: (e) => {
                                changeTabFn("payments")
                            }, subMenus: []
                        },
                    ]} />
                    <CollapseBtn
                        headBtnName="Spaces"
                        onClickHandler={(e) => {
                            changeTabFn("spaces");
                        }}
                        subMenus={[
                            {
                                headBtnName: "Create Space", onClickHandler: (e) => {
                                    changeTabFn("create_space")
                                }, subMenus: []
                            },
                        ]} />
            </Grid>
            <Grid item container sm={10} >
                <Container>
                    {tabView}
                </Container>
            </Grid>
        </Grid>
    </Container>
    </>
}

function CollapseBtn({
    headBtnName = "",
    onClickHandler = (e) => { },
    subMenus = []
}) {
    let [showCollapsed, toggleCollapsed] = useState(false);
    return <>
        <Grid>
            <Button onClick={(e) => {
                toggleCollapsed(!showCollapsed);
                return onClickHandler(e)
            }} >{headBtnName}</Button>
            {showCollapsed ? <>
                <Container>
                    {subMenus.map((menu, index) =>
                        <CollapseBtn
                            {...menu} key={index}
                        />)}
                </Container></> : null}
        </Grid>
    </>
}

function IndexTab({ hookChangeActiveTab }) {
    return <>
        <Container style={{ paddingTop: 30 }}>
            {tileList.map((tile, index) =>
                <Tile key={index} {...tile} hookChangeActiveTab={hookChangeActiveTab} />)}
        </Container>
    </>
}

function Tile({ name, desc, color, hookChangeActiveTab }) {
    return <>

        <div className=" w3-card w3-round-medium"
            style={{ width: 300, height: 100, marginBottom: 20 }} >
            <Grid justify="center" container
                style={{ height: "100%", backgroundColor: color, color: "white" }} >
                <button className="w3-btn" onClick={
                    e => {
                        hookChangeActiveTab(name)
                    }
                } style={{ fontSize: "40px" }} >{desc}</button>
            </Grid>
        </div>
    </>
}

let tileList = [
    {
        name: "index",
        desc: "Index",
        color: "blue"
    },
    {
        name: "transactions",
        desc: "Transactions",
        color: "red"
    },
]


let menus = [
    {
        headBtnName: "Transactions", onClickHandler: (e) => { }, subMenus: [
            { headBtnName: "Orders", onClickHandler: (e) => { }, subMenus: [] },
            { headBtnName: "Payments", onClickHandler: (e) => { }, subMenus: [] },
        ]
    }
]


export default AdminDashboard
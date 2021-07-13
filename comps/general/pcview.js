import { Container, Grid, } from "@material-ui/core"
import { Chat, Help, Home, Person, PowerOffRounded, Settings, } from "@material-ui/icons"
import { signOut } from "next-auth/client";
import { useRouter } from "next/router"

function PCViewTemplate({ comp }) {
    return <>
            <Grid container justify="center" >
                <Grid item container md={2} >
                    <OpenedMenu />
                </Grid>
                <Grid item container md={10} >
                    <Container style={{ overflow: "auto", height: "98vh" }} >
                        {comp}
                    </Container>
                </Grid>
            </Grid>
    </>
}

function OpenedMenu() {
    let router = useRouter();
    let isPresentPath = (path) => {
            return  router.pathname===path
    }

    let MyLink = ({ link, title, icon }) => <>  <Container style={{ padding: 2, }}>
        <Grid container style={{ paddingTop: 0, marginTop: 0 }} justify="space-between" >
            <Grid item container xs={2} style={{ paddingTop: 0, marginTop: 0 }}>
                {icon}
            </Grid>
            <Grid item container xs={9}>
                <h5><a style={{
                    color:
                        isPresentPath(link) ? "green" : "black"
                }} href={link} >{title}</a></h5></Grid>
        </Grid>
    </Container></>
    return <>
        <Grid container direction="column" justify="space-between"  >

            {MyLink({ link: "/", title: "Home", icon: <Home /> })}

            {MyLink({ link: "/dashboard", title: "Dashboard" })}

            {MyLink({ link: "/profile", title: "Profile" })}

            {MyLink({ link: "/postads", title: "Post Ads" })}

            {MyLink({ link: "/chats", title: "My Chats", icon: <Chat /> })}

            {MyLink({ link: "/chats", title: "Referrals", icon: <Chat /> })}

            {MyLink({ link: "/settings", title: "Settings", icon: <Settings /> })}

            {MyLink({ link: "/about", title: "Get help", icon: <Help /> })}


            <Container style={{ padding: 5, }}>
                <Grid container style={{ paddingTop: 0, marginTop: 0 }}>
                    <Grid item container xs={2} style={{ paddingTop: 0, marginTop: 0 }}>
                        <PowerOffRounded />
                    </Grid>
                    <Grid item container xs={9}>
                        <h5 onClick={() => signOut()}>Log out</h5></Grid>
                </Grid>
            </Container>
        </Grid>
    </>


}


export { PCViewTemplate }
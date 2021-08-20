import { Container, Grid } from "@material-ui/core"
import { appColor } from "../../utils/utilFns"
import { LogoSVG } from "../resuables/"
function SplashScreen({ urlLink = "splash_screen.png" }) {
    return <>
        <div style={{
            padding: 0, paddingLeft: 0,
            backgroundImage: `url(${process.env.NEXT_PUBLIC_SELF_HOST_URL}/splash_screen.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center", backgroundSize: "cover",
            position: "absolute", top: 0, bottom: 0, left: 0, right: 0
        }}>
            <Grid container justify="center" alignItems="center"
                style={{
                    padding: 0, paddingLeft: 0, backgroundColor: "rgba(96,148,26,0.7)",
                    position: "absolute", top: 0, bottom: 0, left: 0, right: 0
                }} >
                <LogoSVG />
            </Grid>
        </div>
    </>
}

function LightSplashScreen({ }) {

    return <>
        <Container style={{
            padding: 0, width: "100vw", height: "100vh"
        }}>
            <Grid container justify="center" alignItems="center"
                style={{ backgroundColor: "rgba(250,250,250,0.2)", width: "100vw", height: "100vh" }} >
                <LogoSVG roofColor={appColor} bodyColor={appColor} />
            </Grid>
        </Container>
    </>
}
export { SplashScreen, LightSplashScreen }
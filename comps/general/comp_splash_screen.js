import { Container, Grid } from "@material-ui/core"
import Image from "next/image"
import { LogoSVG } from "../reusables"
function SplashScreen({ heightProp = 144, widthProp = 147 }) {
    return <>
        <Container style={{
            padding: 0,
            backgroundImage: "url(splash_screen.png)", backgroundRepeat: "no-repeat",
            backgroundPosition: "center", backgroundSize: "cover", width: "100vw", height: "100vh"
        }}>
            <Grid container justify="center" alignItems="center"
                style={{ backgroundColor: "rgba(96,148,26,0.7)", width: "100vw", height: "100vh" }} >
                <LogoSVG />
            </Grid>
        </Container>
    </>
}
export { SplashScreen }
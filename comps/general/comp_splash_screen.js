import { Container, Grid } from "@material-ui/core"
import Image from "next/image"
function SplashScreen({ heightProp = 144, widthProp = 147 }) {
    return <>
        <Container style={{
            padding: 0,
            backgroundImage: "url(splash_screen.png)", backgroundRepeat: "no-repeat",
            backgroundPosition: "center", backgroundSize: "cover", width: "100vw", height: "100vh"
        }} >
            <Grid container justify="center" alignItems="center"
                style={{ backgroundColor: "rgba(96,148,26,0.7)", width: "100vw", height: "100vh" }} >
                <svg width="147" height="144" viewBox="0 0 147 144" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M102.087 41.5679V90.9117C102.087 105.281 90.4457 116.939 76.0717 116.939H70.9283C56.5658 116.939 44.9128 105.292 44.9128 90.9117V41.5679C30.1715 50.9979 20.4128 67.5033 20.4128 86.3059C20.4128 115.641 44.1781 139.417 73.5 139.417C102.822 139.417 126.587 115.641 126.587 86.3059C126.587 67.5033 116.828 50.9979 102.087 41.5679Z" stroke="white" stroke-width="8" stroke-miterlimit="10" />
                    <path d="M4.59229 49.5275L73.5 4.59424L142.408 49.5275" stroke="white" stroke-width="8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                </svg></Grid>
        </Container>
    </>
}

export { SplashScreen }
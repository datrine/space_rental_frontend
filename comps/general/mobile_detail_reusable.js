
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import { Button, Grid, Container } from "@material-ui/core";

function LowerBandBtn() {
    return <>
        <Container style={{ padding: 0, position: "fixed", bottom: 0, backgroundColor: "", left: 0, right: 0 }} >
            <Grid container >
                <Grid item xs={6} justify="center"
                    style={{ backgroundColor: "rgba(196, 196, 196, 0.72)" }}>
                    <Button component="div" style={{ width: "100%" }} >Save</Button></Grid>
                <Grid item xs={6} justify="center"
                    style={{ backgroundColor: "#60941A" }}>
                    <Button component="div" style={{ width: "100%" }} >Book Now</Button></Grid>
            </Grid>
        </Container>
    </>
}

function FullCarouseler({ imgurls = ["/Rectangle_80.png"] }) {
    let width = screen.width
    let height = screen.height * 0.6
    return <>
        <Carousel>
            {imgurls.map(url => <Carousel.Item>
                <Image layout="responsive" src={url} width={width} height={height} />
            </Carousel.Item>)}

        </Carousel>
    </>
}

function Title({ roomType = "Private room", area = "Ikoyi", city = "Lagos" }) {
    return <>
        <h3 style={{ textAlign: "center" }}>{roomType} @ {area} {city}</h3>
    </>
}

function QuickBio({ name = "John Silver", occupation = "", gender = "Male", area = "Ikoyi", imgurl = "/prof_pic.png" }) {
    return <>
        <Container>
            <Grid container >
                <Grid item xs={3}>
                    <Image src={imgurl} width={70} height={70} />
                </Grid>
                <Grid item xs={8} container direction="column">
                    <span>{name}</span>
                    <span>{occupation || gender}</span>
                    <span><a><Button style={{ backgroundColor: "green" }}>Message</Button></a></span>
                </Grid>
            </Grid>
        </Container>
    </>

}

function OwnerDesc() {
    return <>
        <Container>
            <p> Hi There, Thanks for checking out this advert. i’m glad you
 are here...... </p>
            <p>Huge private Bedroom of 5 bedroom apartment with balcony and own bathroom en-suite!
            Huge 5 door wardrobe /shelving unit so lots of storage!
Lovely Modern structure of huge room, furnished, in a lovely modern flat in the very nice trendy safe area of Ikoyi, lagos.....</p>
            <p style={{ textAlign: "center" }} >
                <Button style={{ color: "#60941A", fontFamily: "Roboto" }}>Continue Reading</Button>
            </p>
        </Container>
    </>
}

function Overview() {
    let arrayLister = [
        {
            icon: "/icons/To Do.png",
            label: "Description",
            info: "A huge furnished room, 1 toilet, 1 bathroom,a standard kitchen, with a balcony."
        },
        {
            icon: "/icons/Rent.png",
            label: "Rent",
            info: `₦${400}/${'day'}`
        },
        {
            icon: "/icons/Estimate.png",
            label: "Bills",
            info: `Include`,
            isMore: true
        },
        {
            icon: "/icons/2012.png",
            label: "Availability",
            info: `${'Now'}`,
        },
        {
            icon: "/icons/Minus 1 Year.png",
            label: "Type of Stay",
            info: `${'All day'}`,
        },
        {
            icon: "/icons/Time Span.png",
            label: "Duration of Stay",
            info: `${'1 hour to 1 year'}`,
        },
        {
            icon: "/icons/Place Marker.png",
            label: "Location",
            info: `${'Bogbiri House South-West, 9 Maitama Sule St, Ikoyi, Lagos.'}`,
            isMap: true,
            mapUrl:"/map 1.png"
        },
    ]
    return <>
        <Title />
        <Container style={{ marginBottom: "50px" }} >
            {arrayLister.map(({ icon, label, info, isMore, isMap,mapUrl }, index) => <>
                <Grid key={index} container
                    style={{ marginBottom: "20px" }} >
                    <Grid item xs={2}>
                        <Image src={icon} width={30} height={30} />
                    </Grid>
                    <Grid item direction="column" container xs={10}>
                        <h5 style={{ marginBottom: "5px" }}>{label}</h5>
                        {isMore ? <Button component="span"> <span>{info}</span></Button> : <span>{info}</span>}
                    </Grid>
                    {isMap ? <Grid item xs={12}>
                       {mapUrl? <Image layout="responsive" width={screen.width} height={400} src={mapUrl}/>:null}
                    </Grid> : null}
                </Grid></>)}

        </Container>
    </>
}


export { FullCarouseler, Title, QuickBio, OwnerDesc, LowerBandBtn, Overview }
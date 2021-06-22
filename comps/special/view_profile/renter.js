import { faMapMarker, faMoneyCheck, faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid } from "@material-ui/core";
import Image from "next/image";
import View from "../../view";

export default function Renter(params) {
    return <><View mobileView={<MobileView />} /></>
}

function MobileView() {
    let imgURL = "public/prof_pic.png"
    return <>
        <Container>
            <Grid direction="column" justify="center" >
                <Image src={imgURL} height={200} width={200} />
                <Container>
                    <Grid container >
                        <Grid container>
                            <Grid item xs={2} >
                                <FontAwesomeIcon icon={faSearchLocation} />
                                </Grid>
                            <Grid item xs={10} >
                                <FontAwesomeIcon icon={faSearchLocation} />
                                </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2} >
                                <FontAwesomeIcon icon={faMoneyCheck} />
                                </Grid>
                            <Grid item xs={10} >
                                <FontAwesomeIcon icon={faSearchLocation} />
                                </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2} >
                                <FontAwesomeIcon icon={faMapMarker} />
                                </Grid>
                            <Grid item xs={10} >
                                <FontAwesomeIcon icon={faSearchLocation} />
                                </Grid>
                        </Grid>
                    </Grid>
                </Container>
           <p style={{alignItems:"center"}} ><button>Message</button></p>
            </Grid>
        </Container>
    </>
}
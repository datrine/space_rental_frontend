import { faMapMarker, faMoneyCheck, faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid } from "@material-ui/core";
import Image from "next/image";
import { useContext } from "react";
import { TenantContext } from "../../../pages/tenants";
import { getImgUrl } from "../../../utils/utilFns";
import View from "../../view";

export default function Tenant(params) {
    return <><View mobileView={<MobileView />} /></>
}

function MobileView() {
    let { tenantData: { prof_pic,address,cityOrTown } } = useContext(TenantContext);
    let imgURL = getImgUrl(prof_pic) || "/user_profile.png"
    return <>
        <Container>
            <Grid direction="column" alignItems="center" justify="center" container >
                <Image layout="fixed" src={imgURL} height={250} width={250} />
                <Grid container style={{ width: 250 }} >
                    <Grid container style={{marginBottom:"20px"}} >
                        <Grid item xs={2} >
                            <FontAwesomeIcon icon={faSearchLocation} />
                        </Grid>
                        <Grid item xs={10} >
                            {cityOrTown||"Unspecified"}
                        </Grid>
                    </Grid>
                    <Grid container style={{marginBottom:"20px"}}>
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
                <p style={{ alignItems: "center" }} >
                    <button disabled className="w3-btn" >Message</button></p>
            </Grid>
        </Container>
    </>
}
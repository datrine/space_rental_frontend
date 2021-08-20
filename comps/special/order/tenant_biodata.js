import { Container, Grid } from "@material-ui/core"
import { useContext } from "react"
import { TenantContext } from "."
import { getImgUrl } from "../../../utils/utilFns"

export default function TenantBio(params) {
    let { tenantData } = useContext(TenantContext);
    let {prof_pic,l_name,f_name}=tenantData;
    return <>
        <Container>
            <Grid container >
                <Grid item container xs={4} >
                    <img className="w3-image w3-circle" src={getImgUrl(prof_pic)}
                    style={{ width: "50px", height: "50px" }} />
                </Grid>
                <Grid item container xs={8} >
                    <span>{l_name} {f_name}</span>
                </Grid>
            </Grid>
        </Container>
    </>
}
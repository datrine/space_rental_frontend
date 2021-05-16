import Image from "next/image"
import { Container, Grid, IconButton, } from "@material-ui/core"
import { useContext } from "react";
import { ProfileContext } from "../../../pages/dashboard";

export default function MyProfile({ }) {
    let { profile } = useContext(ProfileContext)
    let { f_name, l_name, email, gender, occupation } = profile
    return <>
        <Container style={{ marginTop: "30px" }}>
            <Grid container direction="row" justify="space-between" alignItems="center" container
                style={{ padding: 5, borderWidth: 1, borderStyle: "solid", }} >
                <h3 >My Profile</h3>
                <IconButton>
                    <a href="/profile" >
                        <Image src={"/dashboard/bx_bx-edit.png"} width={30} height={30} />
                    </a>
                </IconButton>
            </Grid>
            <Grid direction="column" container
                style={{
                    padding: 10, borderWidth: 1, borderStyle: "solid",
                    borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px"
                }} >
                <h4>{f_name || l_name ? (f_name + " " + l_name) : <span style={{ fontStyle: "italic" }}>
                    Full name: Edit your profile</span>}
                </h4>
                <h5>{email}</h5>
                <h5>{gender}</h5>
                <h5 style={{ fontStyle: "italic" }}>{occupation || <span >
                    Occupation: edit your profile</span>}</h5>
            </Grid>
        </Container>
    </>
}
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Container, FormControl, Grid, Input } from "@material-ui/core"
import { signIn, useSession } from "next-auth/client"
import { useState } from "react"
import { generalPutAPI, getImgUrl, stateMgr, uploader } from "../../../utils/utilFns"

let state = stateMgr()
export default function ProfilePicture({ }) {
    let [session, loading] = useSession()
    let [loadingState, changeLoadingState] = useState(state)
    if (session) {
        let { user } = session
        let prof_pic = getImgUrl(user.prof_pic) || "/user_profile.png"
        return <>
            <title>Profile</title>
            <FormControl>
                <Container>
                    <Grid direction="column" container >
                        <img onLoad={
                            e=>{
                                console.log(e)
                            }
                        } style={{ borderRadius: "50%" }} src={prof_pic || "/user_profile.png"} 
                        width={250} height={250} />
                        <span style={{ marginTop: 10 }}>
                            <label className="w3-green w3-btn"
                                style={{
                                    paddingLeft: 5, paddingRight: 5, paddingTop: 5,
                                    paddingBottom: 5, borderRadius: 5
                                }} >
                                <Input type="file" onChange={
                                    async e => {
                                        try {
                                            let files = e.target.files
                                            let { data: dataUploaded, err } = await uploader({
                                                files,
                                                ref: "file",
                                                refId: user.userId,
                                                field: "prof_pic",
                                                source: "upload",
                                            })
                                            if (dataUploaded) {
                                                console.log("syssgaysaygasy")
                                                let { data, err } = await generalPutAPI({
                                                    model: "userprofiles",
                                                    entryId: user.profileId,
                                                    dataReq: { prof_pic: dataUploaded[0] }
                                                })
                                                if (data) {
                                                    await signIn("credentials", {
                                                        strapiToken: user.jwt,
                                                        strapiProfileId: user.profileId,
                                                        callbackUrl: "/profile",
                                                    })
                                                }
                                            }

                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }
                                } style={{ display: "none" }} />
                                <span style={{ marginRight: "10px" }} >
                                    <FontAwesomeIcon icon={faImage} />
                                </span>
                                <strong>Change Image </strong>
                            </label>
                        </span>
                    </Grid>
                </Container>
            </FormControl>
        </>
    }
}




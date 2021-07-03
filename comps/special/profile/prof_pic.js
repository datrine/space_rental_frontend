import { faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Container, FormControl, Grid, Input } from "@material-ui/core"
import { signIn, useSession } from "next-auth/client"
import { useContext, useState } from "react"
import { ProfileContext } from "../../../pages/profile"
import { UserSessionContext } from "../../../pages/_app"
import { generalPutAPI, getImgUrl, stateMgr, uploader } from "../../../utils/utilFns"

export default function ProfilePicture({ }) {
    let [textState, changeTextState] = useState("Change Image")
    return <>
        <UserSessionContext.Consumer>{({ session }) => {
            let {user} = session
            return <ProfileContext.Consumer>
                {({ profile, changeContext }) => {
                    let prof_pic = getImgUrl(profile.prof_pic) || "/user_profile.png"
                    return <>
                        <FormControl>
                            <Container>
                                <Grid direction="column" container >
                                    <img style={{ borderRadius: "50%" }} src={prof_pic || "/user_profile.png"}
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
                                                        changeTextState("Uploading")
                                                        let { data: dataUploaded, err } = await uploader({
                                                            files,
                                                            ref: "file",
                                                            path:profile.username,                                                            refId: profile.userId,
                                                            field: "prof_pic",
                                                            source: "upload",
                                                        })
                                                        if (dataUploaded) {
                                                            let { data, err } = await generalPutAPI({
                                                                model: "userprofiles",
                                                                entryId: profile.profileId,
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
                                            <strong>{textState} </strong>
                                        </label>
                                    </span>
                                </Grid>
                            </Container>
                        </FormControl>
                    </>
                }
                }
            </ProfileContext.Consumer>
        }}</UserSessionContext.Consumer></>

}




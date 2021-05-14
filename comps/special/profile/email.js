import { FormControl, Input, InputAdornment } from "@material-ui/core"
import { Email } from "@material-ui/icons"
import { useSession } from "next-auth/client"
import { useContext } from "react"
import { UserSessionContext } from "../space/index_desc"
import { useStyles } from "./styles"


export default function EmailForm({ email, emailError, handleChange }) {
    let classes = useStyles()
    let { session, } = useContext(UserSessionContext)
        return <>
            <FormControl fullWidth>
                <Input disabled value={session.user.email}
                    placeholder="Email..." fullWidth
                    startAdornment={
                        <InputAdornment position="start">
                            <label> <Email /> *</label></InputAdornment>
                    } type="email" name="email"
                    className={classes.textField} />
            </FormControl>
          
                {emailError && email !== session.user.email ?  <p> <span className="w3-text-red" >
                    {emailError}</span> </p>: null}
        </>

}
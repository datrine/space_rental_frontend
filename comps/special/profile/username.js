import { FormControl, Input, InputAdornment } from "@material-ui/core"
import { PersonAdd } from "@material-ui/icons"
import { useSession } from "next-auth/client"
import { useContext } from "react"
import { UserSessionContext } from "../../../pages/_app"
import { useStyles } from "./styles"

export default function Username({ username, usernameError, handleChange }) {
    let classes = useStyles()
    let { session, } = useContext(UserSessionContext)
        return <>
            <FormControl fullWidth>
                <Input disabled value={session.user.username}
                    placeholder="Username..." fullWidth
                    startAdornment={
                        <InputAdornment position="start">
                            <label><PersonAdd /> *</label></InputAdornment>
                    } name="username"
                    className={classes.textField} />
            </FormControl>

            {usernameError && session.user.username !== username ? <p>
                <span className="w3-text-red" >
                    {usernameError}</span>
            </p> : null}</>
  
}
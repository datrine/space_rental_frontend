import { FormControl, Input, InputAdornment } from "@material-ui/core"
import { PersonAdd } from "@material-ui/icons"
import { useSession } from "next-auth/client"
import { useStyles } from "./styles"

export default function Username({ username, usernameError, handleChange }) {
    let classes = useStyles()
    let [session, loading] = useSession()
    if (session) {
        return <>
            <FormControl fullWidth>
                <Input disabled onChange={handleChange} value={username}
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
    return null
}
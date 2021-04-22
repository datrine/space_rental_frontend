import { FormControl, Input, InputAdornment } from "@material-ui/core"
import { Email } from "@material-ui/icons"
import { useSession } from "next-auth/client"
import { useStyles } from "./styles"


export default function EmailForm({ email, emailError, handleChange }) {
    let classes = useStyles()
    let [session, loading] = useSession()
    if (session) {
        return <>
            <FormControl fullWidth>
                <Input disabled onChange={handleChange} value={email}
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
    return null
}
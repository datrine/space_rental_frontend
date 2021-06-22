const { Container,  Button,  makeStyles,  } = require("@material-ui/core");
import { useEffect, useState, Fragment } from "react";
import { useSession } from "next-auth/client";


let SuccessReg = ({ openDialog, hookChangeResponseView }) => {
    let [open, setOpen] = useState(true)
    let handleClose = (e) => {
        autoSignIn()
        hookChangeResponseView(null)
    }
    return <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">User Register Success</DialogTitle>
            <DialogContent>
                <CheckCircle fontSize="large" style={{ color: "green" }} />
                <Container >
                    <h3 style={{ textAlign: "center" }} >Successful!</h3>
                    <h4 style={{ textAlign: "center" }}>Your Profile Has Been Successfully Updated</h4>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Ok
          </Button>
            </DialogActions>
        </Dialog>
    </>
}

let FailReg = ({ openDialog, hookChangeResponseView }) => {
    let [open, setOpen] = useState(true)
    let handleClose = (e) => hookChangeResponseView(null)
    return <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">User Registration Error</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Unable to register. Please reload page.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
          </Button>
            </DialogActions>
        </Dialog>
    </>
}

export {  SuccessReg, FailReg
}
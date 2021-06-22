import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper } from "@material-ui/core"
import { useEffect, useState } from "react"

function QuickAlert({ msg, timerLimit }) {
    let [openDialogState, changeOpenDialogState] = useState(true);
    let handleClose = () => {
        changeOpenDialogState(false)
    }
    useEffect(() => {
        if (timerLimit) {
            setTimeout(() => {
                changeOpenDialogState(false)
            }, timerLimit)
        }
    }, [timerLimit])
    return <>
        <Dialog
            open={openDialogState}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Important</DialogTitle>
            <DialogContent>
                <Container>
                    {msg}
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ color: "red" }} autoFocus>
                    Close
          </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default QuickAlert;
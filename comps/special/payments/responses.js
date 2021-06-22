import { Button, Container,Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@material-ui/core"
import { CheckCircle } from "@material-ui/icons"

function Success({ openDialog, hookToggleDialog,successResponse }) {
    let handleClose = (e) => {
        hookToggleDialog(false)
    }
    return <>
        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Payment Response</DialogTitle>
            <DialogContent>
                <Grid container justify="center" alignItems="center" style={{ height: "50vh" }} >
                    <CheckCircle style={{ color: "green" }} />
                    <Container>

                    </Container>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Ok
      </Button>
            </DialogActions>
        </Dialog>
    </>
}

function Failure({ openDialog, hookToggleDialog ,failureResponse}) {
    let handleClose = (e) => {
        hookToggleDialog(false)
    }
    console.log("fftgftgft: "+openDialog);
    return <>
        <Dialog
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Payment Response: Failed</DialogTitle>
            <DialogContent>
                <Grid container justify="center" alignItems="center" style={{ height: "50vh" }} >
                    <CheckCircle style={{ color: "green" }} />
                    <Container>

                    </Container>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Ok
      </Button>
            </DialogActions>
        </Dialog>
    </>
}

export { Success, Failure }
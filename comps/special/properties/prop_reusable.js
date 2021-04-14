import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import Image from "next/image";
import React from "react";

function AddImageView(params) {
    return <>
        <Container>
            <Image width={300} height={300} src="/camera_placeholder.jpg" />
        </Container>
        <Container>
            <Grid justify="space-evenly" container >
                <AddBtn />
                <AddBtn />
                <AddBtn />
                <AddBtn />
                <AddBtn />
            </Grid>
        </Container>
    </>
}

function AddBtn(params) {
    return <>
        <button className="w3-btn" style={{
            backgroundColor: "rgba(189, 195, 199, 1)",
        }}>
            <FontAwesomeIcon size="1x" icon={faPlus}
                style={{
                    color: "#60941a",
                }} />
        </button>
    </>
}

const useStyles = makeStyles((theme) => ({
    container: {
    },
    form: {
        marginTop: "30px"
    },
    textField: {
        marginBottom: "20px",
        paddingLeft: "5px",
        fontSize: "20px",
        borderWidth: 1,
    },
    formDiv: {
        width: "100%",
        marginBottom: "25px",
        marginLeft: "10%",
    },
}));

/**
 * 
 * @param {Object} props
 * @param {String} props.labelTitle
 * @param {String} props.valueProps
 * @param {(e:InputEvent)=>{}} props.handleChangeProps
 * @param {[{value:String|Number,text:""}]} props.selectMenuArr
 * @param {React.CSSProperties} props.stylesProps
 * @param {Boolean} props.required
 * @returns 
 */
function MySelect(props = {
    labelTitle: "", valueProps, selectMenuArr,required, stylesProps:undefined,
    handleChangeProps: (e) => {
    }
}) {
    let { labelTitle, valueProps, selectMenuArr, stylesProps ,handleChangeProps} = props
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <InputLabel id="demo-controlled-open-select-label">
                <h4>{labelTitle}</h4></InputLabel>
            <Select
                value={valueProps}
                onChange={handleChangeProps}
                displayEmpty
                className={classes.textField}
                inputProps={{ 'aria-label': 'Without label' }}

                style={stylesProps}

            >
                {selectMenuArr.map(({ value, text }, index) =>  <MenuItem 
                key={index} value={value} >{text}</MenuItem>)}
            </Select></FormControl>
    </>
}

export { AddImageView, MySelect }
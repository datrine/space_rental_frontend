import { FormControl, Input, makeStyles, MenuItem, Select } from "@material-ui/core";
import { ArrowUpward } from "@material-ui/icons";
import View from "../view";
import {ItemTemplate} from "./itemTemplate"
import { Loading, LogoSVG } from "./loading"
import QuickAlert from "./quickAlert";
import SliderComp from "./sliderComp";

function ToTheTop() {
    let body = document.body;
    let html = document.documentElement
    let height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    return <>
        <a href="#">
            <button className="" style={{
                position: "fixed", bottom: 70, right: 20, width: 40, height: 40, textAlign: "center",
                borderRadius: "50%", border: 0, backgroundColor: "rgba(96,148,26,0.7)"
            }} >
                <ArrowUpward style={{ color: "white" }} />
            </button></a>
    </>
}

const useStyles = makeStyles((theme) => ({
    container: {
    },
    form: {
        marginTop: "30px"
    },
    textField: {
        marginBottom: "5px",
        paddingLeft: "5px",
        borderWidth: 0.5,
        borderBottomStyle: "solid",
        //borderRadius: "5px"
    },
    textArea: {
        marginBottom: "5px",
        paddingLeft: "5px",
        borderWidth: 1,
        borderStyle: "solid",
        //borderRadius: "5px"
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
 * @param {String} props.nameProps
 * @param {(e:InputEvent)=>{}} props.handleChangeProps
 * @param {[{value:String|Number,text:""}]} props.selectMenuArr
 * @param {React.CSSProperties} props.stylesProps
 * @param {Boolean} props.required
 * @returns 
 */
 function MySelect(props = {
    labelTitle: "", valueProps, selectMenuArr, nameProps, required, stylesProps: undefined,
    handleChangeProps: (e) => {
    }
}) {
    let { labelTitle, valueProps, nameProps, selectMenuArr, stylesProps, handleChangeProps } = props
    let classes = useStyles()
    return <>
        <FormControl fullWidth style={{ marginBottom: "30px" }}>
            <h5 style={{ color: "black", }}>{labelTitle}</h5>
            <Select id={nameProps}
                value={valueProps}
                onChange={e => {
                    console.log(e.target.value)
                    return handleChangeProps(e)
                }}
                displayEmpty
                className={classes.textField}
                inputProps={{ 'aria-label': 'Without label' }}
                style={stylesProps}

            >
                {selectMenuArr.map(({ value, text }, index) => <MenuItem
                    key={index} value={value} >{text}</MenuItem>)}
            </Select></FormControl>
    </>
}

/**
 * 
 * @param {Object} props
 * @param {String} props.labelTitle
 * @param {String} props.valueProps
 * @param {String} props.type
 * @param {String} props.placeholder
 * @param {(e:InputEvent)=>{}} props.handleChangeProps
 * @param {[{value:String|Number,text:""}]} props.selectMenuArr
 * @param {React.CSSProperties} props.stylesProps
 * @param {Boolean} props.required
 * @returns 
 */
function MyInput(props = {
    labelTitle: "", valueProps, placeholder, type, selectMenuArr, required, stylesProps: undefined,
    handleChangeProps: (e) => {
    }
}) {
    let { labelTitle, valueProps, placeholder, selectMenuArr, stylesProps, type, handleChangeProps } = props
    let classes = useStyles()
    return <>

        <FormControl fullWidth style={{ marginBottom: "30px" }}>
            <h5 style={{ color: "black", }}>{labelTitle}</h5>
            <Input onChange={handleChangeProps} value={valueProps} placeholder={placeholder}
                name="email" type={type}
                className={classes.textField} />
        </FormControl>
    </>
}

export {ItemTemplate,Loading,LogoSVG,ToTheTop,MySelect,MyInput,View,SliderComp,QuickAlert}
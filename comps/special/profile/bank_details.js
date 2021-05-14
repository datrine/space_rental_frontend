import { FormControl, MenuItem, Select, Container, Grid, Input, InputAdornment, Button, IconButton } from "@material-ui/core"
import { createContext, useContext, useEffect, useState } from "react"
import { AccountBalance, Person, PlusOneRounded } from "@material-ui/icons"
import { useStyles } from "./styles"
import { verifyAccount, getBankCodes } from "../../../utils/bank_transactions"
import { ProfileContext } from "../../../utils/contexts"
import { bankObj } from "../../../utils/models/exportModels"
import _ from "lodash"
import { appColor } from "../../../utils/utilFns"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"

export default function BankDetails({ }) {
    let { profile, changeContext } = useContext(ProfileContext);
    let { bankDetails } = profile
    return <>
        <FormControl fullWidth style={{ marginBottom: "10px" }}>
            <h4
                style={{
                    color: "white", backgroundColor: appColor, paddingLeft: "5px"
                }}>Bank Details</h4>
            {bankDetails.map(({ }, index) => <BankObj key={index} indexProps={index} />)}
            <IconButton variant="contained" color="primary" onClick={
                e => {
                    bankDetails.push({
                        bankCode: "", bankName: "",
                        accountNumber: "", accountName: ""
                    });
                    changeContext({ ...profile, bankDetails })
                }
            } ><FontAwesomeIcon icon={faPlusCircle} size="2x" /></IconButton>
        </FormControl>
    </>
}

function BankObj({ indexProps }) {
    return <>
        <BankList indexProps={indexProps} />
        <AccountNumber indexProps={indexProps} />
        <AccountName indexProps={indexProps} />
    </>
}

function BankList({ indexProps }) {
    let { profile, changeContext } = useContext(ProfileContext);
    let { bankDetails } = profile
    let bankObj = bankDetails[indexProps];
    let { bankCode, bankName } = bankObj
    let classes = useStyles()
    let [banksState, changeBanksState] = useState([bankObj]);
    /**
     * @type {[bankDetails]}
     */
    let banks = banksState
    useEffect(() => {
        if (banksState.length > 1) {
            return;
        }
        (async () => {
            try {
                let data = await getBankCodes();
                changeBanksState(data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, []);
    return <>
        <FormControl fullWidth style={{ marginBottom: "10px" }}>
            <h5 style={{ color: "black", }}>Select Bank</h5>
            <Select
                displayEmpty
                className={classes.textField}
                inputProps={{
                    'aria-label': 'Without label',
                    onChange: e => {
                        let bankCode = e.target.value
                        let bankName = e.currentTarget.textContent;
                        bankObj = { ...bankObj, bankCode, bankName }
                        bankDetails[indexProps] = bankObj;
                        changeContext({ ...profile, bankDetails });
                    }, value:bankCode, name: "bank"
                }}>
                {banks.map(({ bankCode, bankName }, index) => <MenuItem
                    key={index} value={bankCode} >{bankName}</MenuItem>)}
            </Select>
        </FormControl>
    </>
}

function AccountNumber({ indexProps }) {
    let { profile, changeContext } = useContext(ProfileContext);
    let { bankDetails } = profile
    let bankObj = bankDetails[indexProps];
    let { accountNumber, bankCode } = bankObj
    let classes = useStyles()
    let [accountNumberState, changeAccountNumberState] = useState(accountNumber)
    return <>
        <FormControl fullWidth>
            <Input onChange={async e => {
                try {
                    let accountNumber = e.target.value
                    changeAccountNumberState(accountNumber)
                    bankObj = { ...bankObj, accountNumber }
                    bankDetails[indexProps] = bankObj;
                    if (accountNumber.length < 10) {

                        changeContext({ ...profile, bankDetails });
                    }
                    else if (accountNumber.length === 10) {
                        let resultObj = await verifyAccount({
                            account_number: accountNumber,
                            account_bank: bankCode
                        });
                        bankDetails[indexProps] = {
                            ...bankObj,
                            accountName: resultObj.accountName
                        };
                        console.log(resultObj);
                        changeContext({ ...profile, bankDetails });
                    }
                } catch (error) {
                    console.log(error);
                }
            }} value={accountNumberState}
                placeholder="Account number ..." fullWidth
                startAdornment={
                    <InputAdornment position="start">
                        <Person /></InputAdornment>
                } name="accountName"
                className={classes.textField} />
        </FormControl></>
}

function AccountName({ indexProps }) {
    let { profile, changeContext } = useContext(ProfileContext);
    let { bankDetails } = profile
    let bankObj = bankDetails[indexProps];
    let { accountName } = bankObj
    let classes = useStyles()
    return <>
        <FormControl fullWidth>
            <Input disabled={true} value={accountName}
                placeholder="Account number ..." fullWidth
                startAdornment={
                    <InputAdornment position="start">
                        <Person /></InputAdornment>
                } name="accountName"
                className={classes.textField} />
        </FormControl></>
}
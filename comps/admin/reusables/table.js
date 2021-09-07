import { Container, Table, TableBody, TableHead, TableCell, TableRow, Typography } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { isArray } from "lodash";
import React from "react";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const MyTable = ({ data = [] }) => {
    let heads = getTableHeaders(data);
    return <>
        <Container>
            <h3>Orders</h3>
            <Container>
                <Table>
                    <TableHead>
                        <TableRow>
                            {heads.map((head, index) =>
                                <StyledTableCell key={index}>{head}</StyledTableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => <StyledTableRow key={index} >
                            <FormatObj data={item} />
                        </StyledTableRow>)}
                    </TableBody>
                </Table>
            </Container>
        </Container>
    </>

}

function FormatObj({ data, isCell = true }) {
    let view = []
    let InnerFn = ({ data, isCell }) => {
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const element = data[key];
                view.push(<MakeCell element={element} />)
            }
        }
    }
    InnerFn({ data, isCell })
    return view;
}

function MakeCell({ element }) {
    return <> <StyledTableCell align="right">
        <div> <MakeUnit element={element} /></div>
    </StyledTableCell>
    </>
}

function MakeUnit({ element }) {
    if (typeof element === "number" || typeof element === "string") {
        return <>
            <Typography style={{ marginLeft: "10px" }}>{element}</Typography>
        </>
    }
    if (React.isValidElement(element)) {
        return <>{element}</>
    }
    if (Array.isArray(element)) {
        let view = []
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const prop = element[key];
                view.push(<MakeUnit element={prop} />)
            }
        }
        return <>
            {view}
        </>
    }
    if (typeof element === "object" && !Array.isArray(element)) {
        let view = []
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const prop = element[key];
                view.push(<MakeUnit element={prop} />)
            }
        }
        return <>
            {view}
        </>
    }
}

let getTableHeaders = (data) => {
    if (!Array.isArray(data)) {
        throw "data is not an array"
    }
    let heads = Object.getOwnPropertyNames(data[0]);
    return heads
}

export default MyTable;
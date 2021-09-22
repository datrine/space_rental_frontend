import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { AppBar, Container, Tab, Typography, Tabs, Box, } from '@material-ui/core';
import { SearchBtnForRent, SearchByLocation } from "../searchApp";
import { Categories } from "../searchApp/categories";
import SliderComp from "../searchApp/sliderComp";

function SearchTab({...props }) {
    let [tabValue, changeTabValue] = useState("rent")
    return <>
        <Container className="">
            <Tabs value={tabValue} indicatorColor="primary" onChange={
                (e, value) => {
                    changeTabValue(value);
                }
            } centered >
                <Tab label="Rent" value="rent"
                    style={{ color: tabValue === "rent" ? "green" : "black" }} />
                <Tab label="Buy" value="buy"
                    style={{ color: tabValue === "buy" ? "green" : "black" }} />
                <Tab label="Invest" value="invest"
                    style={{ color: tabValue === "invest" ? "green" : "black" }} />
                <Tab label="Flatmate" value="flatmate"
                    style={{ color: tabValue === "flatmate" ? "green" : "black" }} />
            </Tabs>
            <TabPanel value={tabValue} index="rent" >
                <div className="container-fluid" >
                    <SearchByLocation />
                    <Categories />
                    <SliderComp />
                    <SearchBtnForRent {...props} />
                </div>
            </TabPanel>
            <TabPanel value={tabValue} index="buy" >
                <div className="container-fluid mb-5" >
                    <SearchByLocation />
                    <SliderComp />
                </div>
            </TabPanel>
            <TabPanel value={tabValue} index="invest" >
                <div className="container-fluid mb-5" >
                    <SearchByLocation />
                    <SliderComp />
                </div>
            </TabPanel>
            <TabPanel value={tabValue} index="flatmate" >
                <div className="container-fluid mb-5" >
                </div>
            </TabPanel>
        </Container>
    </>
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div className="container-fluid p-0"
            role="tabpanel"
            hidden={value !== index}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


export { SearchTab }
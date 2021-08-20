//import { Button, Col, Container, Row } from 'react-bootstrap';
import { Comp_Mob_Header } from "../general/comp_mob_menu"
import { Comp_Mob_Footer } from "../general/comp_mob_footer"
import { Container, Grid } from '@material-ui/core';
import { SplashScreen } from '../general/comp_splash_screen';
import { useEffect, useState } from 'react';
import { ToTheTop } from '../resuables/index';

let Tiles = () => {
    let listOf = [{
        link: "/residences",
        titleOf: "Find a place to stay",
        textOf: "Entire homes, apartment, rooms & more",
        imgSrcOf: "/home_find.png"
    }, {
        link: "/offices",
        titleOf: "Find a place to work",
        textOf: "Entire building, part of an office, & more",
        imgSrcOf: "/workspace_find.png"
    }, {
        link: "/investments",
        titleOf: "Find a real estate investment",
        textOf: "long-term or short-term investment in real esteate space",
        imgSrcOf: "/investment_find.png"
    }, {
        link: "/tenants",
        titleOf: "Find a tenant for your space",
        textOf: "House, Office & more",
        imgSrcOf: "/tenant_find.png"
    },]
    return <>
        {listOf.map(({ link, titleOf, textOf, imgSrcOf }, index) =>
            <a href={link} key={index} style={{ textDecoration: "none" }} >
                <Container className="w3-card"
                    style={{
                        width: "96%", marginLeft: "2%", marginRight: "2%", marginBottom: "15px", borderStyle: "solid",
                        borderWidth: 1, borderRadius: "20px", boxShadow: "10px 10px grey"
                    }} >
                    <Grid container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={10} sm={11} >
                            <h5 style={{ fontWeight: "bold" }}>
                                {titleOf.length > 44 ? (titleOf.substring(0, 40) + "...") : titleOf}
                            </h5>
                            <p>{textOf}</p>
                        </Grid>
                        <Grid item xs={2} sm={1} container direction="column" justify="flex-end" alignItems="center" >
                            <img width={50} height={50} src={imgSrcOf} />
                        </Grid>
                    </Grid>
                </Container>
            </a>)}  </>
}

let QuickFind = () => {
    return <>
    </>
}

export  {Tiles}
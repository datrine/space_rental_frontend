import Head from 'next/head'
import dynamic from 'next/dynamic'
//import { Button, Col, Container, Row } from 'react-bootstrap';
import { Comp_Mob_Header } from "../general/comp_mob_menu"
import { Comp_Mob_Footer } from "../general/comp_mob_footer"
import { PCMenu } from '../general/comp_pc_menu';
import { Comp_CustomerChatApp } from '../general/comp_chat_app';
import { Container, Grid } from '@material-ui/core';
import View from '../view';
import { useEffect, useState } from 'react';
import { useRef } from 'react';



let PCView = () => {
    return <>
        <PCMenu />
        <Comp_CustomerChatApp />
        <IndexBody />
    </>
}

let IndexBody = () => {
    return <>
        <div style={{
            padding: 0, backgroundImage: "url(wallpaper_index.svg)",
            backgroundRepeat: "no-repeat", backgroundPosition: "center",
            position: "absolute", top: 0, bottom: 0, left: 0
        }} >

            <Grid container justify="center" alignItems="center"
                style={{
                    backgroundColor: "rgba(96,148,26,0.7)", width: "100vw",
                    height: "100vh"
                }} >
                <h3 style={{color: "white",fontSize:"3.0em",textAlign:"center"
                }} >
                    Share & Find Amazing Tenants,Rooms, Offices & Real Estate Investments
                </h3>
            </Grid>
        </div>
    </>
}

export default PCView
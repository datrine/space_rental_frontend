import Head from 'next/head'
import dynamic from 'next/dynamic'
//import { Button, Col, Container, Row } from 'react-bootstrap';
import { Comp_Mob_Header } from "../comps/general/comp_mob_menu"
import { Comp_Mob_Footer } from "../comps/general/comp_mob_footer"
import { PCMenu } from '../comps/general/comp_pc_menu';
import { Comp_CustomerChatApp } from '../comps/general/comp_chat_app';
import { Container, Grid } from '@material-ui/core';
import { SplashScreen } from '../comps/general/comp_splash_screen';
import View from '../comps/view';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import MobileView from '../comps/index/mobile';
import PCView from '../comps/index/pc';


export default function Home() {
    return <>
        <View mobileView={<MobileView />} pcView={<PCView />} />
    </>
}
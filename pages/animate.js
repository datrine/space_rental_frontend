import Head from 'next/head'
import dynamic from 'next/dynamic'
//import { Button, Col, Container, Row } from 'react-bootstrap';
import { Comp_Mob_Header } from "../comps/general/comp_mob_menu"
import { Comp_Mob_Footer } from "../comps/general/comp_mob_footer"
import { PCMenu } from '../comps/general/comp_pc_menu';
import { Comp_CustomerChatApp } from '../comps/general/comp_chat_app';
import { Button, Container, FormControl, Grid, Input, InputAdornment } from '@material-ui/core';
import { SplashScreen } from '../comps/general/comp_splash_screen';
import View from '../comps/view';
import { useEffect, useState } from 'react';
import { screenMgr, stateMgr } from "../utils/utilFns"
import { ToTheTop } from '../comps/reusables';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { RepeatRounded, Visibility, VisibilityOff } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import { registerValidator } from '../utils/validators';
import { useStyles } from '../comps/special/profile/styles';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const DynamicPCComp = dynamic(() => Promise.resolve(PCView));
const DynamicMobileComp = dynamic(() => Promise.resolve(MobileView));
import {useSpring,animated,config} from "react-spring"

export default function Home() {
    return <>
        <View mobileView={<MobileView />} pcView={<PCView />} />
    </>
}

let PCView = () => {
    return <>
        <PCMenu />
        <Comp_CustomerChatApp />
    </>
}

let MobileView = () => {
    let [showFooterState, changeShowFooterState] = useState(true)
    return <>
        <Container onFocus={
            e => {
                if (e.target.type === "text" || e.target.type === "number") {
                    changeShowFooterState(false)
                }
            }
        } onBlur={
            e => {
                changeShowFooterState(true)
            }
        } style={{ padding: 0 }} >
            <Comp_Mob_Header />
            <Body />
            <Comp_Mob_Footer showMenu={showFooterState} />
        </Container>
    </>
}

let Body = () => {
    const [flip, set] = useState(false)
    const { number } = useSpring({
      reset: true,
      reverse: flip,
      from: { number: 0 },
      number: 1,
      delay: 200,
      config: config.molasses,
      onRest: () => set(!flip),
    })
  
    return<Container style={{marginTop:"70px"}} >
         <animated.div>{number.to(n => n.toFixed(3))}</animated.div>
    </Container>
}
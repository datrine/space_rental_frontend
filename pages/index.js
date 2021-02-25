import Head from 'next/head'
import dynamic from 'next/dynamic'
//import { Button, Col, Container, Row } from 'react-bootstrap';
import { HamburgerMenu } from "../comps/general/comp_mobile_menu"
import { PCMenu } from '../comps/general/comp_pc_menu';
import { Comp_CustomerChatApp } from '../comps/general/comp_chat_app';
const DynamicPCComp = dynamic(() => Promise.resolve(PCView));
const DynamicMobileComp = dynamic(() => Promise.resolve(MobileView));

let screenMgr = () => {
    if (typeof window !== "undefined") {
        let screenType;
        let screenWidth = screen.width
        if (screenWidth < 992) {
            screenType = "small";
            return { screenType }
        }
        else if (screenWidth >= 992) {
            screenType = "large";
            return { screenType }
        }
    }
}

export default function Home() {
  let { screenType } = screenMgr() || {};
  let indexView = null;
  switch (screenType) {
      case "small":
          indexView = <DynamicMobileComp />
          break;

      case "large":
          indexView = <DynamicPCComp />
          break;
      default:
          indexView = <>Loading...</>
          break;
  }
  return <>
      {indexView}
  </>
}

let PCView = () => {
    return <>
    <PCMenu/>
    <Comp_CustomerChatApp/>
    </>
}

let MobileView = () => {
    return <>
    <HamburgerMenu/>
    </>
}


import Head from 'next/head'
import dynamic from 'next/dynamic'
//import { Button, Col, Container, Row } from 'react-bootstrap';
import View from '../comps/view';
import MobileView from '../comps/index/mobile';
import PCView from '../comps/index/pc';


export default function Home() {
    return <>
        <View mobileView={<MobileView />} pcView={<PCView />} />
    </>
}
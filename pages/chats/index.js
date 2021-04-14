import { Comp_Mob_Header } from "../../comps/general/comp_mob_menu"
import { Comp_Mob_Footer } from "../../comps/general/comp_mob_footer"
import { PCMenu } from '../../comps/general/comp_pc_menu';
import ChatApp from '../../comps/special/chat/comp_chatApp';
import View from '../../comps/view';
import { useSession } from "next-auth/client";


export default function Home() {
   let[session,loading]=  useSession()
   console.log(session)
    return <>
        <View mobileView={<MobileView />} />
    </>
}

let PCView = () => {
    return <>
        <PCMenu />
    </>
}

let MobileView = () => {
    return <>
        <Comp_Mob_Header />
        <ChatApp />
        <Comp_Mob_Footer />
    </>
}


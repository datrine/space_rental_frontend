import { Container, Grid, Button, TextField, Input } from "@material-ui/core";
import { createContext, useContext, useEffect, useState } from "react";
import { Editor, EditorState } from 'draft-js'
import dynamic from 'next/dynamic';
import 'draft-js/dist/Draft.css';
import { convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';
const WYSIWYGEditor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
let EmailContext = createContext({
    emailData: {
        from: "admin@myspace4you.com",
        to: "" || [],
        subject: "",
        html: null,
        text: null,
    },
    changeContext: () => { }
})
const RichtextEditor = ({ }) => {
    let { emailData, changeContext } = useContext(EmailContext)
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    return (
        <div>
            <WYSIWYGEditor
                editorState={editorState}
                toolbarClassName="toolbar-class"
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                onEditorStateChange={(edState) => {
                    let edit = draftToHtml(convertToRaw(editorState.getCurrentContent()));
                    console.log(edit)
                    changeContext({ ...emailData, html: edit })
                    setEditorState(edState)
                }}
                // toolbarOnFocus
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list',
                        'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image',
                        'history'],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        // uploadCallback: this.uploadImageCallBack,
                        previewImage: true,
                        alt: { present: false, mandatory: false }
                    },
                }}
            />
        </div>
    )
}

function ComposeEmail(params) {
    let { emailData } = useContext(EmailContext)
    let [emailState, changeEmailState] = useState(emailData);
    return <>
        <EmailContext.Provider value={{
            emailData: emailState,
            changeContext: changeEmailState
        }} >
            <Container>
                <Grid container style={{ marginTop: "30px" }}>

                    <Grid container style={{ marginBottom: "10px" }}>
                        <Input value={emailState.from} onChange={
                            e => {
                                changeEmailState({ ...emailState, from: e.target.value })
                            }
                        } fullWidth placeholder="From..." />
                    </Grid>

                    <Grid container style={{ marginBottom: "10px" }}>
                        <Input value={emailState.to} onChange={
                            e => {
                                changeEmailState({ ...emailState, to: e.target.value })
                            }
                        } fullWidth placeholder="To..." />
                    </Grid>
                    <Subject />
                    <Grid container>
                        <RichtextEditor />
                    </Grid>
                    <Grid container>
                        <Button color="primary" variant="primary" onClick={
                            e => {
                                sendEmail({ ...emailState })
                            }
                        }>Send</Button>
                    </Grid>
                </Grid>
            </Container>
        </EmailContext.Provider>
    </>
}

function Subject(params) {
    let { emailData ,changeContext} = useContext(EmailContext)
    return <>
        <Grid container style={{ marginBottom: "10px" }}>
            <Input value={emailData.subject} onChange={
                e => {
                    changeContext({ ...emailData, subject: e.target.value })
                }
            } fullWidth placeholder="Subject..." />
        </Grid>
    </>

}

async function sendEmail({ to, from, html, text, subject, }) {
    try {
        let user = "AKIASWN6B2XUS7K3ZVWU";
        let host = "email-smtp.us-east-1.amazonaws.com";
        let pass = "BA/l2JneLo9vGocgeUUdsCAeyYvZD43/b80y/m6sSknL";
        let port = 465;
        let url = process.env.NEXT_PUBLIC_DATRISOFT_SERVICES_URL;
        let res = await fetch(`${url}/services/email/send`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ to, from, subject, html, user, host, pass, port })
        });
        if (!res.ok) {
            throw await res.json()
        }
        let data = await res.json()
        alert("Email sent...")
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default ComposeEmail;
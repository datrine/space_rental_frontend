import { Container } from "@material-ui/core";
import Image from "next/image";

function AddImageView(params) {
    return <>
        <Container>
            <Image width={300} height={300} src="/camera_placeholder.jpg" />
        </Container>
        </>
}

export {AddImageView}
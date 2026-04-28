import { Link } from "react-router-dom";
import styled from "styled-components";

const S = {}

    S.Header = styled.header`
        display: flex;
        align-items: center;
        height: 40px;
        border-bottom: solid 1px black;
        padding: 0 20px;
        justify-content: right;
    `

    S.Link = styled(Link)`
        text-decoration: none;
        margin-right: 6px;
    `

export default S;

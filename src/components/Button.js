import styled from "styled-components";
import { defaultTheme } from "../utils/ApplicationTheme";

const theme = defaultTheme

const Button = styled.button`
    padding: 12px 24px;
    font-size: 40px;
    border-radius: 6px;
    min-width: 20vw;
    cursor: pointer;
`

export const PrimaryButton = styled(Button)`
    color: ${theme.textColorOnPrimary};
    background-color: ${theme.primaryColor};
    border: none;
`

export const SecondaryButton = styled(Button)`
    background: none;
    border-color: ${theme.secondaryColor};
    color: ${theme.secondaryColor};
`

export const TertiaryButton = styled(Button)`
    border: none;
    background: none;
    color: red;

`

export default Button
import styled from "styled-components";
import { defaultTheme } from "../utils/ApplicationTheme";

const theme = defaultTheme

const Button = styled.button`
    padding: 12px 24px;
    font-size: 40px;
    min-width: 20vw;
    font-family: ${theme.primaryfont};
    
`

export const PrimaryButton = styled(Button)`

    color: ${theme.textColorOnPrimary};
    background: linear-gradient(180deg, #BA4344 0%, #3D0001 73.96%, #000000 100%);
    border-radius: 20px;
    border: none;
    box-shadow: inset 0px 4px 4px rgba(255, 255, 255, 0.51);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    cursor: pointer;
    transition:  box-shadow 0.2s linear, filter 0.2s linear;

    &:hover{
        background: linear-gradient(180deg, #FD5759 0%, #741617 50%, #010000 100%);
        box-shadow: inset 0px 4px 4px rgba(255, 255, 255, 0.51);
        filter: drop-shadow(0px 4px 15px #FF0000);
    }
    &:focus{
        box-shadow: inset 0px 4px 4px rgba(255, 255, 255, 0.51);
        filter: drop-shadow(0px 4px 30px #FF8888);
        background: linear-gradient(180deg, #FF1B1C 0%, #741617 54.69%, #010000 100%);
    }
    &:active{
        box-shadow: inset 0px 4px 4px rgba(255, 255, 255, 0.51);
        filter: drop-shadow(0px 0px 25px #FF0000);
        background: linear-gradient(180deg, #FF0002 0%, #741617 50%, #010000 100%);
    }
    &:disabled{
        box-shadow: inset 0px 4px 4px rgba(255, 255, 255, 0.25);
        background: linear-gradient(180deg, #ACACAC 0%, #626262 73.96%, #1F1F1F 100%);
    }
`

export const SecondaryButton = styled(Button)`
    transition:  box-shadow 0.2s linear;
    background: linear-gradient(180deg, #BABABA 0%, #FFFFFF 100%);
    box-shadow: inset 0px 4px 4px rgba(255, 255, 255, 0.51);
    border-radius: 20px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-color: rgba(186, 67, 68, 1);
    border-width: 5px;
    color: rgba(186, 67, 68, 1);
    cursor: pointer;
    transition:  box-shadow 0.2s linear, filter 0.2s linear;

    &:hover{
        box-shadow: 0px 3px 15px #FF0000;
    }
    &:focus{
        box-shadow: 0px 3px 30px #FF4747;
    }
    &:active{
        box-shadow: 0px 3px 30px #FF4747;
    }
    &:disabled{
        box-shadow: inset 0px 4px 4px rgba(255, 255, 255, 0.51);
        border-color: black;
       
    }
    
`

export const TertiaryButton = styled(Button)`
    border: none;
    background: none;
    cursor: pointer;
    background: linear-gradient(180deg, #BA4344 43.75%, #000000 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    transition:  text-shadow 0.2s linear, filter 0.2s linear;
    &:hover{
        text-shadow: 0px 4px 4px rgba(255, 0, 0, 0.42);

    }
    &:focus{
        background: linear-gradient(180deg, #BA4344 0%, #000000 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        text-shadow: 0px 4px 4px rgba(255, 0, 0, 0.42);
    }
    &:active{
        background: linear-gradient(180deg, #FF0002 0%, #FF0002 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        text-shadow: 0px 4px 4px rgba(255, 0, 0, 0.72);
    }
    &:disabled{
        box-shadow: inset 0px 4px 4px rgba(255, 255, 255, 0.51);
        border-color: black;
        background: linear-gradient(180deg, #969696 0%, #949393 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        text-shadow: none;
    }

`

export default Button
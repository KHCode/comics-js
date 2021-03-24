import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 10px;
    }

    *,
    *:before,
    *:after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    body {
        box-sizing: border-box;
        background-color: #EEEEEE;
        font-family: 'Roboto';
    }

    a{
        color: #353535;
        text-decoration: none;
    }
`;

export default GlobalStyle;
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.text_primary};   /* Apply primary text color */
    background-color: ${({ theme }) => theme.bg};  /* Ensure background color is correctly applied */
  }

  h1, h2, h3, h4, h5, h6, p, span {
    color: ${({ theme }) => theme.text_primary};    /* Set text color for all headings and paragraphs */
  }
`;

export default GlobalStyle;

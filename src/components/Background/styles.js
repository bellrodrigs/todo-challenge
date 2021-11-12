import styled from 'styled-components'

export const Container = styled.div`
    background-color: ${({theme}) => theme.backgroundPrimary};
    color: #ffffff;
    height: 100vh;
`

export const Image = styled.div`
    background-image: url(${({img}) => img});
    background-position: center center;
    position: absolute;
    width: 100%;
    height: 200px;
    background-repeat: no-repeat;
    z-index: 0;
`
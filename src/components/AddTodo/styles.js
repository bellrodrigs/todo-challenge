import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({theme}) => theme.backgroundSecundary};
  width: 30%;
  height: 60px;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 15px;
  box-shadow: 0px 35px 50px -15px ${({theme}) => theme.boxShadow};

  @media (max-width: 700px) {
    width: 70%;
  }
  
  `
export const Check = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 25px;
  height: 25px;
  border-radius: 30px;
  margin-right: 10px;
  border: 1px solid ${({theme}) => theme.darkGrayishBlue};
`

export const Input = styled.input`
  background-color: ${({theme}) => theme.backgroundSecundary};
  border: none;
  color:  ${({theme}) => theme.lightGrayishBlue};
  /* veryDarkGrayishBlue */
  font-family: 'Josefin Sans', sans-serif;
  font-size: 18px;
  &:focus-visible {
    outline: 0;
  }

  ::placeholder { 
    color: ${({theme}) => theme.darkGrayishBlue};
    opacity: 1; 
  }
  :-ms-input-placeholder {
    color: ${({theme}) => theme.darkGrayishBlue};
  }

  ::-ms-input-placeholder {
    color: ${({theme}) => theme.darkGrayishBlue};
  }
  `
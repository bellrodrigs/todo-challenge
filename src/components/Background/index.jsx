import React, { useContext, useState, useEffect } from 'react';
import {Container, Image} from './styles';
import bgDark from '../../assets/bg-desktop-dark.jpg';
import bgLight from '../../assets/bg-desktop-light.jpg';
import mobilebgDark from '../../assets/bg-mobile-dark.jpg'
import mobilebgLight from '../../assets/bg-mobile-light.jpg'
import {useDispatch} from 'react-redux'
import {ThemeContext} from 'styled-components'

export const Background = ({children, toogleTheme}) => {
    const {title} = useContext(ThemeContext)

    const [width, setWidth] = useState(window.innerWidth);
    const dispatch = useDispatch()


  const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
  }

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const defineImage = () => {
    if(width <= 768) {
      //is mobile
      return title === 'dark' ? mobilebgDark : mobilebgLight
    }
    else {
      return title === 'dark' ? bgDark : bgLight
    }
  }

  

  return (
    <Container>
        <Image img={defineImage()} />
        {children}
    </Container>
  );
}
import {useState} from 'react'
import {AddTodo} from './components/AddTodo'
import {TodoList} from './components/TodoList'
import {Background} from  './components/Background'
import {ThemeProvider} from 'styled-components'
import dark from './themes/dark'
import light from './themes/light';
import styled from 'styled-components'
import iconMoon from '../src/assets/icon-moon.svg'
import iconSun from '../src/assets/icon-sun.svg'

function App() {

  const [theme, setTheme] = useState(dark);

  const toogleTheme = () => {
    setTheme(theme.title === 'dark' ? light : dark)
  }

  return (
    <ThemeProvider theme={theme}>
      <Background toogleTheme={toogleTheme} >
        <div style={{position:'absolute'}}>
        <ContainterContent>
          <Header>
            <h1>TO DO</h1>
            <img width="20px" height="20px" src={theme.title === 'dark' ? iconMoon : iconSun} onClick={toogleTheme} />
          </Header>
          <AddTodo />
          <TodoList />
        </ContainterContent>
        </div>
      </Background>
    </ThemeProvider>

  );
}

export default App;


const ContainterContent = styled.div`
  z-index: 1;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;
  margin-top: 40px;
  font-family: 'Josefin Sans', sans-serif;


`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  align-items: center;

  img {
    cursor: pointer;
  }

  @media (max-width: 700px) {
    width: 70%;
  }
  


`


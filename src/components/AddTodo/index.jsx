import React, {useState, useRef, useReducer} from 'react';
import {useDispatch} from 'react-redux'
import { v4 as uuid_v4 } from 'uuid';
import {Container, Check, Input} from './styles'


export const AddTodo = () => {

  const dispatch = useDispatch()
  const inputRef = useRef('')
  const [inputValue, setInputValue] = useState('')

  const addTodo = (event) => {
    if(inputValue == '') return
    if (event.key === 'Enter' || event === 'button') {
      dispatch({
        type: 'ADD_TODOS',
        todo: {
          id: uuid_v4(),
          text: inputValue,
          completed: false
        }
      });
      setInputValue('')
      inputRef.current.value = ''
    }
  }

    return (
      <Container>
          <Check onClick={() => addTodo('button')} />
          <Input ref={inputRef} type="text" placeholder="Create a new todo..." onChange={(ev) => setInputValue(ev?.target?.value)} onKeyDown={addTodo} defaultValue={inputValue} />
      </Container>
    );
  }
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import check from '../../assets/icon-check.svg';
import styled from 'styled-components'


export const TodoList = () => {
  const dispatch = useDispatch()

  const todos = useSelector(state => state.todos.todos)
  
  useEffect(() => {
    setDataSource(todos)
  },[todos])

  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);


const ismobile = () => {
  if(width <= 768) {
    //is mobile
   return true
  }
  else {
    return false
  }
} 

  const [dataSource, setDataSource] = useState([])

  const checkIsCompleted = (type) => {
    let result;
    if(type === 'completed'){
      result = todos.filter(todo => todo.completed === true)
    }else {
      result = todos.filter(todo => todo.completed !== true)
    }
      return  setDataSource(result)
  }

  const clearCompleteds = () => {
    dispatch({
      type: 'CLEAR_COMPLETEDS'
    });
  }
  

  const removeTodo = (id) => {
    dispatch({
      type: 'REMOVE_ONE_TODO',
      id: id
    });
  }

  const completedTodo = (id) => {
    dispatch({
      type: 'COMPLETED_TODO',
      id: id
    });
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      dataSource,
      result.source.index,
      result.destination.index
    );
      setDataSource(items)
      dispatch({
        type: 'ADD_REORDER_TODOS',
        todo: items
      });
    
  }
 
  return (
   
    <Container>
      <DragDropContext onDragEnd={(param) => onDragEnd(param) }>
        <Droppable droppableId="droppable">
        {(provided, snapshot) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
            >

              {
                dataSource?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ItemList
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        
                        isDragging={snapshot.isDragging}
                      >
                        <div style={{display:'flex', alignItems:'center'}}>
                          {item.completed ? <Check onClick={() => completedTodo(item.id)}><img src={check} /></Check> : <UnCheck onClick={() => completedTodo(item.id)} />} <Text completed={item.completed}>{item.text} </Text>
                        </div>
                        <ActionButton onClick={() => removeTodo(item.id)}>X</ActionButton>
                      </ItemList>
                  )}
                  </Draggable>
                ))
              }
                {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      { !ismobile() ?  (<Footer>
          <span>{todos?.length} Items left</span>
          <div>
            <ActionButton onClick={() => setDataSource(todos)}>All</ActionButton>
            <ActionButton onClick={() => checkIsCompleted('')}>Active</ActionButton>
            <ActionButton onClick={() => checkIsCompleted('completed')}>Completed</ActionButton>
          </div>
          <ClearButton onClick={clearCompleteds}>ClearCompleted</ClearButton>  
      </Footer>)
      : (
        <>
          <Footer>
            <span>{todos?.length} Items left</span>
            
            <ClearButton onClick={clearCompleteds}>ClearCompleted</ClearButton>  
          </Footer>
          <FooterMobile>
              <ActionButton onClick={() => setDataSource(todos)}>All</ActionButton>
              <ActionButton onClick={() => checkIsCompleted('')}>Active</ActionButton>
              <ActionButton onClick={() => checkIsCompleted('completed')}>Completed</ActionButton>
          </FooterMobile>
        </>
      )
      }
    </Container>
  );
}

const Container = styled.div`
  width: 30%;
  background-color: ${({theme}) => theme.backgroundSecundary};
  border-radius: 6px;
  box-shadow: 0px 35px 50px -15px ${({theme}) => theme.boxShadow};
  font-family: 'Josefin Sans', sans-serif;
 
  @media (max-width: 700px) {
    width: 70%;
  }
`

const List = styled.div`
  background-color: ${({theme}) => theme.backgroundSecundary};
  border-radius: 10px;
  max-height: 70vh;
  overflow: auto;
  @media (max-width: 700px) {
    max-height: 50vh;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
  
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`

const ItemList = styled.div`
  background-color: ${({theme}) => theme.backgroundSecundary} !important;
  border-bottom: 1px solid ${({theme}) => theme.darkGrayishBlue};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 20px;
  box-sizing: border-box;
  font-size: 18px;
  text-transform: capitalize;
  border-radius: 6px 6px 0px 0px;
`
const Footer = styled.div`
  background-color: ${({theme}) => theme.backgroundSecundary} !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 20px;
  box-sizing: border-box;
  font-size: 18px;
  text-transform: capitalize;
  border-radius: 6px;
  span{
    font-size: 14px;
    color: ${({theme}) => theme.darkGrayishBlue};
  }
`

const FooterMobile = styled.div`
  background-color: ${({theme}) => theme.backgroundSecundary} !important;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 20px;
  box-sizing: border-box;
  font-size: 18px;
  text-transform: capitalize;
  border-radius: 0px  0px 6px 6px;
  border-top: 1px solid ${({theme}) => theme.darkGrayishBlue};
  span{
    font-size: 14px;
    color: ${({theme}) => theme.darkGrayishBlue};
  }
`

const ActionButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: ${({theme}) => theme.darkGrayishBlue};
  font-weight: 600;
  &:hover{
    color: ${({theme}) => theme.veryDarkGrayishBlue};
  }
`

const ClearButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: ${({theme}) => theme.darkGrayishBlue};
  &:hover{
    color: ${({theme}) => theme.veryDarkGrayishBlue};
  }
`

export const Check = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(120deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
  width: 25px;
  height: 25px;
  border-radius: 30px;
  margin-right: 10px;
  border: 1px solid ${({theme}) => theme.darkGrayishBlue};
  cursor: pointer;
`

export const UnCheck = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 25px;
  height: 25px;
  border-radius: 30px;
  margin-right: 10px;
  border: 1px solid ${({theme}) => theme.darkGrayishBlue};
  cursor: pointer;

`

const Text = styled.span`
  text-decoration: ${({completed}) => completed ? 'line-through' : null };
  color: ${({completed, theme}) => completed ? theme.darkGrayishBlue : theme.text};
`
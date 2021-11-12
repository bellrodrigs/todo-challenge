const INITIAL_STATE = {
    todos:[]
    
    };
     
    export default function pokemons(state = INITIAL_STATE, action){
     switch(action.type){
      case 'ADD_TODOS':
        return { ...state, todos:[ ...state.todos, action.todo]}
      case 'ADD_REORDER_TODOS':
        return { ...state, todos: action.todo}
      case 'CLEAR_ALL':
        return { todos: []}
      case 'REMOVE_ONE_TODO':
        return { ...state, todos:[ ...state.todos.filter(todo => todo.id !== action.id )]}
      case 'COMPLETED_TODO':
        return {...state, todos:[...state.todos.map(todo => (todo.id === action.id) ? {
            ...todo,
            completed: !todo.completed
        } : todo )]}
      case 'CLEAR_COMPLETEDS':
        return { ...state, todos:[ ...state.todos.filter(todo => todo.completed !== true )]}
      default:
        return state
      
    }
  }
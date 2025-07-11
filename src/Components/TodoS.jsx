import { useEffect, useState } from "react";
import "./css/Todo.css"

const TodoS = () =>{

    const [todo, setTodo] = useState(()=>{
        const savedTodos = localStorage.getItem("savedTodos");
            return savedTodos ? JSON.parse(savedTodos) : []
    });

    const [inputType, setInput] = useState("");

    const [ids, setIds] = useState(()=>{
        const savedids = localStorage.getItem("savedids");
        return savedids ? Number(savedids) : 1;
    });

    useEffect(()=>{
        localStorage.setItem("savedTodos", JSON.stringify(todo))
    }, [todo])

    useEffect(()=>{
        localStorage.setItem("savedids", ids)
    }, [ids])


    const AddTodo = ()=>{
        if(inputType.trim()===""){
            return;
        }
        const NewTodo = {
            id: ids,
            title: inputType,
            iscompleted: false
        }
        setTodo([...todo, NewTodo])
        setIds(ids+1)
        setInput("")
    }

    const is_completed = (ids)=>{
        setTodo(todo.map((item) =>{
            if(ids === item.id){
                return {...item, iscompleted: true}
            }
            return item
        }))
    }


    const DeleteTodo = (ids)=>{
        setTodo(todo.filter((item)=> item.id !== ids))
    }

    return(
    <div className="container">
        <div className="Todo-Header">
            <h2>Todo App</h2>
            <p>By Amulya</p>
        </div>

        <div className="Todo-Content">
            <div className="AddTodo">
            <input 
                className="TodoInput" 
                type="text" 
                placeholder="Add new task..."
                value={inputType}
                onChange={(e)=>setInput(e.target.value)}
            />
            <button onClick={AddTodo} className="Addbtn">Add</button>
            </div>

            <div className="Todolist">
            <table>
                <thead>
                <tr>
                    <th>Task</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {
                        todo.map((item)=>(
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>
                            {item.iscompleted ? (
                                <>
                                    <button onClick={() => DeleteTodo(item.id)} className="Xbtn">Delete</button>
                                    <span className="done">Completed</span>
                                </>


                            ) : (
                                <>
                                <button onClick={() => DeleteTodo(item.id)} className="Xbtn">Delete</button>
                                <button onClick={() => is_completed(item.id)} className="Cbtn">Complete</button>
                                </>
                            )}
                            </td>

                        </tr>
                        ))
                    }

                </tbody>
            </table>
            </div>
        </div>
    </div>

    );
}


export default TodoS;
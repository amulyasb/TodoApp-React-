import { useState } from 'react';
import './css/Todo.css'

const Todo = ()=>{


    const [task, setTask] = useState([]);
    const [text, setText] = useState("");


    const handelAdd = () =>{
        if(text.trim()===""){
            return;
        }
        const newTodo = {
            id: Date.now(),
            title: text
        };
        setTask([...task, newTodo])
        console.log(newTodo)
        setText("")
    }

    const handelDelete = (id)=>{
        setTask(task.filter(task => task.id !== id))
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
                    className='TodoInput' 
                    type="text" 
                    placeholder='Add new task...' 
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                />
                <button onClick={handelAdd} className='Addbtn'>Add</button>
            </div>
            <div className="Todolist">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Task</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {task.map((item, index)=>(
                            <tr key={item.id}>
                                <td>{index +1}</td>
                                <td>{item.title}</td>
                                <td><button onClick={() => handelDelete(item.id)}  className='Xbtn'>Delete</button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );

}

export default Todo;
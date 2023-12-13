import { useState } from "react";

export default function TodoCard({ todoItem, onTodoToggle, removeTodo }) {

    const [isChecked, setIsChecked] = useState(todoItem.isCompleted);

    function onCheckedChange(e) {
        setIsChecked(!isChecked);
        onTodoToggle();
    }

    return (
        <div className="card">
            <input type="checkbox" checked={isChecked} onChange={onCheckedChange} />
            <span className="todo-text">{todoItem.name}</span>
            <button className='remove-todo-button' onClick={removeTodo}>&#128465;</button>
        </div>
    );
}
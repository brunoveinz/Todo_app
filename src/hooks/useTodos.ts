import { useState } from "react";
import { Todo } from "../types/todo";
import { DEFAULT_TODO } from "../constant/default";

export const useTodos = () => {    
    const [tasks, setTasks] = useState<Todo[]>([]);

    const addTask = (text: string, category?: string, color?: string) => {
        const newTask: Todo = {
            id: Math.floor(Math.random() * 1000000),
            text: text,
            state: "pending",
            color: color || DEFAULT_TODO.color,
            category: category || DEFAULT_TODO.category,
            hour: DEFAULT_TODO.hour()
        }
        setTasks([...tasks, newTask]);
    }

    const removeTask = (id: number) => {
        setTasks(resentTask => resentTask.filter(task => task.id !== id))
    }

    return {
        tasks,
        addTask,
        removeTask,
    }
}



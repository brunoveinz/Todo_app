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

    const toggleTask = (id: number) => {

        setTasks(actualTask => {
            console.log("Lista actual de task", actualTask);

            const newTasks = []

            for (let i=0; i < actualTask.length; i++){

                const currentTask = actualTask[i]
                console.log(`Revisando tarea ${i}:`, currentTask)
                
                if (currentTask.id === id){
                
                    console.log("¡Encontré la tarea que quiero cambiar!");
                    let newState: "pending" | "complete"; 

                    if (currentTask.state === "complete"){
                        newState = "pending"
                        console.log("estaba completa, ahora sera pendiente")

                    }else{
                        newState="complete";
                        console.log("Estaba pendiente ahora sera completa")
                    }

                    const updatedTask = {
                    id: currentTask.id,           // ← Mismo ID
                    text: currentTask.text,       // ← Mismo texto
                    state: newState,              // ← NUEVO estado (único cambio)
                    color: currentTask.color,     // ← Mismo color
                    category: currentTask.category, // ← Misma categoría
                    hour: currentTask.hour        // ← Misma hora
                    };

                    console.log("Tarea actualizada:", updatedTask);
                    newTasks.push(updatedTask);

                }else {
                    console.log("Esta tara no la cambio, la dejo igual")
                    newTasks.push(currentTask)
                }
            }

            console.log("Nueva lista completa: ", newTasks)

            return newTasks;
        });
          console.log("toggleTask terminó, React actualizará la pantalla");
    }
    

    return {
        tasks,
        addTask,
        removeTask,
        toggleTask
    }
}



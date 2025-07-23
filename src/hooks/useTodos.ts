import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import { DEFAULT_TODO } from "../constant/default";
import { NotificationService } from "../services/notificationService";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useTodos = () => {    
    const [tasks, setTasks] = useState<Todo[]>([]);
    
    // Clave para guardar en AsyncStorage
    const STORAGE_KEY = 'todo_tasks';

    // Formato: JSON string del array de tareas
    // "[{id: 1, text: 'Hacer aseo', state: 'pending'}, ...]"

    const saveTasks = async (taskToSave: Todo[]) => {
        try {
            const jsonValue = JSON.stringify(taskToSave);
            await AsyncStorage.setItem(STORAGE_KEY,jsonValue);
            console.log("Tarea guardadas exitosamente")
        } catch (error) {
            console.error("Error guardando tareas:", error)
        }
    }

    const loadTasks = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
            if(jsonValue !== null){
                const loadedTasks: Todo[] = JSON.parse(jsonValue); // Convierte texto JSON a array
                
                // Convertir strings de fecha de vuelta a Date
                const tasksWithDates = loadedTasks.map((task: Todo) => ({
                    ...task,  // ← "Todos los parámetros quedan igual"
                    hour: typeof task.hour === 'string' ? new Date(task.hour) : task.hour
                    //    ↑ "EXCEPTO hour, que verifico si es string o Date"
                }));

                setTasks(tasksWithDates); // Actualiza el estado
                console.log("Tareas cargadas: ", loadedTasks.length, "tareas")
            } else {
                console.log("No hay tareas guardadas, empezando con lista vacia")
            }
        } catch (error) {
            console.error("Error cargando tareas:", error)
        }
    }
 
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
                        NotificationService.sendTaskCompletedNotification(currentTask.text);
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

    // Cargar tareas cuando se monta el componente (al abrir la app)
    useEffect(() => {
        loadTasks(); // Carga las tareas una sola vez al inicio
    }, []); // Array vacío = solo una vez

    // Guardar tareas cada vez que el array 'tasks' cambie
    useEffect(() => {
        saveTasks(tasks)
    }, [tasks]); // Se ejecuta cada vez que 'tasks' cambie
    
    return {
        tasks,
        addTask,
        removeTask,
        toggleTask,
    }
}



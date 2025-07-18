export interface Todo {
    id: number,
    text: string,
    state : State,
    color? : string,
    hour? : Date
    category? : string
}


type State = "pending" | "in-progress" | "complete" | "cancelled"


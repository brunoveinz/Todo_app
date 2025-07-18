export interface Todo {
    id: number,
    text: string,
    state : State
}


type State = "pending" | "in-progress" | "complete" | "cancelled"


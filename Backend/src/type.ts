export interface Message {
   room: string,
   message: string,
   client: string
}

export interface Room {
  client: string,
  room: string
}

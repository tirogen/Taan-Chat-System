export interface Message {
   room: string,
   message: string,
   client: string
}

export interface Room {
  client: string,
  room: string
}

export interface UnreadMessage {
   room: string,
   message: string,
   client: string,
   timestamp: string
}

export interface Unread {
  room: string,
  timestamp: string
}

export interface CounterAction {
    type: String
}

export interface CounterState {
    n: number,
    message: String
}

export interface ClientAction {
    type: string,
    name: string
}

export interface ClientState {
    name: string
}

export interface RoomAction {
    type: string,
    room: string
}

export interface RoomState {
    selectedRoom: string,
    yourRooms: string[],
    otherRooms: string[]
}

export interface MemberAction {
    type: string,
    member: string,
    room: string
}

export interface MemberState {
  members: {
    member: string,
    room: string
  }[]
}

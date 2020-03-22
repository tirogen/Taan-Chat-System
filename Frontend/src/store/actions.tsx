import { CounterAction, ClientAction, RoomAction, MemberAction } from './type';

export const increment = (): CounterAction => {
    return {
      type: 'INCREMENT'
    }
}

export const setName = (name: string): ClientAction => {
    return {
      type: 'SETNAME',
      name
    }
}

export const selectRoom = (room: string): RoomAction => {
    return {
      type: 'SELECTROOM',
      room
    }
}
export const joinRoom = (room: string): RoomAction => {
    return {
      type: 'JOINROOM',
      room
    }
}
export const leaveRoom = (room: string): RoomAction => {
    return {
      type: 'LEAVEROOM',
      room
    }
}
export const addRoom = (room: string): RoomAction => {
    return {
      type: 'ADDROOM',
      room
    }
}

export const joinMember = (member: string, room: string): MemberAction => {
    return {
      type: 'JOINMEMBER',
      member,
      room
    }
}
export const leaveMember = (member: string, room: string): MemberAction => {
    return {
      type: 'LEAVEMEMBER',
      member,
      room
    }
}

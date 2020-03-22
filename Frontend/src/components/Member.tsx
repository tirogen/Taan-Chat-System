import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AppState } from './../store';
import { MemberState } from './../store/type'

const Member: React.FC = () => {

  const { selectedRoom } = useSelector((state: AppState) => state.room)
  const { members } : MemberState = useSelector((state: AppState) => state.member)

  const listMembers: JSX.Element[] = [];
  members.map((member: any) => {
    if(member.room === selectedRoom)
      listMembers.push(<ListGroup.Item>{member.member}</ListGroup.Item>)
  })

  const roomMembers: JSX.Element[] = [
    <Card style={{ width: '18rem' }}>
      <ListGroup variant="flush">
        {listMembers}
      </ListGroup>
    </Card>
  ];

  return (
    <>
      <h2>Selected Room</h2>
      {selectedRoom}
      {roomMembers}
    </>
  )
}

export default Member;

import React, { useRef } from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../store';
import { setName } from './../store/actions'
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

  console.log(listMembers)
  return (
    <>
      {roomMembers}
    </>
  )
}

export default Member;

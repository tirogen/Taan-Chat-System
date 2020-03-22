import React, { useRef } from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../store';
import { setName } from './../store/actions'

const Member: React.FC = () => {

  const { selectedRoom } = useSelector((state: AppState) => state.room)
  const { members } = useSelector((state: AppState) => state.member)

  members.map((xx: any) => console.log(xx))

  /*const listMembers: JSX.Element[] = [];
  members.map((member: {
    member: string,
    room: string
  }) => {
    if(member.room === selectedRoom)
      listMembers.push(<ListGroup.Item>{member.member}</ListGroup.Item>)
  })*/

  /*const roomMembers: JSX.Element[] = [
    <Card style={{ width: '18rem' }}>
      <ListGroup variant="flush">
        {listMembers}
      </ListGroup>
    </Card>
  ];*/

  return (
    <>
      sad
    </>
  )
}

export default Member;

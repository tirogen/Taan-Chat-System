import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from './../store';
import { MemberState } from './../store/type'
import { people } from './../global';

const Member: React.FC = () => {

  const { selectedRoom } = useSelector((state: AppState) => state.room)
  const { members } : MemberState = useSelector((state: AppState) => state.member)

  const listMembers: JSX.Element[] = [];
  members.map((member: any): void => {
    if(member.room === selectedRoom){
      listMembers.push(
        <li className="list-group-item" key={Math.random()}>
          <div>
            <figure className="avatar">
              <img src={people(member.member)} className="rounded-circle" />
            </figure>
          </div>
          <div className="users-list-body">
            <div>
              <h5>{member.member}</h5>
            </div>
          </div>
        </li>
      )
    }
  })

  return (
    <>
      <div className="sidebar-group">
        <div className="sidebar active">
          <header>
            <span>{selectedRoom}</span>
          </header>
          <div className="sidebar-body hidescroll">
            <ul className="list-group list-group-flush">
              {listMembers}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Member;

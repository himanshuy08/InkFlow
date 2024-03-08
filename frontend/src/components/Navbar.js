import React from 'react';
import { Button } from '@/components/ui/button';

const Navbar = ({ users, leaveRoom }) => {
  return (
    <div className="navbar h-16  w-full flex justify-between items-center  fixed top-0 left-0 right-0 z-10">
      <h1 className="ml-4 text-xl font-bold text-gray-800">InkFlow.</h1>
      <div className="flex gap-5 items-center">
        {users.map((user) => (
          <span key={user.id} className="text-red">
            {user.name}
          </span>
        ))}
        <Button className="mr-4" onClick={leaveRoom} cursor>Leave</Button>
      </div>
    </div>
  );
};

export default Navbar;

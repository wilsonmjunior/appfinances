import React, { useState, useEffect, useReducer } from 'react';

function FriendStatus(props) {
  const isOnline = useFriendStatus(null);


  if (isOnline === null) {
    return 'Loading...';
  }

  return isOnline ? 'Online' : 'Offline';
}

// hook
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

function useProfile() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    setName('Antony')
    setType('admin')
  }, [])


  return {
    name,
    type
  }
}


export function useTodos() {
  const [list, setList] = useState<string[]>([])

  async function add() { }
  async function remove() { }

  return {
    list,
    add,
    remove
  }
}

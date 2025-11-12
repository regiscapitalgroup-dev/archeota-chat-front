import { useEffect, useState } from 'react';
import UsersGrid from '../components/UserGrid';
import { Classifiers } from '../mock/classifiers.mock';
import { _UserListMock } from '../mock/user_list.mock';
import { UserCompleteModel } from '../models/UserListModel';

const UsersList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserCompleteModel[]>([]);  

  const loadUsers = async (loader: boolean = true) => {
    if(loader) {
      setUsers([]);
      setLoading(true);
    }
    try {
      await new Promise<void>((res) => {
        setTimeout(() => {
          const _users = _UserListMock.map(u => ({...u, classifier: Classifiers.find(c => c.id === u.classifier_id)?.name}));
          setUsers(_users);
          res();
        }, 1000);
      });
    }
    finally {
      if(loader) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <UsersGrid
      onClassifierUpdate={() => loadUsers(false)}
      users={users ?? []}
      onEdit={() => {}}
      onDetail={() => {}}
      loading={loading}
    />
  )
}

export default UsersList

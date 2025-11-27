import { useCallback, useEffect, useRef, useState } from 'react';
import { deleteUser, getUsers } from '../../../services/usersService';
import UserManagement from '../components/pages/UserManagement';
import { UserListModel } from '../models/UserListModel';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';


const UsersList: React.FC = () => {
  const isMountedRef = useRef(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserListModel[]>([]);  
  
  const loadUsers = useCallback(async (loader: boolean = true) => {
    if(loader) {
      setUsers([]);
      setLoading(true);
    }
    try {
      const _users = await getUsers();
      if(isMountedRef.current)
        setUsers(_users);
    }
    finally {
      if(loader) {
        setLoading(false);
      }
    }
  }, []);
  
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const _onDetails = (id: number) => history.push(`/users/details/${id}`);
  const _onEdit = (id: number) => history.push(`/users/edit/${id}`);
  const _onCreate = () => history.push('/users/new');
  const _onDelete = async (id: number) => {
    const _result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this user?\nThis process can not be undone.',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn-danger text-white'
      }, 
      scrollbarPadding: false,
      heightAuto: false
    })
    if(!_result.isConfirmed)
      return;
    try {
      await deleteUser(id);
    }
    catch { }
    await loadUsers(false);
  };

  return (
    <UserManagement
      users={users}
      onEdit={_onEdit}
      onDetail={_onDetails}
      onDelete={_onDelete}
      onCreate={_onCreate}
      loading={loading}
      reloadUsers={loadUsers}
    />
  )
}

export default UsersList

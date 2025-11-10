import React, { useEffect, useMemo, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { useHistory } from 'react-router-dom'
import ActionTable from '../../../components/ActionTable'
import CheckAtomComponent from '../../../components/atoms/CheckAtomComponent'
import DataTableComponent from '../../../components/DataTableComponent'
import { getRoleDescriptionByCode } from '../../../helpers/role'
import { UserListModel } from '../models/UserListModel'
import { FilterProp } from '../../../components/molecules/models/FilterProp.Model'
import UsersToolbar from './UsersToolbar'
import { filterData } from '../../../services/utilsService'
import { KTSVG } from '../../../../_metronic/helpers'
import { getClassifierData } from '../../../helpers/classifier'
import { Classifiers } from '../mock/classifiers.mock'
import clsx from 'clsx'
import { ClassifierModel } from '../models/ClassifierModel'


const FilterProps: FilterProp[] = [
  {
    key: 'firstName',
    label: 'First name',
    type: 'text'
  },
  {
    key: 'lastName',
    label: 'Last name',
    type: 'text'
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text'
  },
  {
    key: 'role',
    label: 'Role',
    type: []
  },
  {
    key: 'classifier',
    label: 'Classification',
    type: [...Classifiers.map(c => c.name)]
  }
];


interface UsersGridProps {
  users: UserListModel[];
  onEdit: (id: number) => void;
  onDetail: (id: number) => void;
  onClassifierUpdate: () => void;
  loading: boolean;
}


const UsersGrid: React.FC<UsersGridProps> = ({users, onClassifierUpdate, loading = false}) => {
  const history = useHistory()
  const [filters, setFilters] = useState({firstName: '', lastName: '', email: '', role: [], classifier: []})
  const filteredUsers = useMemo(() => filterData(users, filters), [users, filters])
  const [filterProps, setFilterProps] = useState(FilterProps);

  useEffect(() => {
    setFilterProps([
    {
      key: 'firstName',
      label: 'First name',
      type: 'text'
    },
    {
      key: 'lastName',
      label: 'Last name',
      type: 'text'
    },
    {
      key: 'email',
      label: 'Email',
      type: 'text'
    },
    {
      key: 'role',
      label: 'Role',
      type: Array.from(new Map(users.map(user => [user.role, user])).values()).map(u => u.role)
    },
    {
      key: 'classifier',
      label: 'Classification',
      type: [...Classifiers.map(c => c.name)]
    }])
  }, [users])


  const handleResetFilter = () => {
    setFilters({firstName: '', lastName: '', email: '', role: [], classifier: []})
  }

  const handleCreateNew = () => {
    history.push('/users/new')
  }

  const _onDetails = (id: number) => {
    history.push(`/users/details/${id}`)
  }

  const _onEdit = (id: number) => {
    history.push(`/users/edit/${id}`)
  }

  const _onDelete = (id: number) => {
    
  }


  const _columns: TableColumn<UserListModel>[] = [
    {
      name: 'First name',
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: 'Last name',
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Role',
      cell: (row) => {
        return (
          <span
            className='badge badge-light-info fw-bolder text-uppercase fs-9 px-2 py-1 text-truncate'
          >
            {getRoleDescriptionByCode(row.role)}
          </span>
        )
      },
      sortable: true,
    },
    {
      name: 'Assigned users',
      selector: (row) => row.usersAssigned 
    },
    {
      name: 'Active',
      cell: (row) => (
          <CheckAtomComponent value={row.isActive}/>
      )
    },
    {
      name: 'Classification',
      cell: (row) => {
        // if(!row.classifier_id)
        //   return (<></>);
        const _classifier = getClassifierData(row.classifier_id!, Classifiers);
        // if(!_classifier)
        //   return (<></>);
        return ( 
          <span
              className={clsx('badge fw-bolder text-uppercase fs-9 px-2 py-1 text-truncate classifier', _classifier?.color)}
          >
            {_classifier?.name}
          </span>
      )}
    },
    {
      name: 'Actions',
      cell: (row) => (
        <ActionTable  onEdit={() => _onEdit(row.id)} onDelete={() => _onDelete(row.id)} onDetails={() => _onDetails(row.id)}/> 
      ),
    },
  ];

  const _handleChangeClasifier = (classifier: ClassifierModel) => {
    const _classifier = Classifiers.find(c => c.id === classifier.id);
    if(!_classifier)
      return;
    _classifier.color = classifier.color;
    onClassifierUpdate();
    setFilterProps([
      {
        key: 'firstName',
        label: 'First name',
        type: 'text'
      },
      {
        key: 'lastName',
        label: 'Last name',
        type: 'text'
      },
      {
        key: 'email',
        label: 'Email',
        type: 'text'
      },
      {
        key: 'role',
        label: 'Role',
        type: ['FINAL_USER']
      },
      {
        key: 'classifier',
        label: 'Classification',
        type: [...Classifiers.map(c => c.name)]
      }
    ]);
  }

  return (
    <div className='card shadow-sm mb-10'>
      <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder text-dark fs-3'>Users</span>
          <span className='text-muted mt-1 fs-7'>List of users</span>
        </h3>
        <div className='d-flex gap-2 ms-auto align-items-center position-relative'>
          {users.length > 0 && 
            <UsersToolbar onChangeClassifier={_handleChangeClasifier} classifiers={Classifiers} filters={filters} setFilters={setFilters} onReset={handleResetFilter} props={filterProps} />  
          }
          <button className='btn btn-sm btn-dark' onClick={handleCreateNew}>
            <KTSVG
              path="/media/icons/duotune/general/gen041.svg" 
              className="svg-icon-5 svg-icon-gray-500 ms-1" 
            />
            New User
          </button>
        </div>
      </div>

      <div className='card-body py-3'>
        <DataTableComponent<UserListModel>
          columns={_columns}
          data={filteredUsers}
          loading={loading}
          pagination
          paginationServer={false}
          totalRows={filteredUsers.length}
          customTitle={null}
          highlightOnHover
        />
      </div>
    </div>
  )
}

export default UsersGrid

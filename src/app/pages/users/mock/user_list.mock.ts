import { UserListModel } from "../models/UserListModel";

export const _UserListMock: UserListModel[] = [
  {
    id: 1,
    firstName: "Juan",
    lastName: "Perez",
    email: "mock@gmail.com",
    role: "FINAL_USER",
    isActive: true,
    isStaff: false,
    phoneNumber: '(+52)9991234455',
    usersAssigned: 5,
    country: 'Mexico',
    classifier_id: 0
  },
  {
    id: 2,
    firstName: "Luis",
    lastName: "Sanches",
    email: "mock@gmail.com",
    role: "FINAL_USER",
    isActive: true,
    isStaff: true,
    phoneNumber: '(+52)9991234455',
    usersAssigned: 1,
    country: 'United States',
    classifier_id: 1
  },
  {
    id: 3,
    firstName: "Luis",
    lastName: "Marquez",
    email: "mock@gmail.com",
    role: "FINAL_USER",
    isActive: false,
    isStaff: false,
    phoneNumber: '(+52)9991234455',
    usersAssigned: 0,
    country: 'Albania',
    classifier_id: 2
  },
  {
    id: 4,
    firstName: "Pedro",
    lastName: "Gutierrez",
    email: "mock@gmail.com",
    role: "FINAL_USER",
    isActive: false,
    isStaff: true,
    phoneNumber: '(+52)9991234455',
    usersAssigned: 10,
    country: 'Argentina',
    classifier_id: 3
  },
  {
    id: 5,
    firstName: "Jose",
    lastName: "Perez",
    email: "mock@gmail.com",
    role: "COMPANY MANAGER",
    isActive: true,
    isStaff: false,
    phoneNumber: '(+52)9991234455',
    usersAssigned: 5,
    country: 'Mexico',
    classifier_id: 3
  },
  {
    id: 6,
    firstName: "Luis",
    lastName: "Perez",
    email: "mock@gmail.com",
    role: "COMPANY MANAGER",
    isActive: true,
    isStaff: true,
    phoneNumber: '(+52)9991234455',
    usersAssigned: 1,
    country: 'United States',
    classifier_id: 1
  },
  {
    id: 7,
    firstName: "Pedro",
    lastName: "Marquez",
    email: "mock@gmail.com",
    role: "COMPANY MANAGER",
    isActive: false,
    isStaff: false,
    phoneNumber: '(+52)9991234455',
    usersAssigned: 0,
    country: 'Albania',
    classifier_id: 2
  },
  {
    id: 8,
    firstName: "Ivan",
    lastName: "Gutierrez",
    email: "mock@gmail.com",
    role: "COMPANY MANAGER",
    isActive: false,
    isStaff: true,
    phoneNumber: '(+52)9991234455',
    usersAssigned: 10,
    country: 'Argentina',
    classifier_id: 0
  }
];
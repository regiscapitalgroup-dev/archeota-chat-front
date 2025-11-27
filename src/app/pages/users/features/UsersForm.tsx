import { useEffect, useRef, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router-dom"
import { useUserById } from "../../../hooks/users/useUserById"
import { useUserRoles } from "../../../hooks/users/useUserRoles"
import { RouteParamsModel } from "../../shared/models/RouteParamsModel"
import UserManagementForm from "../components/pages/UserManagementForm"
import { UserFormModel } from "../models/UserFormModel"
import { useUserCompanies } from "../../../hooks/company/useUserCompanies"
import { createUser, updateUser, userImage } from "../../../services/usersService"
import { getURLImage } from "../../../services/utilsService"
import { shallowEqual, useSelector } from "react-redux"
import { RootState } from "../../../../setup"
import { UserRoles } from "../../../enums/userRoles"

const UsersForm: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth, shallowEqual)
  const history = useHistory();
  const location = useLocation();
  const isEdited = location.pathname.includes('/edit');
  const isMountedRef = useRef(false);
  const [ formValues, setFormValues ] = useState<UserFormModel | null>(null);
  const [sending, setSending] = useState(false);
  const { id: routeId } = useParams<RouteParamsModel>();
  const { user: userdata, loading: LoadingUser } = useUserById(Number(routeId));
  const { roles, loading: loadingRoles } = useUserRoles();
  const { companies, loading: loadingCompanies } = useUserCompanies();
  
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    }
  }, []);

  useEffect(() => {
    if(!userdata) {
      setFormValues(null);
      return;
    }
    setFormValues({
      id: userdata.id,
      first_name: userdata.firstName,
      last_name: userdata.lastName,
      email: userdata.email,
      role: userdata.role,
      country: userdata.country ?? '',
      company: userdata.companyId,
      classification: Number(userdata.classificationId) ?? null,
      address: userdata.address ?? '',
      phone_number: userdata.phoneNumber,
      national_id: userdata.nationalId,
      active: userdata.isActive
    });
  }, [userdata]);


  const _handleOnSend = async (value: UserFormModel, image: File|null, setStatus: (status: string) => void) => {
    if(!isMountedRef.current)
      return;
    setSending(true);
    try {
      let _userId: number | null = null;
      if(isEdited && !!userdata) {
        _userId = userdata.id;
        await updateUser(_userId, value);
      } 
      else  {
        const _created = await createUser(value);
        _userId = _created.id;
      }
      if(!!image && !!_userId)
        await userImage(_userId, image);
      history.push('/users');
    }
    catch (error) {
      setStatus((error as any)?.response?.data?.email?.[0] ?? "There was an error while saving the information. Please try again.")
    }
    finally {
      if(isMountedRef.current)
        setSending(false);
    }
  };

  return (
    <div className='card mb-10'>
      <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
          <h3 className="card-title align-items-start flex-column">
                <span className='fw-bolder text-dark fs-3'>Users</span>
                <span className='text-muted mt-1 fs-7'>{ isEdited ? 'Edit your user': 'Create an user'  }</span>
          </h3>
      </div>
      <UserManagementForm
        roles={roles}
        loadingRoles={loadingRoles}
        isEdited={isEdited}
        initialValues={formValues ?? undefined}
        loadingForm={LoadingUser}
        companies={companies}
        loadingCompanies={loadingCompanies}
        sending={sending}
        onSubmit={_handleOnSend}
        imagePreview={userdata?.profilePicture ? getURLImage(userdata.profilePicture): undefined}
        onCancel={() => history.push('/users')}
      />
    </div>
  )
}

export default UsersForm;
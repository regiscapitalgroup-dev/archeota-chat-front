import { useEffect, useRef, useState } from "react";
import { registerAccount } from "../../../services/authService";
import RegisterForm from "../components/pages/RegisterForm";
import RegisterSuccess from "../components/pages/RegisterSuccess";
import AuthTemplateWrapper from "../components/templates/AuthTemplateWrapper";
import { RegisterAccountModel } from "../models/RegisterAccountModel";
import clsx from "clsx";



const Register = () => {
    const isMountedRef = useRef(false);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const _handleSubmit = async (values: RegisterAccountModel, setStatus: (status?: any) => void) => {
        setLoading(true);
        try {
            await registerAccount(values);
            if(isMountedRef.current) {
                setIsSuccess(true);
            }
        }
        catch (error) {
            if(isMountedRef.current) {
                setStatus((error as any)?.response?.data?.email?.[0] ?? "There was an error while saving the information. Please try again.")
                setIsSuccess(false);
            }
        }
        finally {
            if(isMountedRef.current)
                setLoading(false);
        }
    }
    
    return (
        <AuthTemplateWrapper className={clsx({ 'w-lg-750px': !isSuccess })}>
            { isSuccess ? 
                <RegisterSuccess/> : (
                <RegisterForm 
                    loading={loading}
                    onSubmit={_handleSubmit}
                />
            )}
        </AuthTemplateWrapper>
    )
}

export default Register;
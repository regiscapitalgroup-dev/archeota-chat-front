import clsx from "clsx";
import AuthLogoAtom from "../atoms/AuthLogoAtom";
import AuthFooter from "../molecules/AuthFooter";

type Props = {
    children: JSX.Element | JSX.Element[];
    className?: string;
}

const AuthTemplateWrapper: React.FC<Props> = ({ children, className }: Props) => {
    return (
        <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
            <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
                <AuthLogoAtom />
                <div className={clsx('w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto', className)}>
                    {children}
                </div>
            </div>
            <AuthFooter />
        </div>
    )
}

export default AuthTemplateWrapper;
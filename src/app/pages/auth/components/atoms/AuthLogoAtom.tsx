import { toAbsoluteUrl } from "../../../../../_metronic/helpers";

const AuthLogoAtom = () => {
    return (
            <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/archeota-dark.svg')}
                className='h-50px mb-12'
            />
    )
}

export default AuthLogoAtom;
import queryString from 'query-string'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

const LoginGoogleBtn = () => {
  const handleLogin = () => {
    const params = new URLSearchParams({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
        redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URI || '',
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
      });

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
    window.location.href = googleAuthUrl
  }

  return (
    <a
      href='#'
      className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'
      onClick={handleLogin}
    >
      <img
        alt='Logo'
        src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
        className='h-20px me-3'
      />
      Continue with Google
    </a>
  )
}

export default LoginGoogleBtn

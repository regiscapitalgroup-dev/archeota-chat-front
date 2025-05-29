// components/GoogleLoginButton.jsx
import {useEffect} from 'react'
import {registerGoogleV2} from '../redux/AuthCRUD'
import {useDispatch} from 'react-redux'
import * as auth from '../redux/AuthRedux'
export default function GoogleLoginButton() {
  const dispatch = useDispatch()
  useEffect(() => {
    const handleCredentialResponse = (response: any) => {
      const idToken = response.credential

      registerGoogleV2(idToken)
        .then((data) => {
          const {access} = data
          dispatch(auth.actions.login(access))
        })
        .catch((error) => {
          console.error('Error en login con Google:', error.response?.data || error.message)
        })
    }

    /* Inicializar y renderizar el botón de Google */
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
        callback: handleCredentialResponse
      })

      window.google.accounts.id.renderButton(document.getElementById('google-login-button'), {
        theme: 'outline',
        size: 'large'
      })

      window.google.accounts.id.prompt() // One Tap
    }
  }, [])

  return <div id='google-login-button'></div>
}

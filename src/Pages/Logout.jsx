import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Logout(props) {

            Cookies.remove("accessToken")
            props.setlogin(false)
        
    return <Navigate to="/" replace />;
  }

export default Logout
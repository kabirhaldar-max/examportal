import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

function RefreshHandlerAdmin({ setIsAuthenticatedAdmin }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticatedAdmin(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/admin/login'
            ) {
                navigate('/admin/users', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticatedAdmin])

    return (
        null
    )
}

export default RefreshHandlerAdmin
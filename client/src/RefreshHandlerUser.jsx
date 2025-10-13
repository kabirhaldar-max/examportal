import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

function RefreshHandlerUser({ setIsAuthenticatedUser }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuthenticatedUser(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/admin/login'
            ) {
                navigate('/courses');
            }
        }
    }, [location, navigate, setIsAuthenticatedUser])

    return (
        null
    )
}

export default RefreshHandlerUser
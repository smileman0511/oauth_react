import React from 'react';
import useAuthStore from '../../store/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const UnAuthLayout = () => {

    const { isAuthenticated } = useAuthStore()

    if(isAuthenticated){
        return <Navigate to="/" replace />
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default UnAuthLayout;
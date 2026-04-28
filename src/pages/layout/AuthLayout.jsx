import React from 'react';
import useAuthStore from '../../store/useAuthStore';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

// 로그인이 되어있지 않다면 접근하지 못하게 막아야한다.
// 만약 이전페이지(authStore)로 이동시키고 싶다면 페이지를 이동할 때마다
// 이전 페이지의 경로를 저장해두어야 한다. 또는 원하는 경로로 보내버린다.
const AuthLayout = () => {

    const { isAuthenticated } = useAuthStore()

    // 단, 페이지를 막으려면 Navigate 태그를 사용해야한다.
    if(!isAuthenticated){
        // replace: 왔던 기록을 없애버림.
        return <Navigate to="/" replace />
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
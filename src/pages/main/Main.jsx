import React from 'react';
import useAuthStore from '../../store/useAuthStore';

const Main = () => {
    
    const { isAuthenticated, member } = useAuthStore();





    return (
        <div>
            메인 페이지
            <h1>
                {isAuthenticated ? member?.memberName + "님 환영합니다!" : "비회원"}
            </h1>
        </div>
    );
};

export default Main;
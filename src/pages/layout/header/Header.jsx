import React from 'react';
import { Link } from 'react-router-dom';
import S from './style';
import useAuthStore from '../../../store/useAuthStore';

const Header = () => {

    const { isAuthenticated } = useAuthStore()

    return (
        // 숨겨야함
        <>
            {isAuthenticated ? (
                <S.Header>
                    <S.Link to={"/member/my-page"}>마이페이지</S.Link>
                    <S.Link to={"http://localhost:10000/logout"}>로그아웃</S.Link>
                </S.Header>
            ) : (
                <S.Header>
                    <S.Link to={"/member/join"}>회원가입</S.Link>
                    <S.Link to={"/member/login"}>로그인</S.Link>
                </S.Header>
            )}
        </>
    );
};

export default Header;
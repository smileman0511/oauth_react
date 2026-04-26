import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore';

function App() {

    const {isAuthenticated, member, setMember, setIsAuthenticated} = useAuthStore()

    useEffect(() => {

        // 최초 한 번 토큰으로 내 정보를 조회하는 서비스
        const intializeAuth = async () => {
            try {
                const response = await fetch("http://localhost:10000/api/members/me", {
                    credentials: "include"
                })
    
                if(!response.ok) throw new Error("Access Token Expired")
                
                const datas = await response.json()
                const {success, message, data} = datas
                if(success){
                    setMember(data)
                    setIsAuthenticated(true)
                }

            } catch (err) {
                // accessToken이 만료
                try{
                    console.log(err)
                    // 한 번 더 refresh 토큰과 accessToken을 백엔드로 보내서 accessToken 재발급
                } catch (err){
                    // refresh 토큰 만료 -> 재로그인
                }
            }
        }

        intializeAuth()
    } , [isAuthenticated])

    console.log(member)

    return (
        <RouterProvider router={router} />
    );
}

export default App;

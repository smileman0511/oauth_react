import { createBrowserRouter } from 'react-router-dom'
import Main from '../pages/main/Main';
import Layout from '../pages/layout/Layout';
import Join from '../pages/member/Join';
import Login from '../pages/member/Login';
import AuthLayout from '../pages/layout/AuthLayout';
import MyPage from '../pages/member/MyPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, 
        children: [
            {
                path: "",
                element: <Main />
            },
            {
                path: "member/join",
                element: <Join />
            },
            {
                path: "member/login",
                element: <Login />
            },
            {
                // 보호된 라우트
                element: <AuthLayout />,
                children: [
                    {
                        path: "member/my-page",
                        element: <MyPage />
                    }
                ]
            }
        ]
    },
])

export default router;
 

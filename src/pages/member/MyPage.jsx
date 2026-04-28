import React, { useEffect } from 'react';

// 마이페이지
const MyPage = () => {

    useEffect(() => {
        const testFetch = async () => {
            const response = await fetch("http://localhost:10000/private/my-page-test", {
                method: "POST",
                credentials: "include"
            })

            console.log("testFetch 실행")
        }

        testFetch()
    }, [])

    return (
        <div>
            로그인 후 접근할 수 있는 마이페이지😎
        </div>
    );
};

export default MyPage;
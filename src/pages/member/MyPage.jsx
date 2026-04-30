import React, { useEffect } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { useForm } from 'react-hook-form';
import S from './style';

// 마이페이지
const MyPage = () => {

    const { member, setMember} = useAuthStore()
    console.log(member)
    const { 
        register, handleSubmit, getValues, 
        formState: {isSubmitting, isSubmitted, errors}
    } = useForm({mode:"onChange"});

    const updateFile = async ({uploadFile}) => {
        // binary: 이미지, 음성, 영상 -> FormData는 binary 객체를 백엔드로 보내기 위한 프로토타입
        // 1. formDatas에 들어가있는 file을 백엔드로 전송
        const formData = new FormData()
        const file1 = uploadFile[0]
        formData.append("uploadFile", file1)

        const response = await fetch("http://localhost:10000/private/api/file/upload-file", {
            method: "POST",
            body: formData,
            credentials: "include",
        })

        // 2. 업로드가 완료된 새로운 경로를 리턴
        const {success, message, data} = await response.json()

        // 3. 기존의 유저의 정보에 새로운 업데이트된 이미지 경로로 변경 후 리랜더링

        if(success){

            const pictureResponse = await fetch(`http://localhost:10000/private/api/members/profile-update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    memberPicture: data.uploadedUrl
                })
            })

            const pictureDatas = await pictureResponse.json()
            if(pictureDatas.success){
                console.log(pictureDatas.message)
                console.log("업데이트 된 최종경로", pictureDatas.data.updatedMemberPictureUrl)
                setMember({...member, memberPicture: pictureDatas.data.updatedMemberPictureUrl})
            }
        }
    }

    // const updateFiles = async ({uploadFile}) => {
    //     console.log("uploadFile", uploadFile)
    //     const formData = new FormData()
    //     for(let file of uploadFile){
    //         formData.append("uploadFiles", file)
    //     }

    //     const response = await fetch("http://localhost:10000/private/api/file/upload-files", {
    //         method: "POST",
    //         body: formData,
    //         credentials: "include",
    //     })
        
    //     const {success, message, data} = await response.json()
    //     console.log("success", success)
    //     console.log("message", message)
    //     console.log("data", data)

    // }


    return (
        <div>
            <h2>프로필 수정</h2>
            <S.Thumbnail src={member?.memberPicture} />
            <form onSubmit={handleSubmit(updateFile)}>
                <input 
                    type="file"
                    // 이미지 여러개 설정
                    accept="image/*"
                    multiple
                    {...register("uploadFile", {required: true})}
                />
                {errors && errors.uploadFile?.type === "required" && <p>이미지 추가하세요</p>}
                <button disabled={isSubmitting}>프로필 수정</button>
            </form>
            로그인 후 접근할 수 있는 마이페이지😎
        </div>
    );
};

export default MyPage;
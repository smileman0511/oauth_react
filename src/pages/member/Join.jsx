import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// 회원가입
const Join = () => {
    const { 
        register, handleSubmit, getValues, 
                formState: {isSubmitting, isSubmitted, errors}
        } = useForm({mode:"onChange"});
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
    const navigate = useNavigate()

    const join = handleSubmit(async (data) => {
        console.log(data)
        const {memberPasswordConfirm, ...memberDTO} = data;

        await fetch("http://localhost:10000/api/members/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(memberDTO)
        })
        .then(async (res) => {
            if(!res.ok) {
                const error = await res.json()
                console.log(error)
                throw new Error(error?.message)
            }
            return await res.json()
        })
        .then((res) => {
            // 정상 응답일 때
            console.log(res)
            const {success, message, data} = res
            if(success){
                alert(`${message}(${data.memberProvider})`)
                navigate("/member/login")
            }
        })
        .catch((err) => {
            // error 처리!
            alert(err.message)
        })

    })

    return (
        <div>
            <form onSubmit={join}>
                <div>
                    <p>이메일</p>
                    <input 
                        {...register("memberEmail", {
                            required: true,
                            pattern: {
                                value: emailRegex
                            }
                        })}
                    />
                    {errors && errors?.memberEmail?.type === "required" && (
                        <p>이메일을 입력하세요</p>
                    )}

                    {errors && errors?.memberEmail?.type === "pattern" && (
                        <p>이메일 양식에 맞게 입력해주세요.</p>
                    )}
                </div>
                <div>
                    <p>비밀번호</p>
                    <input 
                        {...register("memberPassword", {
                            required: true,
                            pattern: {
                                value: passwordRegex
                            }
                        })}
                    />
                    {errors && errors?.memberPassword?.type === "required" && (
                        <p>비밀번호를 입력해주세요.</p>
                    )}
                    {errors && errors?.memberPassword?.type === "pattern" && (
                        <p>소문자, 숫자, 특수문자를 각 하나씩 포함한 8자리 이상이여야 합니다.</p>
                    )}
                </div>
                <div>
                    <p>비밀번호 확인</p>
                    <input 
                        {...register("memberPasswordConfirm", {
                            required: true,
                            validate: {
                                matchPassword : (memberPasswordConfirm) => {
                                    const {memberPassword} = getValues()
                                    console.log(memberPassword, memberPasswordConfirm, memberPassword === memberPasswordConfirm)
                                    return memberPassword === memberPasswordConfirm
                                }
                            }
                        })}
                    />
                    {errors && errors?.memberPasswordConfirm && (
                        <p>비밀번호가 일치하지 않습니다.</p>
                    )}
                </div>
                <div>
                    <p>이름</p>
                    <input 
                        {...register("memberName")}
                    />
                </div>
                <div>
                    <p>닉네임</p>
                    <input 
                        {...register("memberNickname")}
                    />
                </div>
                <button disabled={isSubmitting}>회원가입</button>
            </form>
        </div>
    );
};

export default Join;
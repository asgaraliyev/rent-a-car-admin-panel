import React from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const navigate=useNavigate()
    const onFinish = (values) => {
        Meteor.loginWithPassword(values.username,values.password,function(err,res){
           if(err){
                notification.error({message:err.reason})
            }else if(Meteor.user()){
                notification.success({message:"Uğurla daxil oldunuz"})
                navigate("/")
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='h-screen flex items-center justify-center'>
            <Form
                name="basic"
                className='w-1/2'
                initialValues={{
                }}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
            <h1 className='font-bold text-3xl text-center'>Daxil Ol</h1>
                <Form.Item
                    label="İstifadəçi adı"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Vacib bölmə",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Şifrə"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Vacib bölmə",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                >
                    <Button type="primary" htmlType="submit">
                        Göndər
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
import { useEffect, useState } from "react";
import {v4 as uuid4} from 'uuid';
import {Button, Form, Input, Divider} from 'antd'
import { useMutation } from "@apollo/client";
import { ADD_PERSON, GET_ALL_PEOPLE_WITH_CARS } from "../graphql/queries";

const AddPerson = () => {
    const [id] =  useState(uuid4())
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const [addPerson] = useMutation(ADD_PERSON)

    useEffect(()=>{
        forceUpdate({})
    },[])

    const onFinish = async (values) => {
    try {
        const { data } = await addPerson({
        variables: {
            firstName: values.firstName,
            lastName: values.lastName,
        },
        update: (cache, { data: { createPerson } }) => {
            try {
            const cachedData = cache.readQuery({
                query: GET_ALL_PEOPLE_WITH_CARS,
            });

            if (cachedData) {
                cache.writeQuery({
                query: GET_ALL_PEOPLE_WITH_CARS,
                data: {
                    getAllPeople: [...cachedData.getAllPeople, createPerson],
                },
                });
            }
            } catch (error) {
            console.error('Error updating cache:', error);
            }
        },
        });

        console.log("Added person:", data.createPerson);

        form.resetFields();
    } catch (error) {
        console.error("Error adding person:", error);
    }
    };
    
    return(
    <div>
        <Divider>Add Person</Divider>
        <Form
            name='add-person-form'
            layout="inline"
            size="large"
            style={{marginBottom: '40px'}}
            form={form}
            onFinish={onFinish} 
        >
            <Form.Item
                label="First Name"
                name='firstName'
                rules={[{required: true, message: 'Please enter a first name'}]}
            >
                <Input placeholder="First Name" />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name='lastName'
                rules={[{required: true, message: 'Please enter a last name'}]}
            >
                <Input placeholder="Last Name" />
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {()=>(
                    <Button
                    type="primary"
                    htmlType="submit"
                    disabled={
                        !form.isFieldsTouched(true) || form.getFieldError().filter(({errors}) => errors.length).length
                    }
                    >
                        Add Person
                    </Button>
                )}
            </Form.Item>
        </Form>
    </div>
    )
}

export default AddPerson
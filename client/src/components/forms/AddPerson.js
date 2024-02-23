import { useEffect, useState } from "react";
import {v4 as uuid4} from 'uuid';
import {Button, Form, Input} from 'antd'

const AddPerson = () => {
    const [id] =  useState(uuid4())
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(()=>{
        forceUpdate({})
    },[])

    return(
        <Form
            name='add-person-form'
            layout="inline"
            size="large"
            style={{marginBottom: '40px'}}
            form={form}
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
                        !form.isFieldsTouched()
                    }
                    >
                        Add Person
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddPerson
import { useEffect, useState } from "react";
import {v4 as uuid4} from 'uuid';
import {Button, Form, Input, InputNumber, Select} from 'antd'

const AddCar = () => {
    const [id] =  useState(uuid4())
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const onChange = (value) => {
        console.log('changed', value);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    useEffect(()=>{
        forceUpdate({})
    },[])

    return(
        <Form
            name='add-car-form'
            layout="inline"
            size="large"
            style={{marginBottom: '40px'}}
            form={form}
        >
            {/* Year of the car */}
            <Form.Item
                label="Year"
                name='year'
                rules={[{required: true, message: 'Please enter a year'}]}
            >
                <Input placeholder="Year" />
            </Form.Item>

            {/*  Make of the car */}
            <Form.Item
                label="Make"
                name='make'
                rules={[{required: true, message: 'Please enter a fabricant'}]}
            >
                <Input placeholder="Make" />
            </Form.Item>

            {/*  Model of the car */}
            <Form.Item
                label="Model"
                name='model'
                rules={[{required: true, message: 'Please enter a model'}]}
            >
                <Input placeholder="Model" />
            </Form.Item>

            {/*  Price of the car */}
            <Form.Item
                label="Price"
                name='price'
                rules={[{required: true, message: 'Please enter a price'}]}
            >
                <InputNumber
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={onChange}
                />
            </Form.Item>

            {/*  Person owner of the car */}
            <Form.Item
                label="Person"
                name='person'
                rules={[{required: true, message: 'Please select a person'}]}
            >
                <Select
                    placeholder="Select a person"
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                    options={[
                        {
                        value: 'jack',
                        label: 'Jack',
                        },
                        {
                        value: 'lucy',
                        label: 'Lucy',
                        },
                        {
                        value: 'Yiminghe',
                        label: 'yiminghe',
                        },
                    ]}
                    />
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
                        Add Car
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddCar
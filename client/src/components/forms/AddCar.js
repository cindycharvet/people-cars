import { useEffect, useState } from "react";
import { v4 as uuid4 } from 'uuid';
import { Button, Form, Input, InputNumber, Select, Divider } from 'antd';
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_PEOPLE_WITH_CARS, ADD_CAR } from "../graphql/queries";

const AddCar = () => {
    const [id] = useState(uuid4());
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    const { loading, error, data } = useQuery(GET_ALL_PEOPLE_WITH_CARS);
    const [addCar] = useMutation(ADD_CAR);

    const options = data?.getAllPeople.map(person => ({
        value: person.id,
        label: `${person.firstName} ${person.lastName}`,
    }));

    useEffect(() => {
        forceUpdate({});
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const onChangeYear = (value) => {
        form.setFieldsValue({ 'year': value }); 
    };

    const onFinish = async (values) => {
        try {
            const { data } = await addCar({
                variables: {
                    year: values.year,
                    make: values.make,
                    model: values.model,
                    price: values.price,
                    personId: values.person,
                },
                update: (cache, { data: { createCar } }) => {
                    try {
                        const cachedData = cache.readQuery({
                            query: GET_ALL_PEOPLE_WITH_CARS,
                        });

                        console.log("Cached Data:", cachedData); 

                        if (cachedData) {
                            cache.writeQuery({
                                query: GET_ALL_PEOPLE_WITH_CARS,
                                data: {
                                    getAllPeople: cachedData.getAllPeople.map((person) => {
                                        console.log("Current Person:", person); 
                                        if (person.id === values.person) {
                                            const updatedPerson = {
                                                ...person,
                                                cars: person.cars ? [...person.cars, createCar] : [createCar],
                                            };

                                            console.log("Updated Person:", updatedPerson); 
                                            return updatedPerson;
                                        }
                                        return person;
                                    }),
                                },
                            });
                        }
                    } catch (error) {
                        console.error('Error updating cache:', error);
                    }
                },
            });
            form.resetFields();
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    const peopleAvailable = options && options.length > 0

    return (
        peopleAvailable &&(
        <div>
        <Divider>Add Car</Divider>
        <Form
            name='add-car-form'
            layout="inline"
            size="large"
            style={{ marginBottom: '40px' }}
            form={form}
            onFinish={onFinish}
        >
            {/* Year of the car */}
            <Form.Item
                label="Year"
                name='year'
                rules={[{ required: true, message: 'Please enter a year' }]}
            >
                <InputNumber
                    placeholder="Year"
                    onChange={onChangeYear}
                    style={{ width: '100%' }}
                />
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
                />
            </Form.Item>

            {/*  Person owner of the car */}
            <Form.Item
                label="Person"
                name='person'
                rules={[{ required: true, message: 'Please select a person' }]}
            >
                <Select
                    placeholder="Select a person"
                    style={{ width: 120 }}
                    options={options}
                />
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(true) || form.getFieldError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Car
                    </Button>
                )}
            </Form.Item>
        </Form>
        </div>
        )
    );
};

export default AddCar;

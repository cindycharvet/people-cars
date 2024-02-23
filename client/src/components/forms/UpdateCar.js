import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_CAR, GET_CAR_BY_ID } from "../graphql/queries";

const UpdateCar = ({ car, onFinishUpdate, onCancelUpdate }) => {
  const [form] = Form.useForm();
  const [updateCar] = useMutation(UPDATE_CAR);

  const { loading: carLoading, data: carData } = useQuery(GET_CAR_BY_ID, {
    variables: { id: car.id },
    skip: !car.id,
  });

  useEffect(() => {
    if (!carLoading && carData) {
      const car = carData.getCarById;
      form.setFieldsValue({
        year: car.year,
        make: car.make,
        model: car.model,
        price: car.price,
        personId: car.personId,
      });
    }
  }, [car, carData, carLoading, form]);

  const onFinish = async (values) => {
    try {
      await updateCar({
        variables: {
          id: car.id,
          year: values.year,
          make: values.make,
          model: values.model,
          price: values.price,
          personId: values.personId,
        },
        update: (cache) => {
          try {
            const cachedData = cache.readQuery({
              query: GET_CAR_BY_ID,
              variables: { id: car.id },
            });

            if (cachedData) {
              cache.writeQuery({
                query: GET_CAR_BY_ID,
                variables: { id: car.id },
                data: {
                  getCarById: {
                    ...cachedData.getCarById,
                    ...values,
                  },
                },
              });
            }
          } catch (error) {
            console.error("Error updating cache:", error);
          }
        },
      });

      form.resetFields();
      onFinishUpdate && onFinishUpdate();
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
        <Form.Item label="Person ID" name="personId" rules={[{ required: true, message: "Please enter a person ID" }]}>
        <InputNumber placeholder="Person ID" disabled />
      </Form.Item>
      
      <Form.Item label="Year" name="year" rules={[{ required: true, message: "Please enter a year" }]}>
        <InputNumber placeholder="Year" />
      </Form.Item>

      <Form.Item label="Make" name="make" rules={[{ required: true, message: "Please enter a fabricant" }]}>
        <Input placeholder="Make" />
      </Form.Item>

      <Form.Item label="Model" name="model" rules={[{ required: true, message: "Please enter a model" }]}>
        <Input placeholder="Model" />
      </Form.Item>

      <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please enter a price" }]}>
        <InputNumber
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Car
        </Button>
        <Button type="default" onClick={onCancelUpdate} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateCar;

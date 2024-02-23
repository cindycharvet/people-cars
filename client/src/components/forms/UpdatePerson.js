import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { UPDATE_PERSON, GET_ALL_PEOPLE_WITH_CARS } from "../graphql/queries";

const UpdatePerson = ({ person, onEditSuccess, onCancelUpdate }) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [updatePerson] = useMutation(UPDATE_PERSON);

  useEffect(() => {
    form.setFieldsValue({
      firstName: person.firstName,
      lastName: person.lastName,
    });
    forceUpdate({});
  }, [person, form]);

  const onFinish = async (values) => {
    try {
      const { data } = await updatePerson({
        variables: {
          id: person.id,
          firstName: values.firstName,
          lastName: values.lastName,
        },
        update: (cache) => {
          try {
            const cachedData = cache.readQuery({
              query: GET_ALL_PEOPLE_WITH_CARS,
            });

            if (cachedData) {
              cache.writeQuery({
                query: GET_ALL_PEOPLE_WITH_CARS,
                data: {
                  getAllPeople: cachedData.getAllPeople.map((p) =>
                    p.id === person.id ? { ...p, ...values } : p
                  ),
                },
              });
            }
          } catch (error) {
            console.error("Error updating cache:", error);
          }
        },
      });

      console.log("Updated person:", data.updatePerson);

      onEditSuccess();
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  return (
    <Form
      name="update-person-form"
      layout="inline"
      size="large"
      style={{ marginBottom: "40px" }}
      form={form}
      onFinish={onFinish}
      onValuesChange={() => forceUpdate({})}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please enter a first name" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please enter a last name" }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <>
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldError().filter(({ errors }) => errors.length).length
              }
            >
              Update Person
            </Button>
            <Button type="default" onClick={onCancelUpdate} style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
};

export default UpdatePerson;

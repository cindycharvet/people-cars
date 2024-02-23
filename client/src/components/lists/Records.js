import React, { useState } from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { useQuery } from "@apollo/client";
import { GET_ALL_PEOPLE_WITH_CARS } from "../graphql/queries";
import DeleteButton from "../buttons/DeleteButton";
import UpdatePerson from "../forms/UpdatePerson";

const Records = () => {
  const { loading, error, data } = useQuery(GET_ALL_PEOPLE_WITH_CARS);

  const [editMode, setEditMode] = useState(null);

  const handleEdit = (personId) => {
    setEditMode(personId);
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log("data", data);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <>
      {data.getAllPeople.map((person) => (
        <Card
          key={person.id}
          title={`${person.firstName} ${person.lastName}`}
          actions={[
            <EditOutlined
              key={`edit-${person.id}`}
              onClick={() => handleEdit(person.id)}
            />,
            <DeleteButton itemId={person.id} isPerson />,
          ]}
        >
          {editMode === person.id ? (
            <UpdatePerson
              person={person}
              onEditSuccess={() => setEditMode(null)}
            />
          ) : (
            person.cars.map((car) => (
              <Card
                key={car.id}
                type="inner"
                title={`${car.year} ${car.make} ${car.model} -> ${formatCurrency(
                  car.price
                )}`}
                style={{
                  marginBottom: 16,
                }}
                actions={[
                  <EditOutlined
                    key={`edit-car-${car.id}`}
                    onClick={() => handleEdit(car.id)}
                  />,
                  <DeleteButton itemId={car.id} />,
                ]}
              ></Card>
            ))
          )}
          <Link>Learn More</Link>
        </Card>
      ))}
    </>
  );
};

export default Records;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { GET_ALL_PEOPLE_WITH_CARS } from "../graphql/queries";
import DeleteButton from "../buttons/DeleteButton";
import UpdatePerson from "../forms/UpdatePerson";
import UpdateCar from "../forms/UpdateCar"; 

const Records = () => {
  const { loading, error, data } = useQuery(GET_ALL_PEOPLE_WITH_CARS);
  const navigate = useNavigate();

  const [personEditMode, setPersonEditMode] = useState(null);
  const [carEditMode, setCarEditMode] = useState(null);

  const handlePersonEdit = (id) => {
    setPersonEditMode(id);
    setCarEditMode(null);
  };

  const handleCarEdit = (id) => {
    setCarEditMode(id);
    setPersonEditMode(null); 
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

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
              onClick={() => handlePersonEdit(person.id)}
            />,
            <DeleteButton itemId={person.id} isPerson />,
          ]}
        >
          {personEditMode === person.id ? (
            <UpdatePerson
              person={person}
              onEditSuccess={() => setPersonEditMode(null)}
              onCancelUpdate={() => setPersonEditMode(null)}
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
                    onClick={() => handleCarEdit(car.id)}
                  />,
                  <DeleteButton itemId={car.id} />,
                ]}
              >
                {carEditMode === car.id && (
                  <UpdateCar
                    car={car}
                    onFinishUpdate={() => setCarEditMode(null)}
                    onCancelUpdate={() => setCarEditMode(null)}
                  />
                )}
              </Card>
            ))
          )}
        <span style={{ color:"#1677ff", cursor: "pointer" }} onClick={() => navigate(`/people/${person.id}`)}>Learn More</span>
        </Card>
      ))}
    </>
  );
};

export default Records;

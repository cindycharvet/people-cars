import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PERSON_BY_ID_WITH_CARS } from "../graphql/queries";
import { Link, useParams } from "react-router-dom";

const PersonShow = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON_BY_ID_WITH_CARS, {
    variables: { id },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const person = data.getPersonById;

  return (
    <div>
      <h2>{`${person.firstName} ${person.lastName}`}</h2>
      {person.cars.map((car) => (
        <div key={car.id}>
          <p>{`${car.year} ${car.make} ${car.model} -> ${formatCurrency(
            car.price
          )}`}</p>
        </div>
      ))}
      <Link to="/" style={{ color:"#1677ff", cursor: "pointer" }}>
        Go Back Home
      </Link>
    </div>
  );
};

export default PersonShow;

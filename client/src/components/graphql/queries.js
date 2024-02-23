import {gql} from "@apollo/client";

export const ADD_PERSON = gql`
  mutation AddPerson($firstName: String!, $lastName: String!) {
    createPerson(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar(
    $year: Int!
    $make: String!
    $model: String!
    $price: Float!
    $personId: ID!
  ) {
    createCar(
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation DeletePerson($id: ID!) {
    deletePerson(id: $id)
  }
`;

export const DELETE_CAR = gql`
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id)
  }
`;

// ======================= QUERIES =============================

export const GET_ALL_PEOPLE_WITH_CARS = gql`
  query {
    getAllPeople {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;

export const GET_PERSON_BY_ID_WITH_CARS = gql`
  query GetPersonByIdWithCars($id: ID!) {
    getPersonById(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;

export const GET_ALL_CARS = gql`
  query {
    getAllCars {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const GET_CAR_BY_ID = gql`
  query GetCarById($id: ID!) {
    getCarById(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

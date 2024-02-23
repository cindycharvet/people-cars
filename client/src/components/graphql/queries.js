import {gql} from "@apollo/client";

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

const people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const cars = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3'
  }
]

const typeDefs = `
type Person {
  id: ID!
  firstName: String!
  lastName: String!
  cars: [Car]!
}

type Car {
  id: ID!
  year: String!
  make: String!
  model: String!
  price: String!
  personId: ID!
}

type Query {
  getAllPeople: [Person]!
  getPersonById(id: ID!): Person
  personWithCars(id: ID!): Person
  getAllCars: [Car]!
}

type Mutation {
  createPerson(firstName: String!, lastName: String!): Person!
  updatePerson(id: ID!, firstName: String, lastName: String): Person
  deletePerson(id: ID!): ID

  createCar(year: String!, make: String!, model: String!, price: String!, personId: ID!): Car!
  updateCar(id: ID!, year: String, make: String, model: String, price: String): Car
  deleteCar(id: ID!): ID
}
`

const resolvers = {
  Query: {
    getAllPeople: () => people,
    getPersonById: (parent, { id }) => people.find(person => person.id === id),
    personWithCars: (parent, { id }) => {
      const person = people.find(person => person.id === id);
      if (!person) return null;

      const personWithCars = { ...person, cars: cars.filter(car => car.personId === id) };
      return personWithCars;
    },
    getAllCars: () => cars,
  },
  Mutation: {
    createPerson: (parent, { firstName, lastName }) => {
      const newPerson = { id: String(people.length + 1), firstName, lastName };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (parent, { id, firstName, lastName }) => {
      const personIndex = people.findIndex(person => person.id === id);
      if (personIndex === -1) return null;

      const updatedPerson = { ...people[personIndex], firstName, lastName };
      people[personIndex] = updatedPerson;
      return updatedPerson;
    },
    deletePerson: (parent, { id }) => {
      const personIndex = people.findIndex(person => person.id === id);
      if (personIndex === -1) return null;

      const deletedPersonId = people[personIndex].id;
      people.splice(personIndex, 1);
      return deletedPersonId;
    },
    createCar: (parent, { year, make, model, price, personId }) => {
      const newCar = { id: String(cars.length + 1), year, make, model, price, personId };
      cars.push(newCar);
      return newCar;
    },
    updateCar: (parent, { id, year, make, model, price }) => {
      const carIndex = cars.findIndex(car => car.id === id);
      if (carIndex === -1) return null;

      const updatedCar = { ...cars[carIndex], year, make, model, price };
      cars[carIndex] = updatedCar;
      return updatedCar;
    },
    deleteCar: (parent, { id }) => {
      const carIndex = cars.findIndex(car => car.id === id);
      if (carIndex === -1) return null;

      const deletedCarId = cars[carIndex].id;
      cars.splice(carIndex, 1);
      return deletedCarId;
    },
  },
};

export {typeDefs, resolvers}

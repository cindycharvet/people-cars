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

let cars = [
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
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: ID!
  }

  type Query {
    getAllPeople: [Person]!
    getPersonById(id: ID!): Person
    getAllCars: [Car]!
    getCarById(id: ID!): Car
    personWithCars(id: ID!): Person
  }

  type Mutation {
    createPerson(firstName: String!, lastName: String!): Person!
    updatePerson(id: ID!, firstName: String, lastName: String): Person
    deletePerson(id: ID!): ID

    createCar(year: Int!, make: String!, model: String!, price: Float!, personId: ID!): Car!
    updateCar(id: ID!, year: Int, make: String, model: String, price: Float, personId: ID): Car
    deleteCar(id: ID!): ID
  }
`

const resolvers = {
  Query: {
    getAllPeople: () => {
      return people.map(person => {
        const personCars = cars.filter(car => car.personId === person.id);
        return { ...person, cars: personCars };
      });
    },    
    getPersonById: (root, { id }) => {
      const person = people.find(person => person.id === id);
      return person ? { ...person, cars: cars.filter(car => car.personId === id) } : null;
    },    
    getAllCars: (root, args) => cars,
    getCarById: (root, { id }) => cars.find(car => car.id === id),
    personWithCars: (root, { id }) => {
      const person = people.find(person => person.id === id);
      if (!person) {
        console.error(`Person with id ${id} not found.`);
        return null;
      }
      const personCars = cars.filter(car => car.personId === id);
      return { ...person, cars: personCars || [] };
    },
  },
  Mutation: {
    createPerson: (root, { firstName, lastName }) => {
      const newPerson = { id: String(people.length + 1), firstName, lastName, cars: [] };
      people.push(newPerson);
      return newPerson;
    },
    updatePerson: (root, { id, firstName, lastName }) => {
      const personIndex = people.findIndex(person => person.id === id);
      if (personIndex === -1) return null;

      const updatedPerson = { ...people[personIndex], firstName, lastName };
      people[personIndex] = updatedPerson;
      return updatedPerson;
    },
    deletePerson: (root, { id }) => {
      const personIndex = people.findIndex(person => person.id === id);
      if (personIndex === -1) return null;

      const deletedPersonId = people[personIndex].id;
      people.splice(personIndex, 1);

      cars = cars.filter(car => car.personId !== id);
      return deletedPersonId;
    },
    createCar: (root, { year, make, model, price, personId }) => {
      const newCar = { id: String(cars.length + 1), year, make, model, price, personId };
      cars.push(newCar);

      const personIndex = people.findIndex(person => person.id === personId);
      if (personIndex !== -1) {
        people[personIndex].cars.push(newCar);
      }
      return newCar;
    },
    updateCar: (root, { id, year, make, model, price, personId }) => {
      const carIndex = cars.findIndex(car => car.id === id);
      if (carIndex === -1) return null;

      const updatedCar = { ...cars[carIndex], year, make, model, price, personId };
      cars[carIndex] = updatedCar;

      if (updatedCar.personId !== personId) {
        const oldPersonIndex = people.findIndex(person => person.id === updatedCar.personId);
        const newPersonIndex = people.findIndex(person => person.id === personId);

        if (oldPersonIndex !== -1 && newPersonIndex !== -1) {
          people[oldPersonIndex].cars = people[oldPersonIndex].cars.filter(car => car.id !== id);
          people[newPersonIndex].cars.push(updatedCar);
        }
      }

      return updatedCar;
    },
    deleteCar: (root, { id }) => {
      const carIndex = cars.findIndex(car => car.id === id);
      if (carIndex === -1) return null;

      const deletedCarId = cars[carIndex].id;
      cars.splice(carIndex, 1);
      return deletedCarId;
    },
  },
};

export { typeDefs, resolvers };


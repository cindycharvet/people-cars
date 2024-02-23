import './App.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import { Divider } from 'antd';
import Title from './components/layout/Title';
import AddPerson  from './components/forms/AddPerson';
import AddCar from './components/forms/AddCar';
import Records from './components/lists/Records';

const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Title />
      <Divider />
      <Divider>Add Person</Divider>
      <AddPerson />
      <Divider>Add Car</Divider>
      <AddCar />
      <Divider>Records</Divider>
      <Records/>
    </div>
    </ApolloProvider>
  );
}

export default App;

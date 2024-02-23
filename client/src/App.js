import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Divider } from 'antd';
import Title from './components/layout/Title';
import AddPerson from './components/forms/AddPerson';
import AddCar from './components/forms/AddCar';
import Records from './components/lists/Records';
import PersonShow from './components/pages/PersonShow';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Title />
          <Divider />
          <AddPerson />
          <AddCar />
          <Divider>Records</Divider>
          <Routes>
            <Route path="/" element={<Records />} />
            <Route path="/people/:id" element={<PersonShow />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;

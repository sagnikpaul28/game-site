import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import './scss/index.scss'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

//Apollo Client Setup
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql"
})

function App() {
  return (
    <ApolloProvider client={client} >
      <div className="App">
        <Navbar />
        <HomePage />
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;

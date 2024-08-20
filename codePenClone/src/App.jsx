import './App.css'
import Router from './Routes/Router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './Store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ScrollDialog from './Components/ScrollDialog';

function App() {

  return (
   <> 
    <Provider store={store}>
    <BrowserRouter>
      <Router/>
    </BrowserRouter>

      <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      theme="dark"
      />

      <ScrollDialog/>
</Provider>
    </>
  )
}

export default App

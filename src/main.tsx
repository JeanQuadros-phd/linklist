import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'


//import App from './App.tsx'   retira também o <App/>, adiciona os imports abaixo e
// insere o componente routerprovider com o router={router} dentro da função a seguir:
// adições:
import { router } from './App'
import { RouterProvider } from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)

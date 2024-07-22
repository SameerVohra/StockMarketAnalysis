import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home.tsx'
import CompanyDashboard from './Components/CompanyDashboard.tsx'

const route = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/:companyname/:exchange/details",
        element: <CompanyDashboard/>
      },
      {
        path: "/",
        element: <Home/>
      }
    ]
  },
 
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={route} />
)

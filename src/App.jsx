import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Mainlayout from'./layout/Mainlayout'
import 'react-datepicker/dist/react-datepicker.css';
import '@radix-ui/themes/styles.css';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
const Privatepage=lazy(()=>import("./privatepage/Privatepage"));
const Home=lazy(()=>import("./pages/pages").then(module=>({default:module.Home})))
const AddPost=lazy(()=>import("./components/add volunteer/Addvolunteer"))
const Registration=lazy(()=>import("./components/registration/Registration"))
const LoginForm=lazy(()=>import('./components/login-form/login-form'))
const AllVolunteerNeed=lazy(()=>import('./components/allvolunteerneedpost/Allneed'));
const VolunteerDetails=lazy(()=>import('./components/volunteerdetails/Volunteerdetails'))
const Myposts=lazy(()=>import('./components/my post/Mypost'))
import UpdatePostModal from './components/my post/updatevolunteer/Updatevolunteer';
import Error from './mytools/error/error'
import { Preloader } from './mytools/loader/loader';
import { Theme } from '@radix-ui/themes';
const routes=createBrowserRouter([
  {
    path:'/',
    element:(
      <Suspense fallback={<Preloader></Preloader>}>
          <Mainlayout></Mainlayout>
      </Suspense>
    ),
    children:[
      {
        index:true,
        element:(
          <Suspense fallback={<Preloader></Preloader>}>
              <Home></Home>
          </Suspense>
        )

      },
      {
        path:'/add-volunteer',
        element:(
          <Suspense fallback={<Preloader></Preloader>}>
            <Privatepage>
               <AddPost></AddPost>
            </Privatepage>
          </Suspense>
        )
      },
      {
        path:'/update',
        element:(
          <Suspense fallback={<Preloader></Preloader>}>
            <Privatepage>
               <UpdatePostModal></UpdatePostModal>
            </Privatepage>
          </Suspense>
        )
      },
      {
        path:'/my-post',
        element:(
          <Suspense fallback={<Preloader></Preloader>}>
            <Privatepage>
               <Myposts></Myposts>
            </Privatepage>
          </Suspense>
        )
      },
      {
        path:'/all-volunteer-needs',
        element:(
          <Suspense fallback={<Preloader></Preloader>}>
               <AllVolunteerNeed></AllVolunteerNeed>
          </Suspense>
        )
      },
      {
        path:'/volunteer-needs/:id',
        element:(
          <Suspense fallback={<Preloader></Preloader>}>
            <Privatepage>
               <VolunteerDetails></VolunteerDetails>
            </Privatepage>
          </Suspense>
        )
      },
      {
        path:'/signup',
        element:(
          <Suspense fallback={<Preloader></Preloader>}>
               <Registration></Registration>
          </Suspense>
        )
      },
      {
        path:'/login',
        element:(
          <Suspense fallback={<Preloader></Preloader>}>
               <LoginForm></LoginForm>
          </Suspense>
        )
      }
    ]
  },
  {
    path:'*',
    element:(<Error></Error>)
  }
])

function App() {

  return (
    <>
      <Toaster position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
            zIndex: 9999, 
          },
        }}
       reverseOrder={false} />
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App

import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import { CreateWorkout, EditWorkout, WorkoutsById } from '../components/Workouts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: 'workout_plans/:workoutId',
        element: <WorkoutsById />
      },
      {
        path: 'workout_plans/create',
        element: <CreateWorkout />
      },
      {
        path: 'workout_plans/:workoutId/edit',
        element: <EditWorkout />
      },
    ],
  },
]);

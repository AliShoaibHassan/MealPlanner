import { useState } from 'react'
import Home from './pages/Home'
import Tasks from './pages/Tasks.jsx'
import { Route, Routes } from 'react-router-dom'
import UserForm from './components/UserForm';


function App() {

  const week = [
    {
      name: "Monday",
      meals: {
        breakfast: "Oatmeal with fruits",
        lunch: "Grilled chicken salad",
        dinner: "Spaghetti Bolognese"
      }
    },
    {
      name: "Tuesday",
      meals: {
        breakfast: "Pancakes with syrup",
        lunch: "Turkey sandwich",
        dinner: "Stir-fried vegetables with rice"
      }
    },
    {
      name: "Wednesday",
      meals: {
        breakfast: "Smoothie bowl",
        lunch: "Chicken wrap",
        dinner: "Beef tacos"
      }
    },
    {
      name: "Thursday",
      meals: {
        breakfast: "Scrambled eggs and toast",
        lunch: "Tomato soup with breadsticks",
        dinner: "Grilled salmon with quinoa"
      }
    },
    {
      name: "Friday",
      meals: {
        breakfast: "French toast",
        lunch: "Veggie burger",
        dinner: "Pizza night"
      }
    },
    {
      name: "Saturday",
      meals: {
        breakfast: "Bagel with cream cheese",
        lunch: "Chicken Caesar salad",
        dinner: "BBQ ribs"
      }
    },
    {
      name: "Sunday",
      meals: {
        breakfast: "Avocado toast",
        lunch: "Pasta Alfredo",
        dinner: "Roast chicken with veggies"
      }
    }
  ];
  
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/details" element={<UserForm />} /> */}
      <Route path="/tasks" element={<Tasks week={week} />} />
    </Routes>
      

    </>
  )
}

export default App

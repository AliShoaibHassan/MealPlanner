import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from 'react-router-dom';
import UserForm from "../components/UserForm";  

function Tasks(props) {
  const [cardVisible, setCardVisible] = useState(false);
  const [weekData, setWeekData] = useState(props.week);
  const [newMeal, setNewMeal] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [mealType, setMealType] = useState("breakfast");



  function handleClick() {
    setCardVisible(!cardVisible);
  }

  function updateMeal() {
    const updatedWeek = weekData.map((day) => {
      if (day.name === selectedDay) {
        return {
          ...day,
          meals: {
            ...day.meals,
            [mealType]: newMeal,
          },
        };
      }
      return day;
    });
  
    setWeekData(updatedWeek);
    setNewMeal("");
    setCardVisible(false);
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 flex items-center justify-center p-6 relative">
    
      {cardVisible && (
        <div className="absolute top-4 bg-white p-4 rounded shadow-md z-10">
            <select
                className="mb-2 p-2 w-full max-w-xs bg-white text-black border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                >
                {weekData.map((day) => (
                    <option key={day.name} value={day.name}>{day.name}</option>
                ))}
            </select>

            <select
                className="mb-2 p-2 w-full max-w-xs bg-white text-black border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
            </select>

            <Input
                type="text"
                placeholder="Add a new meal"
                value={newMeal}
                onChange={(e) => setNewMeal(e.target.value)}
                className="mb-2 w-full max-w-xs text-black border border-black"
            />


            <Button onClick={updateMeal} className="bg-green-500 hover:bg-green-700 text-white w-full">
                Save Meal
            </Button>
        </div>

      )}

      

      <Link to="/" className="font-semibold text-white absolute top-4 text-3xl left-4 md:top-6 md:left-6 z-10">
        <h2 className="hover:text-blue-300 transition duration-300">
            MealPlanner
        </h2>
      </Link>

      <Button
        className="absolute top-4 right-4 bg-blue-700 text-white hover:bg-blue-900 transition duration-300 ease-in-out z-20"
        onClick={handleClick}
      >
        Add Meal
      </Button>

      <Card className="w-full max-w-4xl shadow-xl bg-rose-100 text-black">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Weekly Meal Planner</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center text-xl text-gray-700">Day</TableHead>
                <TableHead className="text-center text-xl text-gray-700">Breakfast</TableHead>
                <TableHead className="text-center text-xl text-gray-700">Lunch</TableHead>
                <TableHead className="text-center text-xl text-gray-700">Dinner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weekData.map((day) => (
                <TableRow key={day.name}>
                  <TableCell className="text-center text-lg font-semibold">{day.name}</TableCell>
                  <TableCell className="text-center text-lg">{day.meals.breakfast}</TableCell>
                  <TableCell className="text-center text-lg">{day.meals.lunch}</TableCell>
                  <TableCell className="text-center text-lg">{day.meals.dinner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Tasks;

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getMealPlans, updateMeal, initializeMealPlans } from "../services/mealService";
import { Loader2 } from "lucide-react";

function Tasks() {
  const [cardVisible, setCardVisible] = useState(false);
  const [weekData, setWeekData] = useState([]);
  const [newMeal, setNewMeal] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [mealType, setMealType] = useState("breakfast");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Initialize default week data if API fails
  const defaultWeek = [
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

  // Fetch meal plans on component mount
  useEffect(() => {
    fetchMealPlans();
  }, []);

  const fetchMealPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching meal plans...");
      const mealPlans = await getMealPlans();
      console.log("Received meal plans:", mealPlans);
      
      // If we received empty data, try to initialize the meal plans
      if (!mealPlans || mealPlans.length === 0) {
        console.log("No meal plans found, initializing...");
        const initializedPlans = await initializeMealPlans();
        
        if (initializedPlans && initializedPlans.length > 0) {
          formatAndSetMealData(initializedPlans);
          return;
        }
      } else {
        formatAndSetMealData(mealPlans);
        return;
      }
      
      // If all API calls fail, use the default data
      console.log("Using default meal plans");
      setWeekData(defaultWeek);
      
    } catch (error) {
      console.error("Error fetching meal plans:", error);
      setError("Failed to load meal plans. Using default data.");
      setWeekData(defaultWeek);
    } finally {
      setLoading(false);
    }
  };
  
  const formatAndSetMealData = (mealPlans) => {
    // Transform the data to match our frontend format
    const formattedData = mealPlans.map(plan => ({
      name: plan.day,
      meals: {
        breakfast: plan.meals.breakfast || "No meal planned",
        lunch: plan.meals.lunch || "No meal planned",
        dinner: plan.meals.dinner || "No meal planned"
      }
    }));
    
    // Define the correct order of days
    const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    // Sort the formatted data according to the day order
    const sortedData = formattedData.sort((a, b) => {
      return dayOrder.indexOf(a.name) - dayOrder.indexOf(b.name);
    });
    
    setWeekData(sortedData);
  };

  function handleClick() {
    setCardVisible(!cardVisible);
  }

  async function updateMealPlan() {
    if (!newMeal.trim()) {
      alert("Please enter a meal name");
      return;
    }
    
    try {
      setUpdating(true);
      
      // Update on the backend
      await updateMeal(selectedDay, mealType, newMeal);
      
      // Update the local state
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
    } catch (error) {
      console.error("Error updating meal:", error);
      alert("Failed to update meal. Please try again.");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
        <span className="ml-2 text-white text-xl">Loading meal plans...</span>
      </div>
    );
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

            <Button onClick={updateMealPlan} disabled={updating} className="bg-green-500 hover:bg-green-700 text-white w-full">
                {updating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : 'Save Meal'}
            </Button>
        </div>
      )}

      <Link to="/" className="font-semibold text-white absolute top-4 text-3xl left-4 md:top-6 md:left-6 z-10">
        <h2 className="hover:text-blue-100 transition duration-300">
            MealPlanner
        </h2>
      </Link>

      <Button
        className="absolute top-4 right-4 bg-blue-700 text-white hover:bg-blue-900 transition duration-300 ease-in-out z-20"
        onClick={handleClick}
      >
        Add Meal
      </Button>

      {error && (
        <div className="absolute top-16 left-0 right-0 mx-auto w-fit bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-30">
          <p>{error}</p>
        </div>
      )}

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

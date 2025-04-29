import React, { useState } from 'react';

// Assuming these components are available from your shadcn setup
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function UserForm({ onSubmitSuccess }) {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [cardVisible, setCardVisible] = useState(false);
  const [resultName, setResultName] = useState('');
  const [resultBmi, setResultBmi] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !height || !weight) {
      alert('Please fill out all fields.');
      setCardVisible(false); // Ensure card is hidden on validation failure
      return;
    }

    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);

    if (
      isNaN(heightValue) ||
      isNaN(weightValue) ||
      heightValue <= 0 ||
      weightValue <= 0
    ) {
      alert('Please enter valid positive numbers for height and weight.');
      setCardVisible(false); // Ensure card is hidden on validation failure
      return;
    }

    const heightInMeters = heightValue / 100;
    const calculatedBmi = weightValue / (heightInMeters * heightInMeters);
    const formattedBmi = calculatedBmi.toFixed(2);

    console.log('Form Submitted:', {
      name,
      height: heightValue,
      weight: weightValue,
      bmi: formattedBmi,
    });

    setResultName(name);
    setResultBmi(formattedBmi);

    if (onSubmitSuccess) {
      onSubmitSuccess({ name, bmi: formattedBmi });
    }

    setCardVisible(true); // Show the result card
  };

  return (
    // Removed 'relative' as absolute positioning is no longer used for the cards themselves
    // Kept flex justify-center items-center to center the currently visible card
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-4 ">
      {cardVisible ? (
        // Result Card: Removed absolute positioning and related classes
        <Card className="w-full max-w-md rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">BMI Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2 pb-6">
            <p className="text-gray-700 dark:text-gray-200">
              Welcome <span className="font-semibold">{resultName}</span>,
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              Your BMI is <span className="text-blue-600 dark:text-blue-400 font-bold">{resultBmi}</span>
            </p>

            {/* Back to form button */}
            <Button onClick={() => setCardVisible(false)} variant="outline" className="mt-4">
              Calculate Again
            </Button>
            <Link to="/tasks" className="block mt-2">
                <Button  variant="outline" className="mt-4">
                Plan Your Meals
                </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        // Form Card: Removed the margin-top hack
        <Card className="w-full max-w-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl">BMI Information</CardTitle>
            <CardDescription>
              Please enter your details to calculate your BMI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* Name Field */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Height Field */}
              <div className="grid gap-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                  step="0.1"
                  min="0"
                />
              </div>

              {/* Weight Field */}
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  step="0.1"
                  min="0"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Proceed
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
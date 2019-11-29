import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Fetch from 'utils/fetch';
import { useAuthContext } from 'auth/AuthProvider';
import { useUpdate } from 'utils/hooks';
import { getDate, getTime } from 'utils';


export const UserContext = React.createContext();
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { userId } = useParams();
  const authProvider = useAuthContext();

  const [user, setUser] = useState(null);
  const [isMe, setIsMe] = useState(false);
  const [meals, setMeals] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [dailyMeals, setDailyMeals] = useState(null);
  const [barDay, setBarDay] = useState(null);
  const [openEditMeal, setOpenEditMeal] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);

  useEffect(() => {
    getUser();
  }, [userId]);

  useEffect(() => {
    if (!user) {
      return;
    }
    getUserMeals();
    getUserAvgNutrition();
  }, [user]);

  useUpdate(() => {
    authProvider.state.auth && isMe && getUser();
  }, [authProvider.state]);

  useUpdate(() => {
    getDailyMeals();
  }, [barDay]);

  async function getUser() {
    const userData = await Fetch.get({ path: `/user/${userId}` });

    if (userData.user.id === authProvider.state.auth.id) {
      setIsMe(true);
    }

    setUser(userData.user);
  }

  async function deleteMeal(meal) {
    await Fetch.delete({path: `/meal/${meal.id}`});
    setDailyMeals(dailyMeals.filter(item => item.id !== meal.id));
    getUserMeals();
    getUserAvgNutrition();
  }

  async function getUserMeals(query = {}) {
    const response = await Fetch.get({ path: `/user/${userId}/meals`, urlParams: query });
    const userMeals = response.data.map(i => ({
      ...i,
      sum: Number(i.sum),
      color: i.sum > user.caloriesPerDay ? '#fc4235' : '#16c763',
    }))
    setMeals(userMeals);
  }

  async function getDailyMeals() {
    const response = await Fetch.get({ path: `/user/${user.id}/meals/${barDay}` });
    setDailyMeals(response);
  }

  async function getUserAvgNutrition() {
    const response = await Fetch.get({ path: `/user/${userId}/meals/nutritionAverage` });
    const map = {
      'avgCarbs': 'Averate used carbs',
      'avgFat': 'Averate used fat',
      'avgProtein': 'Averate used protein',
    }
    const nutritionAvg = Object.keys(response.data[0]).map(key => ({
      id: key,
      label: map[key],
      value: Number(response.data[0][key]),
      color: 'hsl(354, 70%, 50%)',
    }));
    setNutrition(nutritionAvg);
  }

  const handleBarClick = useCallback(date => {
    setBarDay(date);
  });

  const toggleMealModal = useCallback((meal = null) => {
    setOpenEditMeal(!openEditMeal);
    setCurrentMeal(meal);
  }, [openEditMeal])

  const editMeal = useCallback(async (meal) => {
    try {
      await Fetch.put({ path: `/meal/${currentMeal.id}`, body: meal });
      setCurrentMeal(null);
      setOpenEditMeal(false);

      //update user 
      getUserMeals();
      getDailyMeals();
      getUserAvgNutrition();

    } catch (err) {
      // ToDo handle error
    }
  });

  const updateDateRange = useCallback(({ from, to, timeFrom, timeTo }) => {
    const query = {};
    if (from && to) {
      query.from = getDate(from);
      query.to = getDate(to);
    }

    if (timeFrom && timeTo) {
      query.timeStart = getTime(timeFrom);
      query.timeEnd = getTime(timeTo);
    }

    getUserMeals(query);
  });

  return (
    <UserContext.Provider
      value={{
        state: {
          user,
          nutrition,
          dailyMeals,
          meals,
          barDay,
          currentMeal,
          openEditMeal,
        },
        actions: {
          handleBarClick,
          deleteMeal,
          toggleMealModal,
          editMeal,
          updateDateRange,
        }
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

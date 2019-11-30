import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Fetch from 'utils/fetch';
import { useAuthContext } from 'auth/AuthProvider';
import { useUpdate } from 'utils/hooks';
import { getDate, getTime, modifyAvgNutrition, modifyUserMeals } from 'utils';

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
  const [dateRange, setDateRange] = useState({});

  const getUser = useCallback(async () => {
    if (!userId || !authProvider.state.isLogedIn) {
      return;
    }
    const userData = await Fetch.get({ path: `/user/${userId}` });
    if (userData.user.id === authProvider.state.auth.id) {
      setIsMe(true);
    }

    setUser(userData.user);
  }, [authProvider.state.auth.id, userId, authProvider.state.isLogedIn]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const getUserMeals = useCallback(async () => {
    const response = await Fetch.get({
      path: `/user/${userId}/meals`,
      urlParams: dateRange,
    });

    setMeals(modifyUserMeals(response, user.caloriesPerDay));
  }, [user, userId, dateRange]);

  const getUserAvgNutrition = useCallback(async () => {
    const response = await Fetch.get({
      path: `/user/${userId}/meals/nutritionAverage`,
    });

    setNutrition(modifyAvgNutrition(response));
  }, [userId]);

  const getDailyMeals = useCallback(async () => {
    if (!barDay) {
      return;
    }
    const response = await Fetch.get({
      path: `/user/${userId}/meals/${barDay}`,
    });
    setDailyMeals(response);
  }, [userId, barDay, currentMeal]);

  useEffect(() => {
    if (!user) {
      return;
    }
    getUserMeals();
    getUserAvgNutrition();
  }, [user, getUserMeals, getUserAvgNutrition]);

  useUpdate(() => {
    if (authProvider.state.auth.id && isMe) {
      getUser();
    }
  }, [authProvider.state]);

  useUpdate(() => {
    getDailyMeals();
  }, [barDay]);

  async function deleteMeal(id) {
    await Fetch.delete({ path: `/meal/${id}` });
    setDailyMeals(dailyMeals.filter(item => item.id !== id));
    getUserMeals();
    getUserAvgNutrition();
  }

  const handleBarClick = useCallback(date => {
    setBarDay(date);
  }, []);

  const toggleMealModal = useCallback(
    (meal = null) => {
      setOpenEditMeal(!openEditMeal);
      setCurrentMeal(meal);
    },
    [openEditMeal],
  );

  const editMeal = useCallback(
    async meal => {
      try {
        await Fetch.put({ path: `/meal/${currentMeal.id}`, body: meal });
        setCurrentMeal(null);
        setOpenEditMeal(false);

        // update user
        getUserMeals();
        getDailyMeals();
        getUserAvgNutrition();
      } catch (err) {
        // ToDo handle error
      }
    },
    [currentMeal, getUserMeals, getUserAvgNutrition, getDailyMeals],
  );

  const updateDateRange = ({ from, to, timeFrom, timeTo }) => {
    const query = {};
    if (from && to) {
      query.from = getDate(from);
      query.to = getDate(to);
    }

    if (timeFrom && timeTo) {
      query.timeStart = getTime(timeFrom);
      query.timeEnd = getTime(timeTo);
    }

    setDateRange(query);
  };

  const addUserMeal = meal => Fetch.post({ path: '/meal', body: meal });

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
          isMe,
        },
        actions: {
          handleBarClick,
          deleteMeal,
          toggleMealModal,
          editMeal,
          updateDateRange,
          addUserMeal,
          getUserMeals,
          getUserAvgNutrition,
          getDailyMeals,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

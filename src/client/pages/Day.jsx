import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getDay from '@wasp/queries/getDay';
import getActivities from '@wasp/queries/getActivities';
import completeActivity from '@wasp/actions/completeActivity';

export function Day() {
  const { dayId } = useParams();
  const { data: day, isLoading: isDayLoading, error: dayError } = useQuery(getDay, { dayId });
  const { data: activities, isLoading: isActivitiesLoading, error: activitiesError } = useQuery(getActivities, { dayId });
  const completeActivityFn = useAction(completeActivity);

  if (isDayLoading || isActivitiesLoading) return 'Loading...';
  if (dayError || activitiesError) return 'Error: ' + (dayError || activitiesError);

  const handleCompleteActivity = (activityId) => {
    completeActivityFn({ id: activityId });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{day.title}</h1>
      {activities.map((activity) => (
        <div
          key={activity.id}
          className={`flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg ${activity.completed ? 'line-through' : ''}`}
        >
          <div>{activity.description}</div>
          <div>
            {!activity.completed && (
              <button
                onClick={() => handleCompleteActivity(activity.id)}
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
              >
                Complete
              </button>
            )}
          </div>
        </div>
      ))}
      <div>
        <Link to='/' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Go Back</Link>
      </div>
    </div>
  );
}
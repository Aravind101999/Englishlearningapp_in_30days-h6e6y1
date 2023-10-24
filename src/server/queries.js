import HttpError from '@wasp/core/HttpError.js'

export const getDay = async ({ dayId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const day = await context.entities.Day.findUnique({
    where: { id: dayId },
    include: { activities: true }
  });

  if (!day) throw new HttpError(404, `No day with id ${dayId}`);

  return day;
}

export const getActivities = async ({ dayId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const activities = await context.entities.Activity.findMany({
    where: {
      dayId
    }
  });

  return activities;
}
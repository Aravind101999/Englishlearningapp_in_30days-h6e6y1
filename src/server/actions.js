import HttpError from '@wasp/core/HttpError.js'

export const createDay = async ({ userId, title }, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Day.create({
    data: {
      title,
      user: {
        connect: { id: userId }
      }
    }
  });
}

export const createActivity = async (args, context) => {
  const newActivity = await context.entities.Activity.create({
    data: {
      description: args.description,
      resourceLink: args.resourceLink,
      completed: false,
      day: {
        connect: { id: args.dayId }
      }
    }
  });

  return newActivity;
}

export const completeActivity = async (args, context) => {
  const activity = await context.entities.Activity.findUnique({
    where: { id: args.id }
  });

  if (!activity) { throw new HttpError(404, `Activity with id ${args.id} not found.`) };

  const updatedActivity = await context.entities.Activity.update({
    where: { id: args.id },
    data: { completed: true }
  });

  return updatedActivity;
}

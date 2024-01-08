export const formatHourMinute = (minutes: number) => {
  if(!minutes) return "0h";
  
  const result = {
    hour: Math.floor(minutes / 60),
    minute: minutes % 60,
  };

  return result.hour + "h" + result.minute + "m";
};

export const sortByArrayCreatedAt = (data: Array<any>) => {
  data.sort(
    (a: any, b: any) =>
      new Date(a?.CreatedAt).getTime() - new Date(b?.CreatedAt).getTime()
  );

  return data;
};

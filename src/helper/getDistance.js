export const getDistance = (userLat, userLong, schoolLat, schoolLong) => {

    console.log(userLat,userLong,schoolLat,schoolLong);
  const dy = schoolLong - userLong;
  const dx = schoolLat - userLat;

  return Math.sqrt(dx * dx + dy * dx);
};

export const getNameStatus = (id: any) => {
  switch (id) {
    case 1:
      return "تلگرام";
    case 2:
      return "انسنگرام";
    case 3:
      return "واتساپ";
    case 4:
      return "لینکدین";
    case 5:
      return "تویتر";
    default:
      return "تعریف نشدده";
  }
};

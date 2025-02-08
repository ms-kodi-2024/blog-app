const formatDate = (date) => {
  return date.toLocaleDateString("pl-PL").split(".").join("-");
};

export default formatDate;
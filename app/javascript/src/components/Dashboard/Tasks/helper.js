export const getColor = tag => {
  if (tag === "Internal") {
    return "blue";
  }
  if (tag === "Bug") {
    return "red";
  }
  if (tag === "workflow") {
    return "green";
  }
};

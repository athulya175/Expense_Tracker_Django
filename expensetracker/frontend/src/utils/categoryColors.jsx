export const getCategoryColor = (category) => {
  switch (category) {
    case "Food":
      return "#f59e0b";

    case "Travel":
      return "#16a34a";

    case "Shopping":
      return "#b91c1c";

    case "Bills":
      return "#374151";

    case "Entertainment":
      return "#2563eb";

    default:
      return "#9333ea";
  }
};
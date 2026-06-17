import { MdRestaurant } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";

export const getCategoryIcon = (category) => {
  switch (category) {
    case "Food":
      return <MdRestaurant size={25} color="orange" />;

    case "Travel":
      return <FaCar size={25} color="green" />;

    case "Shopping":
      return <FaShoppingBag size={25} color="brown" />;

    case "Bills":
      return <FaReceipt size={25} color="black" />;

    case "Entertainment":
      return <FaFilm size={25} color="blue" />;

    default:
      return <FaWallet size={25} color="purple" />;
  }
};

// C:/restaurant-3d-menu/src/menu.js

import BASE_URL from "./api.js";

const menuItems = [
  {
    id: 1,
    src: "/models/leo.glb",
    title: "Cappuccino",
    price: "$4.50",
    rating: "4.5 (6,986)",
    ingredients: ["Coffee", "Milk", "Micilum Roasted"],
    category: "Bebidas",
  },
  {
    id: 2,
    src: "/models/2.glb",
    title: "Hamburguesa Clásica",
    price: "$9.90",
    rating: "4.8 (3,452)",
    ingredients: ["Carne", "Queso", "Lechuga", "Tomate"],
    category: "Comida Rápida",
  },
  {
    id: 3,
    src: "/models/3.glb",
    title: "Ensalada César",
    price: "$7.50",
    rating: "4.3 (2,156)",
    ingredients: ["Lechuga", "Pollo", "Parmesano", "Aderezo"],
    category: "Ensaladas",
  },
  {
    id: 4,
    src: "/models/3.glb",
    title: "Caldo Precocida",
    price: "$7.50",
    rating: "4.3 (2,156)",
    ingredients: ["Lechuga", "Pollo", "Parmesano", "Aderezo"],
    category: "Comida Rápida",
  },
];

export default menuItems;

import CategoryMenu from "../../components/category-menu/category-menu.component";
import paw1 from "../../assets/images/categories/paw1.png";
import paw2 from "../../assets/images/categories/paw2.png";
import paw3 from "../../assets/images/categories/paw3.png";
import paw4 from "../../assets/images/categories/paw4.png";
import paw5 from "../../assets/images/categories/paw5.png";

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "t-shirts",
      image: paw1,
    },
    {
      id: 2,
      title: "hoodies",
      image: paw2,
    },
    {
      id: 3,
      title: "posters",
      image: paw3,
    },
    {
      id: 4,
      title: "stickers",
      image: paw4,
    },
    {
      id: 5,
      title: "phone cases",
      image: paw5,
    },
  ];

  return <CategoryMenu categories={categories} />;
};

export default Home;

import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //    get category
  const geCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data?.category);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    geCategory();
  }, []);
  return categories;
}

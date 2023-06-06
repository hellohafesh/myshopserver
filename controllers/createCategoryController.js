import categoryModels from "../models/categoryModels";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is Require" });
    }
    const existiongCategory = await categoryModels.findOne({ name });
    if (existiongCategory) {
      return res
        .status(200)
        .send({ success: true, message: "Category Already Exixits" });
    }
    const category = await new categoryModels({
      name,
      slug: slugify(name),
    }).save();
    res
      .status(201)
      .send({ success: true, message: "Category Is Added", category });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error In Category",
    });
  }
};

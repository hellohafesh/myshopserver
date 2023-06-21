import categoryModels from "../models/categoryModels.js";
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

//  Update category

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    // if (!name) {
    //   return res.status(401).send({ message: "Name is Require" });
    // }
    const category = await categoryModels.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Category Is Added and update",
      category,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error In Update Category",
    });
  }
};

// get all category

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModels.find({});

    res.status(201).send({ success: true, message: "Category List", category });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error In get all Category",
    });
  }
};
// single  category

export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModels.find({ slug });

    res
      .status(201)
      .send({ success: true, message: "Single Category Success", category });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error In get single Category",
    });
  }
};

// delete  category

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModels.findByIdAndDelete(id);

    res
      .status(201)
      .send({ success: true, message: "Single Category Delete Success" });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error In delete Category",
    });
  }
};

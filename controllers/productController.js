import productModels from "../models/productModels.js";
import slugify from "slugify";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be 1 mb" });
    }

    const products = new productModels({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Success In product create",
      products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error In product create",
    });
  }
};

//  Update category

// export const updateCategoryController = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const { id } = req.params;
//     // if (!name) {
//     //   return res.status(401).send({ message: "Name is Require" });
//     // }
//     const category = await productModels.findByIdAndUpdate(
//       id,
//       {
//         name,
//         slug: slugify(name),
//       },
//       { new: true }
//     );

//     res
//       .status(201)
//       .send({ success: true, message: "Category Is Added", category });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({
//       success: false,
//       e,
//       message: "Error In Update Category",
//     });
//   }
// };

// get all category

// export const categoryController = async (req, res) => {
//   try {
//     const category = await productModels.find({});

//     res.status(201).send({ success: true, message: "Category List", category });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({
//       success: false,
//       e,
//       message: "Error In get all Category",
//     });
//   }
// };
// single  category

// export const singleCategoryController = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const category = await productModels.find({ slug });

//     res
//       .status(201)
//       .send({ success: true, message: "Single Category Success", category });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({
//       success: false,
//       e,
//       message: "Error In get single Category",
//     });
//   }
// };

// delete  category

// export const deleteCategoryController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const category = await productModels.findByIdAndDelete(id);

//     res
//       .status(201)
//       .send({ success: true, message: "Single Category Delete Success" });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({
//       success: false,
//       e,
//       message: "Error In delete Category",
//     });
//   }
// };

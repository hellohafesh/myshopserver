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
export const getProductController = async (req, res) => {
  try {
    const products = await productModels
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Product",
      totalCount: products.length,
      products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error In get Product",
    });
  }
};

//  get single product

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModels
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product",
      product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error In get Single Product",
    });
  }
};

// get photo
export const getProductPhotoController = async (req, res) => {
  try {
    const product = await productModels
      .findById(req.params.pid)
      .select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    res.status(200).send({
      success: true,
      message: "Single Product",
      product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error In get photo of Product",
    });
  }
};

// delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModels.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: " Product Deleted Success",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error In delete of Product",
    });
  }
};

// update product
export const updateProductController = async (req, res) => {
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

    const products = await productModels.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Success In product update",
      products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error In product update",
    });
  }
};

import categoryModal from "../model/categoryModal.js";
import slugify from "slugify";

//create new cateory
export let createCategoryController = async (req, res) => {
    try {
        let { name } = req.body;
        if (!name) {
            return res.status(200).send({ msg: 'field is required' });
        }
        let categoryFound = await categoryModal.findOne({ name });
        if (categoryFound) {
            return res.status(200).send({ msg: "Category Already exist", success: false })
        }
        let category = await new categoryModal({ name, slug: slugify(name) }).save();
        res.status(201).send({ msg: "Category created successfully", category, success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'something error' })
    }
}

//get all categories
export let allCategoryController = async (req, res) => {
    try {
        let category = await categoryModal.find({}).sort({ createdAt: -1 });
        res.status(200).send({ msg: "all categories", category, total: category.length, success: true })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'something error' })
    }
}

//delete category
export let deleteCategoryController = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await categoryModal.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "category deleted  successfully", success: true, result })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'something error' })
    }
}

//change category
export let updateCategoryController = async (req, res) => {
    try {
        let { id } = req.params;
        let { name } = req.body;
        if (!name) {
            res.status(200).send({ success: false, msg: "Field is required*" })
        }
        let category = await categoryModal.findByIdAndUpdate({ _id: id }, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({ msg: "Category Update Successful", category, success: true })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'something error' })
    }
}

//get single category
export let singleCategoryController = async (req, res) => {
    try {
        let { slug } = req.params;
        let category = await categoryModal.findOne({ slug })
        res.status(200).send({ msg: "Single category", category, success: true })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'something error' })
    }
}

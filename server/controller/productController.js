import { deleteImageOnCloudinary, uploadImageOnCloudinary } from "../helper/cloudinaryHelper.js";
import productModal from "../model/productModal.js";
import categoryModal from "../model/categoryModal.js";
import gateway from "../config/payment.js";
import orderModal from "../model/orderModal.js";

//create new product
export let createProductController = async (req, res) => {
    try {
        let { name, price, quantity, description, category, brand, shipping, color } = req.body;
        let images = req.files;
        if (!name || !price || !quantity || !description || !category || !brand || !shipping || !color) {
            return res.status(200).send({ msg: "All fields are required *" })
        }
        if (images.length == 0) {
            return res.status(200).send({ msg: "At least Upload one image" })
        }
        let image = await uploadImageOnCloudinary(req.files)
        let product = await new productModal({ name, price, quantity, description, category, brand, shipping, images: image, color }).save()
        console.log(product);
        res.status(201).send({ msg: "Product Created Successful", success: true, product })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Somthing wrong while creating product", success: false, err })
    }
}

//get all products
export let getAllProductsController = async (req, res) => {
    try {
        let result = await productModal.find({}).populate("category").sort({ createdAt: -1 });
        res.status(200).send({ msg: "all products", result, success: true, total: result.length })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: "something wrong while fetching all products", success: false, err })
    }
}

//get single product
export let getSingleProductController = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await productModal.findOne({ _id: id }).populate("category")
        res.status(200).send({ msg: 'single product', result, success: true })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: "something wrong while fetching all products", success: false, err })
    }
}

//delete product
export let deleteProductController = async (req, res) => {
    try {
        let { id } = req.params;
        let found = await productModal.findOne({ _id: id });
        await deleteImageOnCloudinary(found.images)
        let deleteProduct = await productModal.findByIdAndDelete({ _id: id });
        res.status(200).send({
            message: "Product Deleted Successfully",
            success: true,
            deleteProduct,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: "something wrong while fetching all products", success: false, err })
    }
}

//change product
export let updateProductHandler = async (req, res) => {
    try {
        let { id } = req.params;
        let { name, price, quantity, description, category, brand, shipping, color } = req.body;
        if (!name || !price || !quantity || !description || !category || !brand || !shipping || !color) {
            return res.status(200).send({ msg: "All fields are required *" })
        }
        else {
            let findData = await productModal.findOne({ _id: id });
            let image
            if (req.files.length > 0) {
                await deleteImageOnCloudinary(findData.images);
                image = await uploadImageOnCloudinary(req.files);
            }
            let product = await productModal.findByIdAndUpdate(
                { _id: id },
                { ...req.body, images: image ? image : findData.images },
                { new: true }
            );
            res.status(200).send({
                msg: "Product Update Succuessful",
                product,
                success: true,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'something wrong while filtering', success: false, err })
    }
}

//filter products according to price, color, brand, category
export let filterProductController = async (req, res) => {
    try {
        let { checked, price, colorchecked, brand } = req.body;
        let args = {}
        if (checked?.length > 0) {
            args.category = checked
        }
        if (colorchecked?.length > 0) {
            args.color = { $in: colorchecked };
        }
        if (price) {
            args.price = { $gte: price[0], $lte: price[1] }
        }
        if (brand?.length > 0) {
            args.brand = brand
        }
        let products = await productModal.find(args);
        res.status(200).send({ msg: "filtered products", products, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'something wrong while filtering', success: false, err })
    }
}

//total products length
export let totalProductController = async (req, res) => {
    try {
        let total = await productModal.find({}).estimatedDocumentCount();
        res.status(200).send({ msg: 'total products count', total, success: true })
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'something wrong while getting all products', success: false, err })
    }
}

//skip and limit products in UI
export let productListController = async (req, res) => {
    try {
        let { count } = req.params;
        let perPageCount = 8;
        let page = count ? count : 1;
        let products = await productModal.find({}).skip((page - 1) * perPageCount).limit(perPageCount);
        res.status(200).send({ msg: "limited products from load more", products, success: true })
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'something wrong while load more', success: false, err })
    }
}

//this is for similar product
export let similarProductController = async (req, res) => {
    try {
        let { p_id, c_id } = req.params
        let products = await productModal.find({
            category: c_id,
            _id: { $ne: p_id }
        }).limit(3)
        res.status(200).send({ message: "Similar Product", products, success: true })
    }

    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Somthing wrong", err, success: false })
    }
}

//search filter 
export let searchProductController = async (req, res) => {
    try {
        let { keyword } = req.params;
        let products = await productModal.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { brand: { $regex: keyword, $options: 'i' } }
            ]
        })
        res.status(200).send({ message: "Result Found", products, success: true, total: products.count })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Somthing wrong while searching", error, success: false })
    }
}

//single category products fetch
export let productCategoryController = async (req, res) => {
    try {
        let { slug } = req.params;
        let category = await categoryModal.find({ slug: slug });
        let products = await productModal.find({ category: category });
        res.status(200).send({ message: "Result Found", success: true, products, total: products.length })
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Something wrong while fetching categories' })
    }
}

//payment token generation
export let braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(response);
            }
        });
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .send({ message: "Somthing wrong while payment", err, success: false });
    }
};

//payment after add to cart
export let braintreePaymentController = async (req, res) => {
    try {
        let { nonce, cart } = req.body;
        let total_ammount = cart.reduce((acc, item) => {
            return acc + item.price;
        }, 0);
        for (let i = 0; i < cart.length; i++) {
            let x = cart[i];
            await productModal.findByIdAndUpdate(
                x._id,
                { $inc: { quantity: -x.count } }, // decrement the quantity by x.count
                { new: true } // return the updated document
            );
        }
        gateway.transaction.sale(
            {
                amount: total_ammount,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new orderModal({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (err) {
        res
            .status(500)
            .send({ success: false, message: "somthing wrong while payment", err });
    }
};

//sorting of products
export let productSortController = async (req, res) => {
    try {
        let { value } = req.params;
        if (value === 'all') {
            let products = await productModal.find();
            res.status(200).send({ message: 'All Products', products, success: true })
        }
        if (value === 'h-l') {
            let products = await productModal.find().sort({ price: -1 })
            res.status(200).send({ message: 'Products sorted high to low', products, success: true })
        }
        if (value === 'l-h') {
            let products = await productModal.find().sort({ price: 1 })
            res.status(200).send({ message: 'Products sorted low to high', products, success: true })   
        }
        if (value === 'a-z') {
            let products = await productModal.find().sort({ name: 1 })
            res.status(200).send({ message: 'Products sorted low to high', products, success: true })
        }
        if (value === 'z-a') {
            let products = await productModal.find().sort({ name: -1 })
            res.status(200).send({ message: 'Products sorted low to high', products, success: true })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something wrong while sorting", error, success: false })
    }
}
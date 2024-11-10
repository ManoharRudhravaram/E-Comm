import orderModal from "../model/orderModal.js";

// user orders
export let userOrderController = async (req, res) => {
    try {
        let orders = await orderModal.find({ buyer: req.user._id }).populate('products').populate('buyer', "name").sort({ createdAt: -1 })
        res.status(200).send({ msg: "All Orders", orders, success: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: "somthing wrong while printing order", err, success: false })
    }
};

//all users orders
export let allOrderController=async(req,res)=>{
    try {
        let orders = await orderModal.find({}).populate('products').populate('buyer', "name").sort({ createdAt: -1 })
        res.status(200).send({ msg: "All Orders", orders, success: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: "somthing wrong while printing order", err, success: false })
    }
}

//update order status
export let updateOrderStatusController=async(req,res)=>{
    try {
        let {id}=req.params;
        let {status}=req.body;
        let updatedData=await orderModal.findByIdAndUpdate({_id:id},{status},{new:true});
        res.status(200).send({ msg: "Order updated Successfully", success: true, updatedData });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: "somthing wrong while printing order", err, success: false })
    }
}
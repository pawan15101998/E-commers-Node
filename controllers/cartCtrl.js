const { Brand } = require("../Model/brand")
const { Cart } = require("../Model/cart")

exports.fetchCartByUser = async(req, res) =>{
    const {id} = req.user;
    try {
        const cartItems  = await Cart.find({user:id}).populate('product')
        res.status(200).json(cartItems)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.addToCart = async(req, res) =>{
    const {id} = req.user;
    try {
        const cart  = new Cart({...req.body, user: id})
        const doc = await cart.save()
        const result = await doc.populate('product')
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.deleteFromCart = async(req, res) =>{
    const {id} = req.params;
    try {
        const doc = await Cart.findByIdAndDelete(id)
        res.status(200).json({sucess: "Remove From Cart"})
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.updateCart = async (req, res)=>{
    const {id} = req.params;
try {
 const cart  = await Cart.findByIdAndUpdate(id, req.body, {new: true})
 const result = await cart.populate('product')
    res.status(201).json(result)
} catch (error) {
  console.log(error)
    res.status(400).json(error)
      }
    }
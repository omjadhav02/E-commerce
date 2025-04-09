// import paymentLink from 'razorpay/dist/types/paymentLink';
// import razorpay from '../lib/razorpay.js'
// import Coupon from '../models/coupon.model.js'

// export const createCheckoutSession = async(req,res)=>{
//     try {
//         const {products,couponCode} = req.body;

//         if(!Array.isArray(products) || products.length === 0){
//             return res.status(400).json({message:"Ivalid or empty products array"})
//         }

//         let totalAmount = 0;

//         const lineItems = products.map((product)=>{
//             const amount = Math.round(product.price * 100)
//             totalAmount += amount * product.quantity;

//             return {
//                 price_data:{
//                     currency:"inr",
//                     product_data:{
//                         name:product.name,
//                         images:[product.image],
//                     },
//                     unit_amount:amount
//                 }
//             }
//         });

//         let coupon = null;
//         if(couponCode){
//             coupon = await Coupon.findOne({code:couponCode,userId:req.user._id,isAcitve:true})
//             if(coupon){
//                 totalAmount -= Math.round(totalAmount * coupon.discountPercentage/100)
//             }
//         }         
//         const session = await razorpay.orders.create({
//             method:"card",
//             amount:totalAmount,
//             currency:"INR",
//             receipt:`receipt_${Date.now()}`,
//             payment_capture:1,
//             notes:{
//                 orderDetails: lineItems,

//             },
            
            
//         })
//     } catch (error) {
        
//     }
// }
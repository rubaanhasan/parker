const Razorpay = require('razorpay'); 
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

const renderProductPage = async(req,res)=>{

    try {
        
        res.render('product');

    } catch (error) {
        console.log(error.message);
    }

}

const createOrder = async(req,res)=>{
    try {
        const amount = 1000*100;
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,amount:amount,
                        
                        key_id:RAZORPAY_ID_KEY,
                        product_name:req.body.name,
                        description:req.body.description,
                        contact:"8567345632",
                        name: "Rubaan Hasan",
                        email: "rubaanhasan123@gmail.com"
                    });
                }
                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
};
// export const paymentVerification = async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;
  
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
  
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
//       .update(body.toString())
//       .digest("hex");
  
//     const isAuthentic = expectedSignature === razorpay_signature;
// }  


module.exports = {
    renderProductPage,
    createOrder
}
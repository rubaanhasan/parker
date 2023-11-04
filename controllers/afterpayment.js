const Razorpay = require('razorpay'); 
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

const renderexitPage = async(req,res)=>{

    try {
        
        res.render('exitpayment');

    } catch (error) {
        console.log(error.message);
    }

   
}
function performBackendOperation() {
    return new Promise((resolve, reject) => {
      
      {setTimeout(() => {
        console.log('Backend operation completed.');
        resolve();
      }, 2);}
    });
  }
  
const createexitOrder = async(req,res)=>{
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
                        //product_name:req.body.name,
                       // description:req.body.description,
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
module.exports = {
    renderexitPage,
    createexitOrder,
    performBackendOperation
}
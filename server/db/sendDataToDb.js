const productModel = require('../models/product.model');
const axios = require('axios')
async function sendDataToDb() {
    try {
        // const resdata = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        //  const dataTobeSend = await resdata.json();

        const { data: dataTobeSend } = await axios.get(process.env.DATABASEFROMS3);
        // let productArray = new Array()

        // for (const item of dataTobeSend) {
        //     console.log(item);
        //     // productArray.push(item)
        //     const product = {
        //         _id: item.id,
        //         title: item.title,
        //         price: item.price,
        //         description: item.description,
        //         category: item.category,
        //         image: item.image,
        //         sold: item.sold,
        //         dateOfSale: item.dateOfSale
        //     };

        //     const productExists = await productModel.exists({ _id: product._id });
        //     if (productExists) {
        //         continue;
        //     }
        //     const newProduct = await productModel.create(product);
        //     console.log(newProduct);
        // }

        await productModel.insertMany(dataTobeSend);

        console.log("data fetched and saved")

    } catch (err) {
        console.log(err);
    }
}



// sendDataToDb()
// (async () => {
//     await sendDataToDb()
// })()



module.exports = sendDataToDb;

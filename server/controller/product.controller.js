const productModel = require('./../models/product.model');


async function getData(req, res) {
    try {
        const { searchText = '', page = 1, perPage = 10 } = req.query;
        const currentPage = parseInt(page, 10) || 1;
        const itemsPerPage = parseInt(perPage, 10) || 10;


        const query = createSearchQuery(searchText);


        const totalCount = await productModel.countDocuments(query);


        const transactions = await productModel
            .find(query)
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .exec();


        const totalPages = Math.ceil(totalCount / itemsPerPage);
        const response = {
            totalCount,
            currentPage,
            perPage: itemsPerPage,
            totalPages,
            data: transactions,
        };

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

function createSearchQuery(searchText) {
    const query = {};

    if (searchText !== '') {
        const searchLower = searchText.toLowerCase().trim();


        query.$or = [
            { title: { $regex: searchLower, $options: 'i' } },
            { description: { $regex: searchLower, $options: 'i' } },
        ];


        const numericSearch = parseFloat(searchText);
        if (!isNaN(numericSearch)) {
            query.$or.push({
                price: {
                    $gte: numericSearch * 0.9,
                    $lte: numericSearch * 1.1,
                },
            });
        }
    }

    return query;
}



async function getStats(req, res) {
    try {
        const { month, year } = req.query;
        if (!month || !year) {
            return res.status(400).json({ message: 'Month and year are required.' });
        }
        const startDate = new Date(`${year}-${month}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);


        const [totalSaleAmountResult] = await productModel.aggregate([
            {
                $match: {
                    dateOfSale: { $gte: startDate, $lt: endDate },
                    sold: true
                }
            },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: '$price' }
                }
            }
        ]);

        // console.log(totalSaleAmountResult);
        const totalSaleAmount = totalSaleAmountResult?.totalSaleAmount || 0;
        const totalSoldItems = await productModel.countDocuments({
            dateOfSale: { $gte: startDate, $lt: endDate },
            sold: true
        });
        const totalNotSoldItems = await productModel.countDocuments({
            dateOfSale: { $gte: startDate, $lt: endDate },
            sold: false
        });
        const response = {
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getPriceRangeStats(req, res) {
    try {
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ message: 'Month and year are required.' });
        }
        const startDate = new Date(year, month - 1, 1);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);


        const priceRanges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity }
        ];


        const priceRangeCounts = priceRanges.map(range => ({
            range: `${range.min} - ${range.max === Infinity ? 'above 900' : range.max}`,
            count: 0
        }));


        const result = await productModel.aggregate([
            {
                $match: {
                    dateOfSale: { $gte: startDate, $lt: endDate },
                    sold: true
                }
            },
            {
                $project: {
                    price: 1
                }
            },
            {
                $group: {
                    _id: null,
                    products: { $push: '$price' }
                }
            }
        ]);

        const products = result[0]?.products || [];


        products.forEach(price => {
            priceRanges.forEach((range, index) => {
                if (price >= range.min && price <= range.max) {
                    priceRangeCounts[index].count += 1;
                }
            });
        });


        res.status(200).json({ priceRangeCounts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function getUniqueCategories(req, res) {
    try {
        const categories = await productModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    category: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        console.log(categories);
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    getData,
    getStats,
    getPriceRangeStats,
    getUniqueCategories
};

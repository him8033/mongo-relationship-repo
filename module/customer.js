const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(() => {
        console.log("Mongoose Connected");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
    item: String,
    price: Number
})

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
})

customerSchema.post("findOneAndDelete",async (customer) => {
    if(customer.orders.length) {
        let res = await Order.deleteMany({_id: {$in: customer.orders}});
        console.log(res);
    }
})

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addOrders = async () => {
    let res = await Order.insertMany([
        { item: "Biscuit", price: 5 },
        { item: "Chips", price: 10 },
        { item: "Chocolate", price: 20 },
    ])
    console.log(res);
}

const addCustomers = async () => {
    let cust1 = new Customer({
        name: "Anuj Kumar",
    })

    let order1 = await Order.findOne({ item: "Chips" });
    let order2 = await Order.findOne({ item: "Chocolate" });

    cust1.orders.push(order1);
    cust1.orders.push(order2);

    let result = await cust1.save();
    console.log(result);
}

const findCustomers = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log(result);
}

// addOrders();
// addCustomers();
// findCustomers();

const addCust = async () => {
    let newCust = new Customer({
        name: "arvind"
    })

    let newOrder = new Order({
        item: "Burger",
        price: 299
    })

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("New Customer Added");
}

const delCust = async () => {
    let data = await Customer.findByIdAndDelete('675304ccf1739bd5f448a53e');
    console.log(data);
}

// addCust();
delCust();
const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(() => {
        console.log("Mongodb Connected.");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
    username: String,
    addresses: [{
        _id: false,
        location: String,
        country: String
    }]
})

const User = mongoose.model("User", userSchema);

const addUser = async () => {
    let user1 = new User({
        username: "amit",
        addresses: [{
            location: "lalganj",
            country: "India"
        }]
    })
    user1.addresses.push({ location: "Raebareli", country: "India" });
    let result = await user1.save();
    console.log(result);
}

addUser();
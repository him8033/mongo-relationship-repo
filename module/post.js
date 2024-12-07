const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
    .then(() =>{
        console.log("mongoose Connected");
    })
    .catch((err) =>{
        console.log(err);
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
    username: String,
    email: String
})

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const User = mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postSchema);

const appData = async () => {
    let user1 = new User({
        username: "Prashant Singh",
        email: "prashant@gmail.com"
    })

    let post1 = new Post({
        content: "Hello World",
        likes: 27,
        user: user1
    })

    // await user1.save();              //  user creation for first time only
    // await post1.save();              //  first post creation

    let post2 = new Post({
        content: "Bye Bye",
        likes: 9
    })

    let user = await User.findOne({username: "Prashant Singh"});            //  find the existing user
    post2.user = user;

    await post2.save();                                                     // second post creation
};

// appData();

const getData = async() =>{
    let result = await Post.find({}).populate("user","username");           // if you want only few data then you type their object after declaring ref
    console.log(result);
}

getData();
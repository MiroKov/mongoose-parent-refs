const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/edx-course-db');

const Post = mongoose.model('Post', {
    name: String,
    url: String,
    text: String
});

const Comment = mongoose.model('Comment', {
    text: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

post = new Post({
    name: "Post number 1",
    text: "Hey, this is a cool post!",
    url: "www.google.com"
});

post.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Post is saved: ', post.toJSON());
    }
    let i = 0;
    let ca = [{text: 'Cruel…..var { house, mouse} = No type optimization at all'},
      {text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
      {text: '(p1,p2)=>{ … } ,i understand this ,thank you !'} 
    ].forEach((comment, index, list) => {
      comment.post = post._id;
      const c = new Comment(comment);
      c.save((error, result)=>{
        if (error) return console.error(error);
        i++;
        if (i==list.length) {
         queryCommentWithPost();
        }
      })
    })
  });

  const queryCommentWithPost = () => {
    // Populate
    Comment
    .findOne({ text: /Cruel/i })
    .populate('post')
    .exec(function (err, comment) {
      if (err) return console.error(err)
      console.log(`The comment is ${comment}`);
      mongoose.disconnect();
    })
 }
 

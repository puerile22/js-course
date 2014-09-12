var posts = [
  {
    status: "This is a status",
    likes: 5,
    likedByMe: false,
    id: 0,
    comments: [{
      comment: "hello worldoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
      id: 0
    }]
  },
  {
    status: "This is another statusssssss afajaojfaoijeoiajfiojaisdjgoaijsgoajsgdaojgaodjgaojdgaoigjdadgoji",
    likes: 8,
    likedByMe: true,
    id: 1,
    comments: []
  }
];
//var oldPosts= posts;
var onLoad = function() {
  for (var i=posts.length-1;i>=0;i--) {
    if (shortText) {
      displayPost(short(posts[i]));
    } else {
      displayPost(posts[i]);
    }
    for (var j=0;j<posts[i].comments.length;j++) {
      if (shortText) {
        displayComment(posts[i].id,shortComment(posts[i].comments[j]));
      } else {
        displayComment(posts[i].id,posts[i].comments[j]);
      }
    };
  };
};

var createPost = function(post) {
  posts.push({
    status: post,
    likes: 0,
    likedByMe: false,
    id: posts.length,
    comments: []
  })
  clearPosts();
  onLoad();
  //oldPosts = posts;
  //displayPost(posts[posts.length-1]);
};

var likePost = function(postId) {
  clearPosts();
  for (var i=0;i<posts.length;i++) {
    if (postId===posts[i].id) {
      if (posts[i].likedByMe===true) {
        posts[i].likes--;
        posts[i].likedByMe=false;
        if (shortText) {
          shortText = false;
        } else {
          shortText = true; 
        }
        toggleShortText();
        //displayPost(posts[i]);
        break;
      } else {
        posts[i].likes++;
        posts[i].likedByMe=true;
        if (shortText) {
          shortText = false;
        } else {
          shortText = true; 
        }
        toggleShortText();
        //displayPost(posts[i]);
        break;
      }
    }
  }
  //oldPosts = posts;
};

var addComment = function(postId, comment) {
  for (var i=0;i<posts.length;i++) {
    if (postId===posts[i].id) {
      posts[i].comments.push({
        comment:comment,
        id: posts[i].comments.length
      })
      if (shortText) {
        displayComment(postId,shortComment(posts[i].comments[posts[i].comments.length-1]));
      } else {
        displayComment(postId,posts[i].comments[posts[i].comments.length-1]);    
      }
      //toggleShortText();
      break;
    }
  }
  //oldPosts = posts;
};
var short = function(post) {
  shortPost = {
    status: post.status,
    likes: post.likes,
    likedByMe: post.likedByMe,
    id: post.id,
    comments: post.comments
  }
  if (shortPost.status.length>50) {
    shortPost.status = shortPost.status.substr(0,46)+"...";
  }
  return shortPost;
}
var shortComment = function (oldComment) {
  sComment={
    comment:oldComment.comment,
    id:oldComment.id
  }
  if (sComment.comment.length>50) {
    sComment.comment=sComment.comment.substr(0,46)+"...";
  }
  return sComment;
}
var shortText = false;
var toggleShortText = function() {
  clearPosts();
  if (shortText) {
    shortText = false;
  } else {
    shortText = true; 
  }
  if (shortText===true) {
    for (var i=posts.length-1;i>=0;i--) {
      if (posts[i].status.length>50) {
        displayPost(short(posts[i]));
          //displayPost(posts[i]);
      } else {
          displayPost(posts[i]);
        }
     //else {
       // displayPost(oldPosts[i]);
      //}
      for (var j=0;j<posts[i].comments.length;j++) {
        if (posts[i].comments[j].comment.length>50) {
          displayComment(posts[i].id,shortComment(posts[i].comments[j]));
          //displayComment(posts[i].id,posts[i].comments[j]);
        } else {
          displayComment(posts[i].id,posts[i].comments[j]);
        }
      } //else {
        //displayComment(posts[i].id,oldPosts[i].comments[j]);
      //}
    }
  }
  //console.log(posts[1].status);
   else {
    onLoad();
  }
  //onLoad();
  //posts = oldPosts;
};

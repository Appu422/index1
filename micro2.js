document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    document.getElementById('user-username').innerText = username;
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('user-dashboard').style.display = 'block';
});

// Load existing posts from localStorage
const loadPosts = () => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => {
        createPost(post.content, post.likes, post.comments);
    });
};

// Create a post
const createPost = (content, likes = 0, comments = []) => {
    const postList = document.getElementById('post-list');
    const newPost = document.createElement('li');

    // Create the post content section
    newPost.innerHTML = `
        <p>${content}</p>
        <button class="share-btn">Share</button>
        <button class="like-btn">Like <span class="like-count">${likes}</span></button>
        <button class="comment-btn">Comment</button>
        <div class="comments" style="display: none;">
            <input type="text" class="comment-input" placeholder="Add a comment...">
            <button class="add-comment-btn">Add</button>
            <ul class="comment-list">${comments.map(comment => `<li>${comment}</li>`).join('')}</ul>
        </div>
    `;

    postList.appendChild(newPost);
    newPost.querySelector('.like-btn').addEventListener('click', function() {
        likes++;
        newPost.querySelector('.like-count').textContent = likes;
        savePosts(); // Save after like
    });

    newPost.querySelector('.share-btn').addEventListener('click', function() {
        alert('Post shared!');
    });

    newPost.querySelector('.comment-btn').addEventListener('click', function() {
        const commentsDiv = newPost.querySelector('.comments');
        commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';
    });

    newPost.querySelector('.add-comment-btn').addEventListener('click', function() {
        const commentInput = newPost.querySelector('.comment-input');
        const commentText = commentInput.value;
        if (commentText) {
            const commentList = newPost.querySelector('.comment-list');
            const newComment = document.createElement('li');
            newComment.textContent = commentText;
            commentList.appendChild(newComment);
            commentInput.value = ''; // Clear input
            comments.push(commentText); // Update comments array
            savePosts(); // Save after adding comment
        }
    });
};

// Save posts to localStorage
const savePosts = () => {
    const posts = Array.from(document.getElementById('post-list').children).map(post => ({
        content: post.querySelector('p').textContent,
        likes: parseInt(post.querySelector('.like-count').textContent),
        comments: Array.from(post.querySelector('.comment-list').children).map(comment => comment.textContent)
    }));
    localStorage.setItem('posts', JSON.stringify(posts));
};

// Add new post
document.getElementById('post-btn').addEventListener('click', function() {
    const postContent = document.getElementById('post-content').value;
    if (postContent) {
        createPost(postContent); // Create post without likes and comments
        document.getElementById('post-content').value = ''; // Clear textarea
        savePosts(); // Save after adding new post
    }
});

// Load posts on page load
loadPosts();

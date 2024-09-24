document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    document.getElementById('user-username').innerText = username;
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('user-dashboard').style.display = 'block';
});

document.getElementById('post-btn').addEventListener('click', function() {
    const postContent = document.getElementById('post-content').value;
    if (postContent) {
        const postList = document.getElementById('post-list');
        const newPost = document.createElement('li');
        
        // Create the post content section
        newPost.innerHTML = `
            <p>${postContent}</p>
            <button class="share-btn">Share</button>
            <button class="like-btn">Like</button>
            <button class="emoji-btn">😊</button>
            <button class="comment-btn">Comment</button>
            <div class="comments" style="display: none;">
                <input type="text" class="comment-input" placeholder="Add a comment...">
                <button class="add-comment-btn">Add</button>
                <ul class="comment-list"></ul>
            </div>
        `;
        
        postList.appendChild(newPost);
        document.getElementById('post-content').value = ''; // Clear textarea

        // Event listeners for new buttons
        newPost.querySelector('.share-btn').addEventListener('click', function() {
            alert('Post shared!');
        });
        newPost.queryselector<'.like-btn').addEventListener<'click',function(){
            const like =prompt("enter like:");
});
        newPost.querySelector('.emoji-btn').addEventListener('click', function() {
            const emoji = prompt("Enter emoji:");
            newPost.querySelector('p').innerHTML += ` ${emoji}`;
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
            }
        });
    }
});

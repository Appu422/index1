// Load posts from local storage
function loadPosts() {
  postList.innerHTML = '';
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.forEach((post, index) => {
    const postItem = document.createElement('li');
    postItem.innerHTML = `
      <p><strong>${post.username}</strong>: ${post.content}</p>
      <button class="like-btn" data-index="${index}">Like</button>
      <button class="share-btn" data-index="${index}">Share</button>
      <button class="emoji-btn" data-index="${index}">😊</button>
      <span class="like-count" data-index="${index}">Likes: 0</span>
    `;
    postList.appendChild(postItem);
  });

  // Add event listeners for like, share, and emoji buttons
  document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      likePost(index);
    });
  });

  document.querySelectorAll('.share-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      sharePost(index);
    });
  });

  document.querySelectorAll('.emoji-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      addEmoji(index);
    });
  });
}

let likeCounts = [];

// Like a post
function likePost(index) {
  likeCounts[index] = (likeCounts[index] || 0) + 1;
  const likeCountSpan = document.querySelector(`.like-count[data-index="${index}"]`);
  likeCountSpan.textContent = `Likes: ${likeCounts[index]}`;
}

// Share a post (you can customize this behavior)
function sharePost(index) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const postContent = posts[index].content;
  console.log(`Shared post: ${postContent}`);
  alert(`Shared: ${postContent}`);
}

// Add emoji to a post (you can customize this behavior)
function addEmoji(index) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts[index].content += ' 😊';
  localStorage.setItem('posts', JSON.stringify(posts));
  loadPosts();
}

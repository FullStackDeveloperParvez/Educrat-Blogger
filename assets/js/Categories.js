function showPost(postHeading) {
    const postSection = document.getElementById('post-section');
    postSection.style.display = 'block';

    fetch('../uploads/json/postsData.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        for(let postData of data) {
            console.log(postData);
            if(postData.heading === postHeading) {
                const post = document.createElement('div');

                const postHeading = document.createElement('h1');
                postHeading.id = 'post-heading';
                postHeading.innerText = postData.heading;
                post.appendChild(postHeading);

                const postBody = document.createElement('div');
                postBody.id = 'post-body';
                postBody.innerHTML = postData.data;
                post.appendChild(postBody);

                postSection.appendChild(post);
                break;
            }
        }
    })
    .catch(error => {
        console.error('There was a problem fetching the JSON data:', error);
    });
}

function populateCategoryPosts(selectedCategory) {
    const categoryPost = document.getElementById('category-posts');
    categoryPost.style.display = 'flex';
    fetch('../uploads/json/posts.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let postList = [];
        for(let postMetadata of data) {
            if (selectedCategory === postMetadata.category) {
                postList.push(postMetadata);
            }
        }
        for(let postMetaData of postList) {
            const post = document.createElement('div');
            post.id = 'post';

            const postHeading = document.createElement('a');
            postHeading.id = 'post-heading';
            postHeading.innerText = postMetaData.heading;
            post.appendChild(postHeading);

            postHeading.addEventListener('click', () => {
                categoryPost.style.display = 'none';
                showPost(postHeading.innerText);
            });

            const postDescription = document.createElement('p');
            postDescription.id = 'post-description';
            postDescription.innerText = postMetaData.description;
            post.appendChild(postDescription);

            categoryPost.appendChild(post);
        }
    })
    .catch(error => {
        console.error('There was a problem fetching the JSON data:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('../uploads/json/categories.json')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const categoryList = data.categories;
        const categories = document.getElementById('categories');
        
        for(let category of categoryList) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-div';
            categoryDiv.id = 'category-div';
            categoryDiv.innerText = category;
            categoryDiv.addEventListener('click', () => {
                categories.style.display = 'none';
                populateCategoryPosts(categoryDiv.innerText);
            });

            categories.appendChild(categoryDiv);
        }
    })
    .catch(error => {
        console.error('There was a problem fetching the JSON data:', error);
    });
});
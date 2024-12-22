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

document.addEventListener('DOMContentLoaded', () => {
    const postSection = document.getElementById('all-posts-section');
    
    fetch('../uploads/json/posts.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const reversedPostList = data.reverse();

        for(let postMetaData of reversedPostList) {
            const post = document.createElement('div');
            post.id = 'post';

            const postHeading = document.createElement('a');
            postHeading.id = 'post-heading';
            postHeading.innerText = postMetaData.heading;
            post.appendChild(postHeading);

            postHeading.addEventListener('click', () => {
                postSection.style.display = 'none';
                showPost(postHeading.innerText);
            });

            const postDescription = document.createElement('p');
            postDescription.id = 'post-description';
            postDescription.innerText = postMetaData.description;
            post.appendChild(postDescription);

            postSection.appendChild(post);
        }
    })
    .catch(error => {
        console.error('There was a problem fetching the JSON data:', error);
    });
});
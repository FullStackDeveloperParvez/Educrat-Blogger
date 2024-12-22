
// modal close and draggable
document.addEventListener('DOMContentLoaded', () => {
    const modalContent = document.getElementById('modal-content');
    let offsetX, offsetY;

    const move = (e) => {
        modalContent.style.left = `${e.clientX - offsetX}px`;
        modalContent.style.top = `${e.clientY - offsetY}px`;
    }

    modalContent.addEventListener('mousedown', (e) => {
        offsetX = e.clientX - modalContent.offsetLeft;
        offsetY = e.clientY - modalContent.offsetTop;
        document.addEventListener('mousemove', move);
    });

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move);
    });
});

// save blog
document.addEventListener('DOMContentLoaded', () => {
    const saveBlogBtn = document.getElementById('save-blog');
    const blogHeading = document.getElementById('blog-heading');
    const blogContent = document.getElementById('blog-content');

    saveBlogBtn.addEventListener('click', () => {
        const heading = blogHeading.value.trim();
        const data = blogContent.value;

        fetch("/save-blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({heading, data})
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to save blog. Please try again.");
        });
    });
});


// publish blog
document.addEventListener('DOMContentLoaded', () => {
    const closePublishModal = document.getElementById('close-publish-blog-modal');
    const publishBlogModal = document.getElementById('publish-blog-modal');
    const publishBlog = document.getElementById('publish-blog');
    
    const publishBlogBtn = document.getElementById('publish-blog-btn');
    const publishBlogTitle = document.getElementById('blog-title');
    const blogDescription = document.getElementById('blog-description');
    const category = document.getElementById('category');
    const keywords = document.getElementById('keywords');

    const blogHeading = document.getElementById('blog-heading');
    const blogContent = document.getElementById('blog-content');


    function fetchKeywordsFromContent() {
        const temp = document.createElement('div');
        temp.innerHTML = blogContent.value;
        const boldElements = temp.querySelectorAll('b, strong');
        const boldTextArray = Array.from(boldElements).map(el => el.textContent);
        return boldTextArray.join(', ');
    }

    function populatePublishBlogModal() {
        publishBlogTitle.value = blogHeading.value.trim();
        keywords.value = fetchKeywordsFromContent();
    }

    function publishBlog() {
        
    }

    closePublishModal.addEventListener('click', () => {
        publishBlogModal.style.display = 'none';
    });

    publishBlog.addEventListener('click', () => {
        publishBlogModal.style.display = 'block';
        populatePublishBlogModal();
    });

    publishBlogBtn.addEventListener('click', () => {
        publishBlog();
    });

});

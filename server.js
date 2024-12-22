const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'assets', 'uploads', 'json')));

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Server is up');
});

app.post('/save-blog', (req, res) => {
    const filePath = path.join(__dirname, 'assets', 'uploads', 'json', 'savedPosts.json');
    const blogHeading = req.body.heading;
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            let updatedJsonData = [];
            for (let post of jsonData) {
                if (post.heading == blogHeading) {
                    updatedJsonData = jsonData.filter(jsonObject => jsonObject.heading !== blogHeading);
                }
            }
            updatedJsonData.push(req.body);
            fs.writeFile(filePath, JSON.stringify(updatedJsonData, null, 2), "utf8", (err) => {
                if (err) {
                  console.error("Error writing to the file:", err);
                } else {
                  console.log("New post appended successfully!");
                  res.json({ message: `Blog saved successfully` });
                }
            });
        } 
        catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
        }
    });
    return res.status(200);
});


app.post('/publish-blog', (req, res) => {
    const categoriesFile = path.join(__dirname, 'assets', 'uploads', 'json', 'categories.json');
    const postsFile = path.join(__dirname, 'assets', 'uploads', 'json', 'posts.json');
    const postsDataFile = path.join(__dirname, 'assets', 'uploads', 'json', 'postsData.json');
    const savedPostsFile = path.join(__dirname, 'assets', 'uploads', 'json', 'savedPosts.json');

    const blogHeading = req.body.heading;
    const blogDescription = req.body.description;
    const blogCategory = req.body.category;
    const blogKeywords = req.body.keywords;
    const blogData = req.body.blogData;

    fs.readFile(postsFile, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }

        try{
            let postsFileData = json.parse(data);

            for (let postDta of postsFileData) {
                if (postDta.heading === blogHeading) {
                    res.json({ message: `Duplicate Title` });
                    return res;
                }
            }

            let postData = {};
            postData.heading = blogHeading;
            postData.category = blogCategory;
            postData.description = blogDescription;
            postData.keywords = blogKeywords;

            postsFileData.push(postData);
            fs.writeFile(postsFile, JSON.stringify(postsFileData, null, 2), "utf8", (err) => {
                if (err) {
                  console.error("Error writing to the file:", err);
                }
            });
        }
        catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
        }
    });

    fs.readFile(categoriesFile, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }
        try {
            let categoriesFileData = json.parse(data);
            let categoriesList = categoriesFileData;

            if(!categoriesList.includes(blogCategory)) {
                categoriesList.push(blogCategory);

                fs.writeFile(categoriesFile, JSON.stringify(categoriesList, null, 2), "utf8", (err) => {
                    if (err) {
                      console.error("Error writing to the file:", err);
                    }
                });
            }
        }
        catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
        }
    });

    fs.readFile(postsDataFile, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }
        try {
            let postsDataList = json.parse(data);

            const postData = {};
            postData.heading = blogHeading;
            postData.data = blogData;

            postsDataList.push(postData);

            fs.writeFile(postsDataFile, JSON.stringify(postsDataList, null, 2), "utf8", (err) => {
                if (err) {
                  console.error("Error writing to the file:", err);
                }
            });
        }
        catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
        }
    });

    fs.readFile(savedPostsFile, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            let updatedJsonData = [];
            for (let post of jsonData) {
                if (post.heading == blogHeading) {
                    updatedJsonData = jsonData.filter(jsonObject => jsonObject.heading !== blogHeading);
                }
            }
            fs.writeFile(filePath, JSON.stringify(updatedJsonData, null, 2), "utf8", (err) => {
                if (err) {
                  console.error("Error writing to the file:", err);
                } else {
                  console.log("New post appended successfully!");
                  res.json({ message: `Blog saved successfully` });
                }
            });
        } 
        catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
        }
    });
    return res;

});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
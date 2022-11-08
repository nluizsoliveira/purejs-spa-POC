var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
const marked = require('marked');

const markdownFolder = path.join(__dirname, 'public/components/blog/blog_posts/')
const markdownFiles = fs.readdirSync(markdownFolder)
for(const file of markdownFiles){
    filePath = path.join(markdownFolder, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const html = marked.parse(fileContent)
    fs.writeFileSync(markdownFolder + file.replace('.md', '.html'), html);
}

const public = path.join(__dirname, 'public');
app.use('/', express.static(public));
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

const allowed_categories = ["data_mining", "infra_devops"]
const allowedIds = Array.from(Array(100).keys())
app.use('/blog', express.static(public));
app.get('/blog/:category/:postId', function(req, res) {
    const category = req.params.category
    const postId = parseInt(req.params.postId)
    if (allowed_categories.includes(category)){
        if(allowedIds.includes(postId)){
            // res.sendFile(path.join(public, 'index.html'));
            console.log(path.join(public, 'page.html'));
            res.sendFile(path.join(public, 'index.html'));
        }
        else{
            res.sendStatus(404);
        }
    }
});

app.listen(8080);

/* DEVELOPMENT ONLY 
app.use('/test', express.static(public));
app.get('/test/:component', function(req, res) {
    const componentsFolder = path.join(public, 'components')
    const allComponents = fs.readdirSync(componentsFolder)
    const component = req.params.component
    
    if (allComponents.includes(component)){
        res.sendFile(path.join(componentsFolder, `/${component}/test/test.html`));
    }
    
    else{
        res.sendStatus(404);
    }
});
*/


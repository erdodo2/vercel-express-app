const express = require('express');
const router = express.Router();
const firebaseApi = require('../firebaseApi');

router.get('/', async (req, res) => {
    res.send('Hello World!')
})
router.get('/:doc/:name', async (req, res) => {

    let name = req.params.name.replace('%20',' ')
    let data = await firebaseApi.getData('profile', req.params.doc)

    let projects=[]
    data.projects.forEach((project) => {
        if(project.category.find((category) => category.toLowerCase() === name.toLowerCase())){
            projects.push(project)
        }
    })
    res.json(projects)

})




module.exports = router;
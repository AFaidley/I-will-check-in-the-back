const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagRes = await Tag.findAll({
        include: [{ model: Product }]
    });

    res.status(200).json(tagRes);
} 

catch (error) {
    res.status(500).json(error);
 }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagRes =  await Tag.findOne({where: {id: req.params.id},include: [{ model: Product }]});

    if (!tagRes) {
        res.status(404).json({ message: 'Unable to find tags with this id!' });
        return;
    }

    res.status(200).json(tagRes);
} 

catch (error) {
    res.status(500).json(error);
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagRes = await Tag.create({tag_name: req.body.tag_name});
    res.status(200).json(tagRes);
}   

catch (error) {
    res.status(400).json(error);
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagRes = await Tag.update({tag_name: req.body.tag_name},{where: {id:req.params.id}});
    
    if (!tagRes)   {
        res.status(404).json({ message: 'Unable to find tags with this id!' });
        return;
    }

    res.status(200).json(tagRes);
}

catch (error) {
    res.status(400).json(error);
}
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagRes = await Tag.destroy({where: {id:req.params.id}});

    if (!tagRes) {
        res.status(404).json({ message: 'Unable to find tags with this id!' });
        return;
    }

    res.status(200).json(tagRes);
    
} 
catch (error) {
    res.status(500).json(error);
}
});

module.exports = router;

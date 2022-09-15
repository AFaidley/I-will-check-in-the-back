const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  try {
    const categoryRes = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.status(200).json(categoryRes);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    const categoryRes = await Category.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!categoryRes) {
      res
        .status(404)
        .json({ message: "Unable to find categories with this id!" });
      return;
    }

    res.status(200).json(categoryRes);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryRes = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryRes);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const CategoryRes = await Category.update({category_name: req.body.category_name},{where: {id:req.params.id}});
    if (!CategoryRes)   {
        res.status(404).json({ message: 'Unable to find categories with this id!' });
        return;
    }

    res.json(CategoryRes);
}

catch (error) {
    res.status(400).json(error);
}
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryRes = await Category.destroy({where: {id:req.params.id}});

    if (!categoryRes) {
        res.status(404).json({ message: 'Unable to find categories with this id!' });
        return;
    }

    res.status(200).json(categoryRes);
    
} 
catch (error) {
    res.status(500).json(error);
}
});

module.exports = router;

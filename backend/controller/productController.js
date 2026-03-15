import { Product } from "../model/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.status(400).json({
        success: false,
        message: "Invalid response",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Getting products successful",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting all products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    return res.status(200).json({
        success: true,
        message: 'Getting product by id successful',
        data: product
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting product by id",
      error: error.message,
    });
  }
};

export const postProduct = async (req, res) => {
    try {
        const {name, description, price, category} = req.body;

        if(!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: 'Missing some details!!'
            });
        }

        if(typeof price !== 'number') {
            return res.status(400).json({
                success: false,
                message: 'Price value must be an number'
            })
        }

        const productData = {
            name,
            description,
            price,
            category
        }

        const product = await Product.create(productData);

        return res.status(201).json({
            success: true,
            message: 'Creating product successful',
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            messge: 'Error posting product',
            error: error.message
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, description, price, category} = req.body;

        if(!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: 'Some details are missing!!'
            })
        }

        if(typeof price !== 'number') {
            return res.status(400).json({
                success: false,
                message: 'Price value must be number'
            })
        }

        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category
        }, {new: true})

        if(!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Updating product successful',
            data: product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating the product',
            error: error.message
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id);

        if(!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Deleting product successful',
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting the product'
        })
    }
}

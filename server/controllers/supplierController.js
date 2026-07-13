import Supplier from "../models/Supplier.js";
const addSupplier = async (req, res) => {
  try {
    const { supplierName, supplierEmail, supplierPhone, supplierAddress } =
      req.body;

    // // 1. Manual Validation: Check for empty fields immediately
    // if (!categoryName || !categoryDescription) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are required",
    //   });
    // }

    // Check if existing
    const existingSupplier = await Supplier.findOne({ where: { supplierName } });
    if (existingSupplier) {
      return res.status(400).json({
        success: false,
        message: "Supplier already exists",
      });
    }

    const newSupplier = new Supplier({
      supplierName, supplierEmail, supplierPhone, supplierAddress
    });

    await newSupplier.save();

    return res.status(201).json({
      success: true,
      message: "Supplier added successfully",
    });
  } catch (error) {
    console.log("Error adding Supplier:", error);
    // This ensures the frontend gets a JSON response even on server error
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findAll();
        return res.status(200).json({ success: true, supplier });
    } catch (error) {
        console.error('Error fetching Supplier:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// const updateCategory = async (req, res)=>{

// try {
//   const { id } = req.params;
//   const { categoryName, categoryDescription } = req.body;

//   // Check if the category exists
//   const existingCategory = await Category.findById(id);
//   if (!existingCategory) {
//     return res.status(404).json({ success: false, message: 'Category not found' });
//   }

//   const updatedCategory = await Category.findByIdAndUpdate(
//     id,
//     { categoryName, categoryDescription },
//     { new: true }
//   );

//   return res.status(200).json({ success: true, message: 'Category updated successfully' });
// } catch (error) {
//   console.error('Error updating category:', error);
//   return res.status(500).json({ success: false, message: 'Server error' });
// }
// }

// const deleteCategory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Check if the category exists
//     const existingCategory = await Category.findById(id);
//     if (!existingCategory) {
//       return res.status(404).json({ success: false, message: 'Category not found' });
//     }

//     await Category.findByIdAndDelete(id);
//     return res.status(200).json({ success: true, message: 'Category deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting category:', error);
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// };
export { addSupplier ,getSupplier };

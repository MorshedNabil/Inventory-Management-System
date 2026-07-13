import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Container from "../Container";
import { Button } from "../ui/button";
import { MdOutlineCancel } from "react-icons/md";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const emptyForm = {
  productName: "",
  categoryId: "",
  brand: "",
  price: "",
  quantity: "",
  description: "",
};

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");

  const [addEditModel, setAddEditModel] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [formdata, setFormData] = useState(emptyForm);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching Products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand).filter(Boolean))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.productName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        !categoryFilter || String(product.categoryId) === categoryFilter;
      const matchesBrand = !brandFilter || product.brand === brandFilter;
      const matchesAvailability =
        !availabilityFilter ||
        (availabilityFilter === "in-stock" && product.quantity > 0) ||
        (availabilityFilter === "out-of-stock" && product.quantity <= 0);

      return matchesSearch && matchesCategory && matchesBrand && matchesAvailability;
    });
  }, [products, search, categoryFilter, brandFilter, availabilityFilter]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setEditProduct(null);
    setFormData(emptyForm);
    setAddEditModel(1);
  };

  const handleEditClick = (product) => {
    setEditProduct(product.id);
    setFormData({
      productName: product.productName,
      categoryId: String(product.categoryId),
      brand: product.brand,
      price: product.price,
      quantity: product.quantity,
      description: product.description || "",
    });
    setAddEditModel(1);
  };

  const handleCloseModal = () => {
    setAddEditModel(null);
    setEditProduct(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formdata,
        categoryId: parseInt(formdata.categoryId, 10),
        price: parseFloat(formdata.price),
        quantity: parseInt(formdata.quantity, 10),
      };

      const response = editProduct
        ? await axios.put(
            `http://localhost:3000/api/product/${editProduct}`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
              },
            }
          )
        : await axios.post("http://localhost:3000/api/product/add", payload, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          });

      if (response.data.success) {
        alert(editProduct ? "Product updated successfully" : "Product added successfully");
        handleCloseModal();
        fetchProducts();
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert(error.response?.data?.message || "Error saving product.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await axios.delete(`http://localhost:3000/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      if (response.data.success) {
        alert("Product deleted successfully!");
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.response?.data?.message || "Error deleting product.");
    }
  };

  return (
    <Container>
      <h2 className="font-bold text-[#0C2B4E] text-4xl">Product Management</h2>

      <div className="flex flex-wrap justify-between items-center gap-3 py-5">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search by product name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[300px] rounded-xl border-[#0C2B4E] border-2 py-3 px-2"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border-[#0C2B4E] border-2 py-3 px-2"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={String(category.id)}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="rounded-xl border-[#0C2B4E] border-2 py-3 px-2"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="rounded-xl border-[#0C2B4E] border-2 py-3 px-2"
          >
            <option value="">All Availability</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
        <Button
          type="button"
          className="bg-[#0C2B4E] hover:bg-[#45BA8C] duration-300"
          onClick={handleAddClick}
        >
          Add Product
        </Button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">No:</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Brand</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Availability</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{product.productName}</td>
                <td className="border border-gray-300 p-2">{product.category?.categoryName}</td>
                <td className="border border-gray-300 p-2">{product.brand}</td>
                <td className="border border-gray-300 p-2">{product.price}</td>
                <td className="border border-gray-300 p-2">{product.quantity}</td>
                <td className="border border-gray-300 p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      product.quantity > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      className="bg-[#0C2B4E] hover:bg-[#45BA8C] duration-300"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-[#0C2B4E] hover:bg-red-700 duration-300"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={8} className="border border-gray-300 p-4 text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {addEditModel && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="gap-4 mt-4 bg-white p-4 rounded w-[800px] relative">
            <button
              className="absolute top-1 right-1 text-xl cursor-pointer hover:text-red-700"
              onClick={handleCloseModal}
            >
              <MdOutlineCancel />
            </button>
            <form
              className="flex flex-col gap-4 mt-2 bg-white p-4 rounded shadow-md"
              onSubmit={handleSubmit}
            >
              <h2 className="font-bold text-[#0C2B4E] text-3xl">
                {editProduct ? "Edit Product" : "Add Product"}
              </h2>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="productName">Product Name</FieldLabel>
                    <Input
                      className="border p-1 bg-white rounded px-4"
                      id="productName"
                      type="text"
                      placeholder="ex: Classic T-Shirt"
                      name="productName"
                      value={formdata.productName}
                      onChange={handleForm}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="categoryId">Category</FieldLabel>
                    <select
                      className="border p-1 bg-white rounded px-4 h-9"
                      id="categoryId"
                      name="categoryId"
                      value={formdata.categoryId}
                      onChange={handleForm}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={String(category.id)}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="brand">Brand</FieldLabel>
                    <Input
                      className="border p-1 bg-white rounded px-4"
                      id="brand"
                      type="text"
                      placeholder="ex: Nike"
                      name="brand"
                      value={formdata.brand}
                      onChange={handleForm}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="price">Price</FieldLabel>
                    <Input
                      className="border p-1 bg-white rounded px-4"
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="ex: 19.99"
                      name="price"
                      value={formdata.price}
                      onChange={handleForm}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                    <Input
                      className="border p-1 bg-white rounded px-4"
                      id="quantity"
                      type="number"
                      min="0"
                      placeholder="ex: 50"
                      name="quantity"
                      value={formdata.quantity}
                      onChange={handleForm}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Input
                      className="border p-1 bg-white rounded px-4"
                      id="description"
                      type="text"
                      placeholder="Optional description"
                      name="description"
                      value={formdata.description}
                      onChange={handleForm}
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Button
                type="submit"
                className="bg-[#0C2B4E] hover:bg-[#45BA8C] duration-300"
              >
                {editProduct ? "Save Changes" : "Add Product"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Products;

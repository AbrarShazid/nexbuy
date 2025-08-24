"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiPackage, FiDollarSign, FiTruck, FiCamera, FiSave } from "react-icons/fi";
import { BiCategory, BiStore } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { RiFileSettingsLine } from "react-icons/ri";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);

    const file = formData.get("img");

    if (!file) {
      setError("Image is required");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Upload to imgbb
      const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
      const imgbbForm = new FormData();
      imgbbForm.append("image", file);

      const uploadRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body: imgbbForm,
      });

      const uploadData = await uploadRes.json();
      if (!uploadData.success) {
        throw new Error("Image upload failed");
      }

      const imgUrl = uploadData.data.url;

      // 2️⃣ Save product to API route
      const productData = {
        category: formData.get("category"),
        name: formData.get("name"),
        seller: formData.get("seller"),
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        img: imgUrl,
        shipping: Number(formData.get("shipping")),
        description: formData.get("description"),
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to save product");

      toast.success('Product added successfully!');
      e.target.reset();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div>
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-50 flex items-center justify-center gap-2">
            <FiPackage className="text-blue-600 dark:text-gray-50" /> 
            Add a New Product
          </h1>
          <p className="text-gray-600 dark:text-gray-100 mt-2">Fill in the details below to add a new product to your inventory</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-gray-700 dark:text-gray-50 font-medium flex items-center gap-2">
                <BiCategory className="text-blue-600 dark:text-gray-50" /> Category
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="category"
                  placeholder="e.g., Electronics, Clothing"
                  required
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-700 focus:border-none outline-none transition"
                  
                />
             <BiCategory className="absolute left-3 top-3.5 text-gray-400 " />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-2 dark:text-gray-50">
                <FiPackage className="text-blue-600 dark:text-gray-50" /> Product Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  required
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-700 focus:border-none outline-none transition"
                />
                <FiPackage className="absolute left-3 top-3.5 text-gray-400 " />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-2 dark:text-gray-50">
                <BiStore className="text-blue-600 dark:text-gray-50" /> Seller
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="seller"
                  placeholder="Seller name"
                  required
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-700 focus:border-none outline-none transition"
                />
                <BiStore className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-2 dark:text-gray-50">
                <FiDollarSign className="text-blue-600 dark:text-gray-50" /> Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-700 focus:border-none outline-none transition"
                />
                <FiDollarSign className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-2 dark:text-gray-50">
                <BsBoxSeam className="text-blue-600 dark:text-gray-50" /> Stock
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="stock"
                  placeholder="Quantity available"
                  min="0"
                  required
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-700 focus:border-none outline-none transition"
                />
                <BsBoxSeam className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium flex items-center gap-2 dark:text-gray-50">
                <FiTruck className="text-blue-600 dark:text-gray-50" /> Shipping
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="shipping"
                  placeholder="Shipping cost"
                  min="0"
                  step="0.01"
                  required
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-700 focus:border-none outline-none transition"
                />
                <FiTruck className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-700 font-medium flex items-center gap-2 dark:text-gray-50">
              <FiCamera className="text-blue-600 dark:text-gray-50" /> Product Image
            </label>
            <div className="relative">
              <input
                type="file"
                name="img"
                accept="image/*"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-700 focus:border-none outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:text-gray-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-700 font-medium flex items-center gap-2 dark:text-gray-50">
              <RiFileSettingsLine className="text-blue-600 dark:text-gray-50" /> Description
            </label>
            <div className="relative">
              <textarea
                name="description"
                placeholder="Product description and features..."
                required
                rows="4"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-700 focus:border-none outline-none transition"
              />
              <RiFileSettingsLine className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="text-lg" /> Add Product
              </>
            )}
          </button>
        </form>
        </div>
    
  );
}
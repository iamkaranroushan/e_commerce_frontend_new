'use client';
import { useState } from 'react';
import useCategories from '@/hooks/useCategories';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';
import EditProductList from '@/components/edit/editProductList';
import CreateProductForm from '@/components/edit/createProductForm';
import { Button } from '@/components/ui/button';
import { RxCross2 } from 'react-icons/rx';

const EditProductPage = () => {
  const { categories } = useCategories();
  const [expandedCatId, setExpandedCatId] = useState(null);
  const [showFormMap, setShowFormMap] = useState({});

  const handleToggle = (id) => {
    setExpandedCatId(prev => (prev === id ? null : id));
  };

  const toggleCreateForm = (catId) => {
    setShowFormMap(prev => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  return (
    <div className='flex flex-col justify-center p-3 mt-12'>
      <div className='grid gap-4'>
        {categories.map(category => (
          <div key={category.id} className='border-b'>
            <div
              className='py-4 flex justify-between items-center'
              onClick={() => handleToggle(category.id)}
            >
              <div className='flex items-center gap-4'>
                {category.imageUrl && (
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className='w-12 h-12 object-cover rounded-full'
                  />
                )}
                <p className='font-semibold'>{category.name}</p>
              </div>

              <div className='flex gap-3 text-xl cursor-pointer'>
                {expandedCatId === category.id ? (
                  <MdOutlineExpandLess />
                ) : (
                  <MdOutlineExpandMore />
                )}
              </div>
            </div>

            {/* When expanded */}
            {expandedCatId === category.id && (
              <div className="flex flex-col justify-center">
                {/* Toggle Create Form */}
                {showFormMap[category.id] ? (
                  <div className='flex justify-end mb-4'>
                    <RxCross2
                      className='text-2xl cursor-pointer text-gray-600 hover:text-red-500 transition'
                      onClick={() => toggleCreateForm(category.id)}
                    />
                  </div>
                ) : (
                  <Button
                    onClick={() => toggleCreateForm(category.id)}
                    className='mb-4 p-6'
                  >
                    Create Product
                  </Button>
                )}

                {/* Create Product Form */}
                {showFormMap[category.id] && (
                  <CreateProductForm
                    subcategoryId={category.id} // 🟢 rename later to categoryId for clarity
                    onCreateProduct={(data) => {
                      console.log("✅ Created product for category:", category.id, data);
                    }}
                  />
                )}

                {/* Product List */}
                <EditProductList categoryId={category.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditProductPage;

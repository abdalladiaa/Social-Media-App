import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

export default function ImagePreview({ image, onClose }) {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);


  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className=" max-w-5xl max-h-screen p-4">
        <button
          onClick={onClose}
          className=" cursor-pointer absolute right-4 top-4  z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          aria-label="إغلاق"
        >
          <IoClose size={28} />
        </button>
        <img
          src={image}
          alt="معاينة الصورة"
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}
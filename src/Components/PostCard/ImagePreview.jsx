import React, { useEffect } from "react";
import { IoClose, IoDownloadOutline } from "react-icons/io5";

export default function ImagePreview({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    // منع التمرير في الخلفية عند فتح الصورة
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `social-up-image-${Date.now()}`;
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      {/* الأزرار العلوية */}
      <div className="absolute top-6 right-6 flex gap-3 z-[110]">
        <button
          onClick={onClose}
          className="p-3 bg-white/10 hover:bg-red-500 text-white rounded-full transition-all duration-200 backdrop-blur-md border border-white/10"
          aria-label="Close"
        >
          <IoClose size={24} />
        </button>
      </div>

      {/* حاوية الصورة مع أنيميشن */}
      <div className="relative max-w-[95vw] max-h-[95vh] p-2 sm:p-4 flex items-center justify-center animate-in zoom-in-95 duration-300 ease-out">
        <img
          src={image}
          alt="Full screen preview"
          className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] select-none"
          onContextMenu={(e) => e.preventDefault()} 
        />
      </div>

    </div>
  );
}

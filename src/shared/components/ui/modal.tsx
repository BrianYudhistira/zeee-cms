"use client";

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({onClose, title, children }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden border border-black/10 dark:border-white/10 transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        {/* Body */}
        <div className="overflow-y-auto max-h-[calc(90vh-5rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}

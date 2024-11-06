
interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        
        {/* Dialog Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        
        {/* Dialog Content */}
        <div className="text-gray-600 flex flex-col gap-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;

export default function FadeInWrapper({ children, className = '' }) {
  return (
    <div className={`animate-fadeIn ${className}`}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
      {children}
    </div>
  );
}

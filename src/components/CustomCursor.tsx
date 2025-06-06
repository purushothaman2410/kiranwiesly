
export const CustomCursor = () => {
  return (
    <div 
      className="fixed w-6 h-6 bg-yellow-400 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 opacity-70 mix-blend-difference" 
      data-cursor
      style={{
        transition: 'width 0.3s, height 0.3s, opacity 0.3s',
      }}
    />
  );
};

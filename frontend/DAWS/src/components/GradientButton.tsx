export default function GradientButton({ title, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="
        w-full py-2 mt-4 rounded-lg font-semibold text-white
        bg-gradient-to-r from-[#8441A4] to-[#FF5894]
        hover:opacity-90 transition-all
      "
    >
      {title}
    </button>
  );
}

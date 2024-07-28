export function Button({ text }) {
    return <div className="px-2">
        <button className="w-full h-10 align-middle font-bold text-center text-white uppercase transition-all text-xs px-6 rounded-lg bg-slate-900  shadow-md shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">{text}</button>
    </div>;
  }
  
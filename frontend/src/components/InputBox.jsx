export function InputBox({ label, placeholder, onChange  }) {
    return <div className="text-sm font-medium px-2 py-2 text-left">
    <div className="font-medium">
        {label}
    </div>
        <input className="w-full px-2 py-1 border-2 rounded border-slate-300" placeholder={placeholder} onChange={onChange}/>
    </div>;
  }
  
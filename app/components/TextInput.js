"use client";

export default function TextInput({ string, placeholder, error, onUpdate }) {
  return (
    <>
      <input
        placeholder={placeholder}
        className="w-full bg-white text-black border border-gray-900 placeholder-gray-500 outline-none focus:outline-none p-2"
        value={string || ""}
        onChange={(e) => onUpdate(e.target.value)}
        type="text"
        autoComplete="off"
      />

      <p className="text-red-500 text-sm font-semibold ml-1">
        {error ? error : null}
      </p>
    </>
  );
}

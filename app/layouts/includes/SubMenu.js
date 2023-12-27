"use client";

export default function SubMenu() {
  const menuItems = [
    { id: 1, name: "Home" },
    { id: 2, name: "Saved" },
    { id: 3, name: "Electronics" },
    { id: 4, name: "Motors" },
    { id: 5, name: "Fashion" },
    { id: 6, name: "Collectables and Art" },
    { id: 7, name: "Sports" },
    { id: 8, name: "Health and Beauty" },
    { id: 9, name: "Industrial Equipment" },
    { id: 10, name: "Home and Garden" },
    { id: 11, name: "Sell" },
  ];

  return (
    <>
      <div className="border-b">
        <div className="flex items-center justify-center w-full mx-auto max-w-[1200px] py-2 md:py-3">
          <ul className="flex items-center text-sm text-[#333] gap-3 overflow-x-auto px-3">
            {menuItems.map((item) => (
              <li
                className="hover:underline whitespace-nowrap cursor-pointer"
                key={item.id}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

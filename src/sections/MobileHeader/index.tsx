export const MobileHeader = () => {
  return (
    <div className="fixed items-center bg-white box-border caret-transparent flex h-16 justify-between z-50 border-gray-200 px-4 border-b border-solid top-0 inset-x-0 md:hidden">
      <button
        type="button"
        className="bg-transparent caret-transparent block min-h-[auto] min-w-[auto] text-center p-0 md:inline-block md:min-h-0 md:min-w-0"
      >
        <img
          src="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-1.svg"
          alt="Icon"
          className="text-gray-600 box-border caret-transparent h-6 w-6"
        />
      </button>
    </div>
  );
};

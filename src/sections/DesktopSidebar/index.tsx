import { SidebarNav } from "./components/SidebarNav";

export const DesktopSidebar = () => {
  return (
    <div className="box-border caret-transparent hidden shrink min-h-0 min-w-0 md:flex md:shrink-0 md:min-h-[auto] md:min-w-[auto]">
      <div className="box-border caret-transparent flex flex-col min-h-0 min-w-0 md:min-h-[auto] md:min-w-[auto]">
        <div className="bg-white box-border caret-transparent flex basis-[0%] flex-col grow min-w-0 border-gray-200 border-r border-solid md:min-w-[auto]">
          <div className="relative bg-white box-border caret-transparent flex flex-col h-full min-h-0 min-w-0 w-16 md:min-h-[auto] md:min-w-[auto]">
            <a
              href="/signin"
              className="box-border caret-transparent block min-h-0 min-w-0 md:min-h-[auto] md:min-w-[auto]"
            >
              <span className="text-gray-800 text-sm font-semibold bg-white shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] box-border caret-transparent block leading-5 text-center border border-gray-200 px-2 py-2.5 rounded-md border-solid hover:shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_10px_15px_-3px,rgba(0,0,0,0.1)_0px_4px_6px_-4px]">
                →
              </span>
            </a>
            <SidebarNav />
          </div>
        </div>
      </div>
    </div>
  );
};

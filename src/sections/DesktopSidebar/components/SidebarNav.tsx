import { NavItem } from "./NavItem";

export const SidebarNav = () => {
  return (
    <nav className="box-border caret-transparent basis-[0%] grow min-h-0 min-w-0 my-3 px-3 md:min-h-[auto] md:min-w-[auto]">
      <NavItem
        href="/dashboard/presentations"
        iconUrl="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-2.svg"
        iconAlt="Icon"
        linkVariant="text-gray-700 hover:bg-gray-50"
        containerVariant="items-center flex justify-center"
        iconVariant="text-gray-400"
        hasBadge={false}
      />
      <NavItem
        href="/dashboard/templates"
        iconUrl="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-3.svg"
        iconAlt="Icon"
        linkVariant="text-gray-700 hover:bg-gray-50"
        containerVariant="items-center flex justify-center"
        iconVariant="text-gray-400"
        hasBadge={false}
      />
      <NavItem
        href="/dashboard/discover"
        iconUrl="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-4.svg"
        iconAlt="Icon"
        linkVariant="text-gray-700 hover:bg-gray-50"
        containerVariant="items-center flex justify-center"
        iconVariant="text-gray-400"
        hasBadge={false}
      />
      <NavItem
        href="/dashboard/ai-chat"
        iconUrl="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-5.svg"
        iconAlt="Icon"
        containerVariant="relative overflow-hidden"
        linkVariant="text-gray-700 hover:bg-gray-50"
        iconVariant="text-gray-400"
        hasBadge={true}
      />
      <NavItem
        href="/dashboard/ai-slide"
        iconUrl="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-6.svg"
        hasBadge={true}
        linkVariant="bg-gray-200"
        containerVariant="relative overflow-hidden"
        iconVariant=""
      />
      <NavItem
        href="/dashboard/integrations"
        iconUrl="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-7.svg"
      />
      <NavItem
        href="/dashboard/chartai"
        iconUrl="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-8.svg"
        iconAlt="Icon"
        containerVariant="relative overflow-hidden"
        hasBadge={true}
      />
      <NavItem
        href="/dashboard/tutorials"
        iconUrl="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-9.svg"
        iconAlt="Icon"
        linkVariant="text-gray-700 hover:bg-gray-50"
        containerVariant="items-center flex justify-center"
        iconVariant="text-gray-400"
        hasBadge={false}
      />
      <NavItem
        href="/dashboard/invite-members"
        iconUrl="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-10.svg"
        iconAlt="Icon"
        linkVariant="text-gray-700 hover:bg-gray-50"
        containerVariant="items-center flex justify-center"
        iconVariant="text-gray-400"
        hasBadge={false}
      />
      <NavItem
        href="/dashboard/settings"
        iconUrl="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-11.svg"
        iconAlt="Icon"
        linkVariant="text-gray-700 hover:bg-gray-50"
        containerVariant="items-center flex justify-center"
        iconVariant="text-gray-400"
        hasBadge={false}
      />
      <NavItem
        href="/dashboard/billing"
        iconUrl="https://c.animaapp.com/mh7f6r12BRiEQe/assets/icon-12.svg"
        iconAlt="Icon"
        linkVariant="text-gray-700 hover:bg-gray-50"
        containerVariant="items-center flex justify-center"
        iconVariant="text-gray-400"
        hasBadge={false}
      />
    </nav>
  );
};

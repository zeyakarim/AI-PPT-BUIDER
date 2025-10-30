export type NavItemProps = {
    href: string;
    iconUrl: string;
    iconAlt?: string;
    linkVariant?: string;
    containerVariant?: string;
    iconVariant?: string;
    hasBadge?: boolean;
};

export const NavItem = (props: NavItemProps) => {
    const {
        href,
        iconUrl,
        iconAlt = "Icon",
        linkVariant = "text-gray-700 hover:bg-gray-50",
        containerVariant = "items-center flex justify-center",
        iconVariant = "text-gray-400",
        hasBadge = false,
    } = props;

    return (
        <a
            href={href}
            className={`relative text-sm font-medium items-center box-border caret-transparent flex justify-center leading-5 w-full mb-1 px-3 py-2.5 rounded-lg ${linkVariant}`}
        >
            <div
                className={`box-border caret-transparent min-h-0 min-w-0 md:min-h-[auto] md:min-w-[auto] ${containerVariant}`}
            >
                {hasBadge ? (
                    <>
                        <div className="items-center box-border caret-transparent flex justify-center">
                            <img
                                src={iconUrl}
                                alt={iconAlt}
                                className={`box-border caret-transparent shrink-0 h-5 w-5 ${iconVariant}`}
                            />
                        </div>
                        <div className="absolute bg-[linear-gradient(to_right,rgba(0,0,0,0),rgba(255,255,255,0.2)_30%)] box-border caret-transparent hidden h-full opacity-40 w-6/12 top-0 -bottom-full -inset-x-full"></div>
                    </>
                ) : (
                    <img
                        src={iconUrl}
                        alt={iconAlt}
                        className={`box-border caret-transparent shrink-0 h-5 w-5 ${iconVariant}`}
                    />
                )}
            </div>
        </a>
    );
};

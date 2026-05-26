import { Link, usePage } from '@inertiajs/react';
import {
    Headset,
    LayoutGrid,
    Menu,
    Search,
    ShoppingCart,
    Heart,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { cn, toUrl } from '@/lib/utils';
import { dashboard, login, register } from '@/routes';
import type { BreadcrumbItem, NavItem } from '@/types';
import { Input } from './ui/input';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
    canRegister?: boolean;
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    { title: 'Products', href: '/products', icon: null },
    { title: 'Categories', href: '/categories', icon: null },
    { title: 'Orders', href: '/orders', icon: null },
    { title: 'Promotions', href: '/promotions', icon: null },
    { title: 'Brands', href: '/brands', icon: null },
];

// const rightTopNavItems: NavItem[] = [
//     {
//         title: 'Support',
//         href: '#',
//         icon: Headset,
//     },
//     {
//         title: 'Wishlist',
//         href: '#',
//         icon: Heart,
//     },
//     {
//         title: 'Cart',
//         href: '#',
//         icon: ShoppingCart,
//     },
// ];

const rightBottomNavItems: NavItem[] = [
    {
        title: 'Support',
        href: '#',
        icon: Headset,
    },
    {
        title: 'Wishlist',
        href: '#',
        icon: Heart,
    },
    {
        title: 'Cart',
        href: '/cart',
        icon: ShoppingCart,
    },
];

const activeItemStyles =
    'text-neutral-900 dark:bg-[#ac6ff7] dark:text-neutral-100';

export function AppHeader({ canRegister = true, breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;

    const getInitials = useInitials();
    const { isCurrentUrl, whenCurrentUrl } = useCurrentUrl();

    return (
        <>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-30 items-end px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mr-2 h-[34px] w-[34px]"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar"
                            >
                                <SheetTitle className="sr-only">
                                    Navigation menu
                                </SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {mainNavItems.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="flex items-center space-x-2 font-medium"
                                                >
                                                    {item.icon && (
                                                        <item.icon className="h-5 w-5" />
                                                    )}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="flex flex-col space-y-4">
                                            {rightBottomNavItems.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    rel="noopener noreferrer"
                                                    className="flex items-center space-x-2 font-medium"
                                                >
                                                    {item.icon && (
                                                        <item.icon className="h-5 w-5" />
                                                    )}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="align-center flex min-h-full items-center">
                        <Link
                            href={dashboard()}
                            prefetch
                            className="flex items-center space-x-2"
                        >
                            <AppLogo />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="justify-envely ml-6 flex hidden h-full w-[50%] flex-col space-x-6 lg:flex">
                        <div className="relative my-4 ml-auto flex items-center space-x-2">
                            {' '}
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="hidden w-130 bg-[#161616] lg:block"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="group h-9 w-9 cursor-pointer"
                            >
                                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
                            </Button>
                        </div>
                        <div>
                            <NavigationMenu className="flex min-h-full items-center space-x-2">
                                <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                    {mainNavItems.map((item, index) => (
                                        <NavigationMenuItem
                                            key={index}
                                            className="relative flex h-full items-center"
                                        >
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    whenCurrentUrl(
                                                        item.href,
                                                        activeItemStyles,
                                                    ),
                                                    'h-9 cursor-pointer px-3',
                                                )}
                                            >
                                                {item.icon && (
                                                    <item.icon className="mr-2 h-4 w-4" />
                                                )}
                                                {item.title}
                                            </Link>
                                            {isCurrentUrl(item.href) && (
                                                <div className="absolute top-12.5 left-0 h-0.5 w-full translate-y-px bg-[#ac6ff7] dark:bg-transparent"></div>
                                            )}
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    <div className="ml-auto min-h-full items-center space-x-3">
                        <div className="my-4 ml-auto flex min-h-full items-center space-x-2">
                            <div className="relative flex items-center space-x-1">
                                <div className="ml-1 hidden gap-1 lg:flex">
                                    <div className="h-8 w-75 rounded-sm border-1 p-1 text-center">
                                        PROMO 100% OFF
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-4 ml-auto flex min-h-full items-center space-x-2">
                            <div className="relative flex min-h-full items-center space-x-1">
                                <div className="ml-1 hidden gap-1 lg:flex">
                                    {rightBottomNavItems.map((item) => (
                                        <Tooltip key={item.title}>
                                            <TooltipTrigger>
                                                <Link
                                                    href={item.href}
                                                    rel="noopener noreferrer"
                                                    className="group inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium text-accent-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                >
                                                    <span className="sr-only">
                                                        {item.title}
                                                    </span>
                                                    {item.icon && (
                                                        <item.icon className="size-5 opacity-80 group-hover:opacity-100" />
                                                    )}
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{item.title}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>
                            <div>
                                {auth.user ? (
                                    <>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                asChild
                                                className="align-start justify-start"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    className="size-10 rounded-full p-1"
                                                >
                                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                                        <AvatarImage
                                                            src={
                                                                auth.user
                                                                    ?.avatar
                                                            }
                                                            alt={
                                                                auth.user?.name
                                                            }
                                                        />
                                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                            {getInitials(
                                                                auth.user
                                                                    ?.name ??
                                                                    '',
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <div className="text-start">
                                                            {auth.user.name}
                                                        </div>
                                                        <div className="text-sm text-neutral-500">
                                                            {auth.address
                                                                ? auth.address.street.slice(
                                                                      0,
                                                                      20,
                                                                  ) + '...'
                                                                : null}
                                                        </div>
                                                    </div>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-56"
                                                align="start"
                                            >
                                                {auth.user && (
                                                    <UserMenuContent
                                                        user={auth.user}
                                                    />
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                        >
                                            Log in
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                            >
                                                Register
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full ">
                    <div className="mx-auto flex h-10 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}

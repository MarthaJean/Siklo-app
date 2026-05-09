export interface NavigationItem {
  title: string;
  icon: string;
  route: string;
  selected?: boolean;
  authPublic?: boolean;
  permission?: string; // Optional permission key for role-based access
}

export interface NavigationGroup {
  title: string;
  icon: string;
  permission?: string; // Optional permission key for the entire group
  children: NavigationItem[];
}

export const getHomeRouteForRole = (roleId?: number | null): string => {
  void roleId;

  return "/home";
};

export const publicRoutes = [
  "/",
  "/auth",
  "/home",
  "/search",
  "/cart",
  "/chat",
  "/forbidden",
];

export const authPublicRoutes = [
  "/home",
  "/mylistings",
  "/add-listings",
  "/account/settings",
];

export const navigationConfig: NavigationGroup[] = [
  {
    title: "Buyer",
    icon: "mdi-cart-outline",
    children: [
      {
        title: "Buyer Home",
        icon: "mdi-home-outline",
        route: "/home",
        authPublic: true,
      },
    ],
  },
  {
    title: "Listings",
    icon: "mdi-storefront-outline",
    children: [
      {
        title: "My Listings",
        icon: "mdi-storefront",
        route: "/mylistings",
        authPublic: true,
      },
    ],
  },
  {
    title: "My Account",
    icon: "mdi-account",
    children: [
      {
        title: "Settings",
        icon: "mdi-cog-outline",
        route: "/account/settings",
        authPublic: true,
      },
    ],
  },
  {
    title: "Admin Controls",
    icon: "mdi-cog",
    permission: "admin.access",
    children: [
      {
        title: "User Management",
        icon: "mdi-account-multiple",
        route: "/admin/user-management",
        permission: "admin.users.manage",
      },
      {
        title: "User Roles",
        icon: "mdi-account-key",
        route: "/admin/user-roles",
        permission: "admin.roles.manage",
      },
      {
        title: "Announcements",
        icon: "mdi-bullhorn",
        route: "/admin/announcements",
        permission: "admin.announcements.manage",
      },
    ],
  },
];

// Helper function to get all permissions from navigation config
export const getAllPermissions = (): string[] => {
  const permissions: string[] = [];

  navigationConfig.forEach((group) => {
    if (group.permission) {
      permissions.push(group.permission);
    }

    group.children.forEach((item) => {
      if (item.permission) {
        permissions.push(item.permission);
      }
    });
  });

  return [...new Set(permissions)]; // Remove duplicates
};

// Helper function to get navigation items with selected state
export const getNavigationWithSelection = (
  selectedPermissions: string[] = [],
): NavigationGroup[] => {
  return navigationConfig.map((group) => ({
    ...group,
    children: group.children.map((item) => ({
      ...item,
      selected: selectedPermissions.includes(item.permission || item.route),
    })),
  }));
};

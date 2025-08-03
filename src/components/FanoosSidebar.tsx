import {
  Users,
  TrendingUp,
  Landmark,
  Briefcase,
  GitPullRequest,
  Network,
  ChevronDown,
  Plus,
  Settings,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "معاونت‌ها",
    items: [
      { title: "امور شرکت‌ها", icon: Briefcase, path: "/departments/corporate" },
      { title: "مالی و اقتصادی", icon: Landmark, path: "/departments/finance" },
      { title: "منابع انسانی و پشتیبانی", icon: Users, path: "/departments/hr" },
      { title: "توسعه و برنامه‌ریزی", icon: TrendingUp, path: "/departments/development" },
    ],
  },
  {
    title: "واحدها",
    items: [
      { title: "تامین مالی و بازار سرمایه", icon: GitPullRequest, path: "/units/capital-market" },
      { title: "روابط عمومی", icon: Network, path: "/units/pr" },
    ],
  },
];

export function FanoosSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "معاونت‌ها": true,
    "واحدها": true,
  });

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }));
  };

  return (
    <Sidebar className={cn("border-l-0 bg-sidebar", collapsed ? "w-16" : "w-80")}>
      <SidebarContent className="p-4">
        {/* New Chat Button */}
        <div className="mb-6">
          <Button
            className={cn(
              "bg-primary text-primary-foreground hover:bg-primary/90",
              collapsed ? "h-10 w-10 p-0" : "w-full justify-start gap-3"
            )}
          >
            <Plus className="h-4 w-4" />
            {!collapsed && "گفتگوی جدید"}
          </Button>
        </div>

        {/* Chat History */}
        <div className="mb-6">
          {!collapsed && (
            <div className="text-sm text-muted-foreground mb-3">تاریخچه گفتگو</div>
          )}
          <div className="text-sm text-muted-foreground text-center py-4">
            {collapsed ? "خالی" : "تاریخچه گفتگو خالی است."}
          </div>
        </div>

        {/* Menu Groups */}
        <div className="space-y-2">
          {menuItems.map((group) => (
            <SidebarGroup key={group.title}>
              <Collapsible
                open={openGroups[group.title]}
                onOpenChange={() => toggleGroup(group.title)}
              >
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="group/label text-sm font-medium hover:bg-sidebar-hover rounded-lg p-2 cursor-pointer transition-colors flex items-center justify-between">
                    <span className={collapsed ? "sr-only" : ""}>{group.title}</span>
                    {!collapsed && (
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        openGroups[group.title] && "rotate-180"
                      )} />
                    )}
                  </SidebarGroupLabel>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            className={cn(
                              "hover:bg-sidebar-hover",
                              collapsed ? "h-10 w-10 p-0 justify-center" : "w-full justify-start gap-3"
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                            {!collapsed && <span>{item.title}</span>}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          ))}
        </div>

        {/* Bottom Menu */}
        <div className="mt-auto pt-6 border-t border-border">
          <div className="space-y-2">
            <SidebarMenuButton
              className={cn(
                "hover:bg-sidebar-hover",
                collapsed ? "h-10 w-10 p-0 justify-center" : "w-full justify-start gap-3"
              )}
            >
              <Settings className="h-4 w-4" />
              {!collapsed && "تنظیمات"}
            </SidebarMenuButton>

            <SidebarMenuButton
              className={cn(
                "hover:bg-sidebar-hover",
                collapsed ? "h-10 w-10 p-0 justify-center" : "w-full justify-start gap-3"
              )}
            >
              <HelpCircle className="h-4 w-4" />
              {!collapsed && "راهنما"}
            </SidebarMenuButton>

            <SidebarMenuButton
              className={cn(
                "hover:bg-sidebar-hover",
                collapsed ? "h-10 w-10 p-0 justify-center" : "w-full justify-start gap-3"
              )}
            >
              <MessageCircle className="h-4 w-4" />
              {!collapsed && "پشتیبانی"}
            </SidebarMenuButton>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
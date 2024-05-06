import { type ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ViewTransitions } from "@/providers/ViewTransitions";
import Fonts from "@/server/core/fonts";
import Meta from "@/server/core/meta";
import { serverGetHostUrl } from "@/server/utils/context";
import "@/styles/tailwind.css";
import { cn } from "@/utils/cn";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const data = await getData();

  return (
    <ViewTransitions>
      <div
        data-app-root
        className={cn(
          "bg-background text-foreground inset-0 h-full min-h-screen w-full",
        )}
      >
        <link rel="icon" type="image/png" href={data.icon} />
        <Fonts />
        <Meta tree={children} desc={data?.description} />

        <Header />
        <div className="m-6 flex items-center lg:m-0 lg:min-h-svh lg:justify-center">
          {children}
        </div>
        <Footer />
      </div>
    </ViewTransitions>
  );
};
export default RootLayout;

const getData = async () => {
  const uri = serverGetHostUrl();

  const data = {
    url: uri,
    description: "A very experimental React.js RSC Stack!",
    icon: "/images/favicon.png",
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: "dynamic",
  };
};

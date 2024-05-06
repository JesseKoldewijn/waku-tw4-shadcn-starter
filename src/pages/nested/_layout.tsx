import { Fragment, type ReactNode } from "react";

import { getContext } from "waku/server";

import { Link } from "@/components/core/Link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface NestedLayoutProps {
  children: ReactNode;
}

const NextedLayout = async ({ children }: NestedLayoutProps) => {
  const { currentPage, nesting } = getData();

  return (
    <div className="inset-0 flex min-h-screen w-full flex-col gap-8 px-0 lg:pt-24 lg:px-6 xl:pt-28">
      <Breadcrumb className="[view-transition-name:breadcrumbs]">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {nesting && (
            <>
              {nesting.map((path, index) => {
                const Item =
                  currentPage === path ? BreadcrumbPage : BreadcrumbLink;

                const pageLabel = path?.replace(/-/g, " ");
                const isCurrent = currentPage === path;

                return (
                  <Fragment key={path}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem
                      key={index}
                      style={{
                        viewTransitionName: `breadcrumbs-level-${index}`,
                      }}
                    >
                      <Item asChild>
                        {!isCurrent ? (
                          <Link
                            to={`/${nesting.slice(0, index + 1).join("/")}`}
                            className="capitalize"
                          >
                            {pageLabel}
                          </Link>
                        ) : (
                          <span className="capitalize">{pageLabel}</span>
                        )}
                      </Item>
                    </BreadcrumbItem>
                  </Fragment>
                );
              })}
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </div>
  );
};

export default NextedLayout;

const getData = () => {
  const ctx = getContext();

  const hostUrl = ctx?.url as string | undefined;

  const nesting = hostUrl
    ? new URL(hostUrl).pathname.split("/").filter(Boolean)
    : [];

  const currentPage = nesting[nesting.length - 1];

  const data = {
    nesting,
    currentPage,
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: "dynamic",
  };
};

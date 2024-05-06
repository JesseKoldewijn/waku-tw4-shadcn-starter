"use client";

import { type AnchorHTMLAttributes, startTransition, useCallback } from "react";
import { Link as WakuLink, useRouter_UNSTABLE as useRouter } from "waku";

import { useSetFinishViewTransition } from "@/providers/ViewTransitions";

// For now, only handling `to` and `children` props
export function Link(
  props: Pick<React.ComponentProps<typeof WakuLink>, "to" | "children"> &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
) {
  const router = useRouter();
  const setFinishViewTransition = useSetFinishViewTransition();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (props.onClick) {
        props.onClick(e);
      }
      if ("startViewTransition" in document) {
        // @ts-ignore
        document.startViewTransition(
          () =>
            new Promise((resolve) => {
              startTransition(() => {
                router.push(props.to);
                setFinishViewTransition(() => resolve);
              });
            }),
        );
      }
    },
    [props.to, props.onClick],
  );

  return <WakuLink {...props} onClick={onClick} />;
}

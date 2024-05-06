import { isValidElement } from "react";

interface MetaProps {
  tree: React.ReactNode;
  desc?: string;
}

const Meta = ({ tree, desc }: MetaProps) => {
  const childrenIncludesDescription = Array(tree).some((child) => {
    if (isValidElement(child)) {
      const childProps = child.props as Record<string, unknown>;
      return (
        child.type === "meta" &&
        childProps?.property &&
        childProps?.property === "description"
      );
    }
    return false;
  });

  const childrenIncludesTitle = Array(tree).some((child) => {
    if (isValidElement(child)) {
      const childProps = child.props as Record<string, unknown>;
      return child.type === "title" && childProps?.children;
    }
    return false;
  });

  return (
    <>
      {!childrenIncludesTitle && <title>Waku Jereko</title>}
      {!childrenIncludesDescription && (
        <meta name="description" content={desc} />
      )}
    </>
  );
};

export default Meta;

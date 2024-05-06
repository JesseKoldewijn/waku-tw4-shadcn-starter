import { Link } from "@/components/core/Link";
import { Button } from "@/components/ui/button";

const NestedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold">Nested Pages</h1>
      <p className="max-w-md text-balance text-center">
        The pages linked below are nested and show as so using Breadcrumbs.
      </p>

      <div
        className="flex gap-4"
        aria-description="The links below bring you to pages that are nested deeper than the current page"
      >
        <Button asChild>
          <Link to="/nested/layer-1">Layer 1</Link>
        </Button>
        <Button asChild>
          <Link to="/nested/layer-1/layer-2">Layer 2</Link>
        </Button>
      </div>
    </div>
  );
};

export default NestedPage;

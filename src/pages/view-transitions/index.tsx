import { Link } from "@/components/core/Link";
import { Button } from "@/components/ui/button";
import ViewTransitionsDemo from "@/components/viewTransitions/demo";

const Page = () => {
  return (
    <div className="demo-box flex flex-col gap-4 lg:items-center">
      <h2 className="text-xl font-semibold lg:mx-auto">View Transitions</h2>
      <section className="flex max-w-md flex-col gap-4 text-balance pb-1 lg:text-center">
        <div className="flex flex-col gap-1">
          To use the View Transitions API, you need to use the
          <code className="bg-accent text-primary-foreground dark:bg-accent dark:text-primary py-1 px-2 lg:mx-auto">
            document.startViewTransition
          </code>
          function. Using this function, you need to swap out the page content
          for the next page and then you're done.
        </div>
        <div className="flex flex-col gap-1">
          Really?! That's it? Yes, that's it! The API will handle the rest for
          you. It will animate the transition between the pages and update the
          URL in the browser.
        </div>
        <div className="flex flex-col gap-1">
          You'll probably want to use this API in combination with some more
          advanced logic to also animate specific elements on the page. For
          example, you could use the
          <code className="bg-accent text-primary-foreground dark:bg-accent dark:text-primary py-1 px-2 lg:mx-auto">
            view-transition-name
          </code>
          CSS attribute to animate specific elements on the page. With
          TailwindCSS you can inline this CSS attribute like this:
          <code className="bg-accent text-primary-foreground dark:bg-accent dark:text-primary py-1 px-2 lg:mx-auto">
            &lt;div class="[view-transition-name=some_name]"&gt;
          </code>
          To read more about this, check out the MDN docs:{" "}
          <Link to="https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name">
            view-transition-name
          </Link>
        </div>

        <div className="mb-1 flex w-full flex-col items-center justify-center gap-6 border-b-2 pb-6">
          <span>
            The buttons below give you a rough idea of how this would look like
            in any supported browser.
          </span>
          <ViewTransitionsDemo />
        </div>
      </section>
      <Button asChild className="mx-auto w-max">
        <Link to="/" className="block">
          Go back to home
        </Link>
      </Button>
    </div>
  );
};
export default Page;

export const getConfig = async () => {
  return {
    render: "static",
  };
};

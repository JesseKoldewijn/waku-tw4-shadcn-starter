import { Link } from "@/components/core/Link";
import { Button } from "@/components/ui/button";

const HomePage = async () => {
  const data = await getData();

  return (
    <div className="flex flex-col justify-center gap-3">
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <h1 className="text-4xl font-bold tracking-tight">{data.headline}</h1>
      <Button asChild className="w-max">
        <Link to="/about">About</Link>
      </Button>
    </div>
  );
};
export default HomePage;

const getData = async () => {
  const data = {
    title: "Waku Jereko",
    description: "Waku Jereko | A very experimental project",
    headline: "Waku Jereko",
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: "static",
  };
};

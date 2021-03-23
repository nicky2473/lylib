import dynamic from "next/dynamic";

const Page = dynamic(() => import("components/Home/Home"), {
  ssr: false,
});

export default Page;

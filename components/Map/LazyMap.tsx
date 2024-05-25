import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default LazyMap;

import CollectionPage from "@/components/CollectionPage";

export default function MenLongSleevePage() {
  return (
    <CollectionPage
      title="Men's Long Sleeve & Hoodies"
      description="Layer up for cool mornings and evening runs. Thermal regulation meets premium comfort."
      collectionHandle="mens-long-sleeve"
      breadcrumbs={[
        { label: "Men", href: "/men" },
        { label: "Long Sleeve & Hoodies", href: "/men/long-sleeve" },
      ]}
    />
  );
}

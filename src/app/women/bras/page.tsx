import CollectionPage from "@/components/CollectionPage";

export default function WomenBrasPage() {
  return (
    <CollectionPage
      title="Women's Sports Bras"
      description="High-impact support meets breathable comfort. Engineered for every stride."
      collectionHandle="womens-sports-bras"
      breadcrumbs={[
        { label: "Women", href: "/women" },
        { label: "Sports Bras", href: "/women/bras" },
      ]}
    />
  );
}

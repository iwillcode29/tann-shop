import CollectionPage from "@/components/CollectionPage";

export default function WomenNewPage() {
  return (
    <CollectionPage
      title="Women's New Arrivals"
      description="Just landed. The newest women's running gear from the world's best brands."
      collectionHandle="womens-new-arrivals"
      breadcrumbs={[
        { label: "Women", href: "/women" },
        { label: "New Arrivals", href: "/women/new" },
      ]}
    />
  );
}

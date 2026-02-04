import CollectionPage from "@/components/CollectionPage";

export default function MenNewPage() {
  return (
    <CollectionPage
      title="Men's New Arrivals"
      description="The latest drops in men's performance running gear. Fresh styles, cutting-edge fabrics."
      collectionHandle="mens-new-arrivals"
      breadcrumbs={[
        { label: "Men", href: "/men" },
        { label: "New Arrivals", href: "/men/new" },
      ]}
    />
  );
}

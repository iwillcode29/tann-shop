import CollectionPage from "@/components/CollectionPage";

export default function MenAccessoriesPage() {
  return (
    <CollectionPage
      title="Men's Accessories"
      description="Caps, socks, gloves, and essentials to complete your running kit."
      collectionHandle="mens-accessories"
      breadcrumbs={[
        { label: "Men", href: "/men" },
        { label: "Accessories", href: "/men/accessories" },
      ]}
    />
  );
}

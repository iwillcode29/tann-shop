import CollectionPage from "@/components/CollectionPage";

export default function WomenPantsPage() {
  return (
    <CollectionPage
      title="Women's Pants & Tights"
      description="Leggings and running tights with compressive support and reflective details."
      collectionHandle="womens-pants-tights"
      breadcrumbs={[
        { label: "Women", href: "/women" },
        { label: "Pants & Tights", href: "/women/pants" },
      ]}
    />
  );
}

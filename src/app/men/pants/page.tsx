import CollectionPage from "@/components/CollectionPage";

export default function MenPantsPage() {
  return (
    <CollectionPage
      title="Men's Pants & Tights"
      description="Compression tights and running pants for training and recovery. Built for all conditions."
      collectionHandle="mens-pants-tights"
      breadcrumbs={[
        { label: "Men", href: "/men" },
        { label: "Pants & Tights", href: "/men/pants" },
      ]}
    />
  );
}

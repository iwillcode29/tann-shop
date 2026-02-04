import CollectionPage from "@/components/CollectionPage";

export default function MenTeesPage() {
  return (
    <CollectionPage
      title="Men's Tees & Tanks"
      description="Lightweight, breathable tops built for high performance. Moisture-wicking fabrics that move with you."
      collectionHandle="mens-tees-tanks"
      breadcrumbs={[
        { label: "Men", href: "/men" },
        { label: "Tees & Tanks", href: "/men/tees" },
      ]}
    />
  );
}

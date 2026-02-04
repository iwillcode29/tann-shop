import CollectionPage from "@/components/CollectionPage";

export default function MenShortsPage() {
  return (
    <CollectionPage
      title="Men's Shorts"
      description="Split shorts, lined shorts, and everything in between. Designed for unrestricted movement."
      collectionHandle="mens-shorts"
      breadcrumbs={[
        { label: "Men", href: "/men" },
        { label: "Shorts", href: "/men/shorts" },
      ]}
    />
  );
}

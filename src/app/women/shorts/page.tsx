import CollectionPage from "@/components/CollectionPage";

export default function WomenShortsPage() {
  return (
    <CollectionPage
      title="Women's Shorts & Skirts"
      description="Running shorts and skirts designed for freedom of movement. Secure pockets, flattering fits."
      collectionHandle="womens-shorts-skirts"
      breadcrumbs={[
        { label: "Women", href: "/women" },
        { label: "Shorts & Skirts", href: "/women/shorts" },
      ]}
    />
  );
}

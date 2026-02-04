import CollectionPage from "@/components/CollectionPage";

export default function WomenTeesPage() {
  return (
    <CollectionPage
      title="Women's Tees & Tanks"
      description="From tempo runs to race day. Lightweight tops with advanced moisture management."
      collectionHandle="womens-tees-tanks"
      breadcrumbs={[
        { label: "Women", href: "/women" },
        { label: "Tees & Tanks", href: "/women/tees" },
      ]}
    />
  );
}

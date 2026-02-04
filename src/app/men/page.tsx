import CollectionPage from "@/components/CollectionPage";

export default function MenPage() {
  return (
    <CollectionPage
      title="Men's Running Apparel"
      description="Performance gear engineered for speed, comfort, and style. From track sessions to trail runs."
      collectionHandle="mens"
      breadcrumbs={[{ label: "Men", href: "/men" }]}
      subcategories={[
        { label: "New Arrivals", href: "/men/new" },
        { label: "Tees & Tanks", href: "/men/tees" },
        { label: "Long Sleeve", href: "/men/long-sleeve" },
        { label: "Shorts", href: "/men/shorts" },
        { label: "Pants & Tights", href: "/men/pants" },
        { label: "Accessories", href: "/men/accessories" },
      ]}
    />
  );
}

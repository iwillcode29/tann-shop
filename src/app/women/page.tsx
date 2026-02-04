import CollectionPage from "@/components/CollectionPage";

export default function WomenPage() {
  return (
    <CollectionPage
      title="Women's Running Apparel"
      description="Engineered for the female athlete. Performance, fit, and style without compromise."
      collectionHandle="womens"
      breadcrumbs={[{ label: "Women", href: "/women" }]}
      subcategories={[
        { label: "New Arrivals", href: "/women/new" },
        { label: "Tees & Tanks", href: "/women/tees" },
        { label: "Sports Bras", href: "/women/bras" },
        { label: "Shorts & Skirts", href: "/women/shorts" },
        { label: "Pants & Tights", href: "/women/pants" },
        { label: "Accessories", href: "/women/accessories" },
      ]}
    />
  );
}

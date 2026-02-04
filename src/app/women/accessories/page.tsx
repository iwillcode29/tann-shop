import CollectionPage from "@/components/CollectionPage";

export default function WomenAccessoriesPage() {
  return (
    <CollectionPage
      title="Women's Accessories"
      description="Headbands, socks, arm sleeves, and essentials to complete your running wardrobe."
      collectionHandle="womens-accessories"
      breadcrumbs={[
        { label: "Women", href: "/women" },
        { label: "Accessories", href: "/women/accessories" },
      ]}
    />
  );
}

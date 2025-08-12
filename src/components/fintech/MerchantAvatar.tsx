import { AvatarWithIcon } from "@/components/ui/avatar-with-icon";

interface MerchantAvatarProps {
  /**
   * URL of the merchant's logo/image
   */
  merchantImage?: string;
  /**
   * Category name for fallback and alt text
   */
  category: string;
  /**
   * Icon component to display when no image is available
   */
  CategoryIcon: React.ComponentType<{ className?: string }>;
  /**
   * Tailwind background color class for the fallback
   */
  categoryColors: string;
  /**
   * Size of the avatar in pixels
   */
  size?: number;
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * A specialized avatar component for displaying merchant logos with fallback to category icons.
 * Built on top of the generic AvatarWithIcon component.
 */
export function MerchantAvatar({
  merchantImage,
  category,
  CategoryIcon,
  categoryColors,
  size = 48,
  className = '',
}: MerchantAvatarProps) {
  return (
    <AvatarWithIcon
      imageUrl={merchantImage}
      name={category}
      icon={CategoryIcon}
      colorClass={categoryColors}
      className={className}
      size={size}
    />
  );
}
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface MerchantAvatarProps {
  merchantImage?: string;
  category: string;
  CategoryIcon: React.ComponentType<{ size?: string | number }>;
  categoryColors: string;
  size?: number;
  className?: string;
}

export function MerchantAvatar({
  merchantImage,
  category,
  CategoryIcon,
  categoryColors,
  size = 48,
  className = '',
}: MerchantAvatarProps) {
  return (
    <div className="relative">
      {merchantImage ? (
        <Avatar className="h-12 w-12">
          <AvatarImage src={merchantImage} />
          <AvatarFallback>
            <CategoryIcon size={24} />
          </AvatarFallback>
        </Avatar>
      ) : (
        <div
          className={`h-12 w-12 rounded-full flex items-center justify-center ${categoryColors} ${className}`}
        >
          <CategoryIcon size={24} />
        </div>
      )}

    </div>
  );
}
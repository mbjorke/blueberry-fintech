import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface MerchantAvatarProps {
  merchantImage?: string;
  category: string;
  CategoryIcon: React.ComponentType<{ size?: string | number }>;
  categoryColors: Record<string, string>;
  isIncoming?: boolean;
  size?: number;
  className?: string;
}

export function MerchantAvatar({
  merchantImage,
  category,
  CategoryIcon,
  categoryColors,
  isIncoming,
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
          className={`h-12 w-12 rounded-full flex items-center justify-center ${categoryColors[category]} ${className}`}
        >
          <CategoryIcon size={24} />
        </div>
      )}
      {/* Direction indicator */}
      {isIncoming !== undefined && (
        <div
          className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center ${
            isIncoming ? "bg-accent" : "bg-secondary"
          }`}
        >
          {isIncoming ? (
            <ArrowDownLeft size={14} className="text-foreground" />
          ) : (
            <ArrowUpRight size={14} className="text-foreground" />
          )}
        </div>
      )}
    </div>
  );
}
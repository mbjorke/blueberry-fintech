import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { cn } from "@/lib/utils";
import { User as UserIcon } from "lucide-react";

interface AvatarWithIconProps {
  /**
   * Source URL for the avatar image
   */
  imageUrl?: string;
  /**
   * Display name or initials for the fallback
   */
  name?: string;
  /**
   * Icon component to display when no image is provided
   */
  icon?: React.ComponentType<{ className?: string }>;
  /**
   * Background color class for the fallback/icon
   */
  colorClass?: string;
  /**
   * CSS class name for the root element
   */
  className?: string;
  /**
   * Size of the avatar in pixels
   */
  size?: number;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * A flexible avatar component that can display an image, initials, or an icon.
 * Useful for displaying user avatars, merchant logos, or category icons.
 */
export function AvatarWithIcon({
  imageUrl,
  name,
  icon: Icon,
  colorClass = "bg-muted text-muted-foreground",
  className,
  size = 48,
  onClick,
}: AvatarWithIconProps) {
  const getInitials = (str: string) => {
    return str
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div 
      className={cn("relative flex-shrink-0", className)}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <Avatar className="w-full h-full">
        {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
        <AvatarFallback 
          className={cn(
            "flex items-center justify-center w-full h-full text-lg font-medium",
            colorClass,
            { "cursor-pointer": onClick }
          )}
        >
          {Icon ? (
            <Icon className="w-3/5 h-3/5" />
          ) : name ? (
            getInitials(name)
          ) : (
            <UserIcon className="w-3/5 h-3/5" />
          )}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

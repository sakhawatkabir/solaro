import Badge from "./Badge";
import Image from "next/image";

export default function MembersBadge() {
  const avatars = [
    "https://images.unsplash.com/photo-1642364861013-2c33f2dcfbcf?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1645106281521-86da01d1031d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1649150849645-92fba77775a0?w=100&h=100&fit=crop",
  ];

  return (
    <Badge className="pl-2">
      <div className="flex -space-x-2">
        {avatars.map((avatar) => (
          <Image
            key={avatar}
            src={avatar}
            alt="Member avatar"
            width={32}
            height={32}
            className="size-8 rounded-full border-2 border-cream object-cover"
          />
        ))}
      </div>
      <div className="flex flex-col items-start">
        <span className="text-accent font-bold text-base">1500+</span>
        <span className="text-xs text-ink-light">Active Members</span>
      </div>
    </Badge>
  );
}

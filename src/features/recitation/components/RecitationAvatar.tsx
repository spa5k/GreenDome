import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarSectionProps {
  name: string;
  currentReciter: string;
}

export const AvatarSection = ({ name, currentReciter }: AvatarSectionProps) => {
  if (!currentReciter) {
    return null;
  }

  if (!name) return null;
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
        <Avatar>
          <AvatarImage
            src="https://avatar.iran.liara.run/public/boy"
            alt={currentReciter!}
          />
          <AvatarFallback>
            {currentReciter?.[0]?.toUpperCase()
              + (currentReciter?.slice(1) ?? "")}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="text-sm font-medium">{name}</div>
    </div>
  );
};

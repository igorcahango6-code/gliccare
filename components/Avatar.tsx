export function Avatar({
  name,
  avatarUrl,
  size = 48,
}: {
  name: string;
  avatarUrl?: string;
  size?: number;
}) {
  if (avatarUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={avatarUrl}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover"
      />
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full bg-teal-600 font-semibold text-white"
    >
      {name.charAt(0).toUpperCase() || "?"}
    </div>
  );
}

export function TypographyLink({
  children,
  href,
  target = "_blank"
}: {
  children: React.ReactNode;
  href: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
}) {
  return (
    <a
      className="cursor-alias underline text-muted-foreground hover:text-foreground text-base"
      href={href}
      target={target}
    >
      {children}
    </a>
  );
}

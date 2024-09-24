export function TypographyLabel({
  children,
  htmlFor
}: {
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <label htmlFor={htmlFor} className="text-base font-semibold">
      {children}
    </label>
  );
}

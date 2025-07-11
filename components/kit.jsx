import Link from "next/link";

export function A({ children, href, color = "white", className, ...props }) {
  return (
    <Link href={href} className={`link-${color} ${className}`} {...props}>
      {children}
    </Link>
  );
}
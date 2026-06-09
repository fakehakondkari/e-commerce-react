import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  crumbs: Crumb[];
}

export function Breadcrumb({ crumbs }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, index) => (
          <li key={crumb.label} className="inline-flex items-center gap-2">
            {crumb.href ? (
              <Link to={crumb.href} className="transition hover:text-brand">{crumb.label}</Link>
            ) : (
              <span className="text-slate-500">{crumb.label}</span>
            )}
            {index < crumbs.length - 1 ? <span className="text-slate-300">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

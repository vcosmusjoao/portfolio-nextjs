import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { findProjectBySlug, projects } from "@/data/projects";
import { caseStudies } from "@/i18n/caseStudies";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/**
 * Metadata is always English: the locale lives in the browser, so the server
 * can't see it — and EN is what the recruiters this site targets read anyway.
 */
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = findProjectBySlug(params.slug);
  if (!project) return {};
  const description = caseStudies.en[project.id].tagline.replace(/\*\*|`/g, "");
  const path = `/projects/${project.slug}`;
  return {
    title: `${project.name} — case study`,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title: `${project.name} — case study`, description },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = findProjectBySlug(params.slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}

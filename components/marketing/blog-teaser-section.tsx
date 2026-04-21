import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    title: "Why endotoxin testing matters for research peptides",
    excerpt:
      "A peptide can test at 99% purity and still contain dangerous levels of bacterial endotoxin. LAL endotoxin testing is the only way to detect these invisible, heat-stable contaminants before they cause unexpected results in sensitive assays.",
    href: "/#blog",
  },
  {
    title: "How to confirm a peptide is what it says it is",
    excerpt:
      "Purity testing tells you how clean a peptide is. But it cannot tell you what the peptide actually is. LC-MS identity testing fills that gap, confirming whether the peptide in your vial matches the one on the label.",
    href: "/#blog",
  },
  {
    title: "8 peptide myths that independent testing has disproved",
    excerpt:
      "The peptide community is full of advice that sounds scientific but does not hold up under laboratory testing. From shaking vials to shelf life panic, here are eight common peptide myths and what independent data actually shows.",
    href: "/#blog",
  },
];

export function BlogTeaserSection() {
  return (
    <section id="blog" className="border-b border-slate-200 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              From the Blog
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Latest Articles
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Expert insights on peptide testing, quality, and verification
            </p>
          </div>
          <Link
            href="/#blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline"
          >
            View All Articles
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold leading-snug text-slate-900">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {post.excerpt}
              </p>
              <Link
                href={post.href}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline"
              >
                Read article
                <ArrowUpRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/constants";
import FadeInSection from "@/components/FadeInSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { cardClasses } from "@/components/ui/Card";

const categories = [
  "All",
  ...Array.from(new Set(BLOG_POSTS.map((post) => post.category))),
];

function formatDate(date: string, style: "short" | "long" = "short") {
  return new Date(date).toLocaleDateString("en-US", {
    month: style === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  const [featuredPost, ...remainingPosts] = filteredPosts;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-paper grain overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-96 bg-grid-dots opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-20">
          <FadeInSection>
            <SectionHeading
              as="h1"
              align="center"
              eyebrow="Insights"
              title={
                <>
                  Notes on building{" "}
                  <em className="italic text-teal-600">capable</em> workforces
                </>
              }
              lede="Expert perspectives on leadership development, upskilling, AI in L&D, and workforce transformation across APAC."
            />
          </FadeInSection>
        </div>
      </section>

      {/* Filter + posts */}
      <section className="py-20 md:py-28 bg-paper-warm border-t border-navy-100">
        <div className="max-w-6xl mx-auto px-6">
          {/* Category filters */}
          <div
            className="flex flex-wrap gap-3 mb-14 justify-center"
            role="group"
            aria-label="Filter posts by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
                  activeCategory === category
                    ? "bg-ink text-paper"
                    : "border border-navy-200 text-navy-600 hover:border-ink hover:text-ink"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featuredPost && (
            <FadeInSection>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block mb-16"
              >
                <article className="border-y border-navy-200 py-10 md:py-14">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-4">
                    Featured &middot; {featuredPost.category}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl leading-[1.15] tracking-tight text-ink text-balance max-w-3xl mb-5 transition-colors group-hover:text-teal-700">
                    {featuredPost.title}
                  </h2>
                  <p className="text-navy-600 text-lg leading-relaxed max-w-2xl mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-navy-600">
                    <time dateTime={featuredPost.date}>
                      {formatDate(featuredPost.date, "long")}
                    </time>
                    <span
                      className="w-1 h-1 rounded-full bg-navy-300"
                      aria-hidden="true"
                    />
                    <span>{featuredPost.readTime}</span>
                    <span
                      className="w-1 h-1 rounded-full bg-navy-300"
                      aria-hidden="true"
                    />
                    <span className="inline-flex items-center gap-1.5 font-semibold text-teal-600">
                      <span className="link-underline">Read article</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            </FadeInSection>
          )}

          {/* Remaining posts */}
          {remainingPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingPosts.map((post, index) => (
                <FadeInSection
                  key={post.slug}
                  delay={index * 0.08}
                  className="h-full"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className={cardClasses(
                      true,
                      "group flex flex-col h-full p-8"
                    )}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 mb-3">
                      {post.category}
                    </p>
                    <h3 className="font-display text-xl leading-snug text-ink mb-3 transition-colors group-hover:text-teal-700">
                      {post.title}
                    </h3>
                    <p className="text-sm text-navy-600 leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-navy-100 text-sm text-navy-500">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span
                        className="w-1 h-1 rounded-full bg-navy-300"
                        aria-hidden="true"
                      />
                      <span>{post.readTime}</span>
                    </div>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-navy-600 text-lg">
                No posts found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

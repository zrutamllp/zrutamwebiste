import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/constants";
import FadeInSection from "@/components/FadeInSection";
import CTABanner from "@/components/CTABanner";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found | Zrutam" };
  return {
    title: `${post.title} | Zrutam Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const articleContent: Record<string, string[]> = {
  "why-idps-fail-and-how-to-fix-them": [
    "Individual Development Plans have been a staple of corporate talent development for decades. Yet a significant majority of IDPs fail to produce meaningful outcomes. The reasons range from lack of personalization to poor follow-through, and the consequences are felt across organizations in the form of disengaged employees and stagnant leadership pipelines.",
    "The most common failure point is treating the IDP as a compliance exercise rather than a genuine development tool. When employees are asked to fill out a template once a year and then file it away, the IDP becomes nothing more than administrative overhead. Effective IDPs require ongoing engagement, regular check-ins, and alignment between individual career aspirations and organizational priorities.",
    "Technology can play a transformative role in making IDPs work. AI-driven platforms can personalize development recommendations based on real-time skill assessments, career driver analysis, and market trends. When an IDP tool adapts to the individual rather than forcing a one-size-fits-all approach, engagement and completion rates increase dramatically.",
    "At Zrutam, our IDP Tool powered by the proprietary RSI Career Driver Assessment addresses these challenges head-on. By identifying each employee's unique Role, Skill, and Interest drivers, we create development plans that resonate personally while serving the strategic needs of the organization. The result is an IDP that employees actually want to use and managers can meaningfully support.",
  ],
  "upskilling-vs-reskilling-what-chros-need-to-know": [
    "The terms upskilling and reskilling are often used interchangeably, but for CHROs building a workforce strategy, the distinction matters significantly. Upskilling refers to teaching employees new competencies within their current role to keep pace with evolving requirements. Reskilling, on the other hand, involves training employees for entirely different roles, often in response to automation, restructuring, or strategic pivots.",
    "The World Economic Forum projects that nearly half of the global workforce will need significant reskilling by 2027. For organizations in India, the Middle East, and Southeast Asia, this challenge is amplified by rapidly evolving technology sectors, young and ambitious workforces, and intense competition for specialized talent.",
    "Forward-thinking CHROs are moving beyond reactive training programs toward a skills-first talent strategy. This means mapping the complete skills landscape of the organization, identifying gaps relative to future business needs, and deploying targeted learning interventions. The key is building internal mobility pathways that allow employees to grow into new roles rather than looking externally.",
    "A skills-first approach requires the right technology infrastructure. AI-powered platforms can assess skills in real time, recommend personalized learning pathways, and track progress toward proficiency. When combined with tools like competency mapping, career pathing, and internal talent marketplaces, organizations can build the workforce agility needed to thrive in a rapidly changing market.",
  ],
  "ai-in-leadership-development-india-market": [
    "India's corporate learning and development market is experiencing a fundamental shift as artificial intelligence transforms how organizations identify, develop, and retain leadership talent. With a large and growing enterprise sector, India represents one of the most dynamic markets for AI-powered L&D solutions globally.",
    "Traditional leadership development in India has relied heavily on classroom-based programs, external coaching engagements, and generic online courses. While these approaches have their place, they often struggle with personalization at scale, consistency across geographically dispersed teams, and demonstrating measurable ROI to budget-conscious stakeholders.",
    "AI is changing this equation by enabling adaptive learning paths that respond to each leader's unique strengths, development areas, and learning preferences. Scenario-based simulations can recreate complex business situations specific to Indian market dynamics, allowing leaders to practice decision-making in a risk-free environment. Natural language processing enables real-time feedback on communication skills, while predictive analytics identify high-potential talent earlier in the pipeline.",
    "For enterprises operating across India's diverse business landscape, AI-powered leadership development offers the scalability and personalization that traditional methods cannot match. Organizations that invest in these technologies today are building a significant competitive advantage in attracting, developing, and retaining the leaders who will drive business growth in the coming decade.",
  ],
  "how-to-measure-ld-roi-practical-guide": [
    "Demonstrating the return on investment of learning and development initiatives remains one of the most persistent challenges for L&D professionals. In boardrooms across APAC, stakeholders increasingly demand quantifiable evidence that training programs contribute to business outcomes, not just completion certificates.",
    "A practical ROI framework starts with defining clear, measurable objectives before the program begins. These should connect learning outcomes to business metrics such as productivity improvements, error rate reductions, time-to-competency for new skills, employee retention, and internal promotion rates. The Kirkpatrick model provides a useful foundation, but modern L&D measurement goes further by incorporating predictive analytics and real-time skill assessment data.",
    "Technology plays a critical role in making L&D ROI measurement feasible at scale. AI-powered platforms can track not just course completion but actual skill acquisition, application on the job, and correlation with performance metrics. Dashboards that aggregate data across the learning ecosystem give L&D leaders the visibility they need to optimize programs continuously.",
    "The organizations that succeed in measuring L&D ROI are those that treat measurement as an ongoing discipline rather than an afterthought. By building evaluation criteria into program design from the start, leveraging technology for data collection and analysis, and reporting results in the language of business outcomes, L&D teams can demonstrate their strategic value and secure continued investment in workforce development.",
  ],
  "building-skills-first-organisation-apac": [
    "The shift from role-based to skills-based talent management represents one of the most significant transformations in how APAC organizations attract, develop, and deploy their workforce. In a skills-first organization, hiring, promotion, and development decisions are driven by verified competencies rather than job titles, tenure, or credentials alone.",
    "This shift is particularly relevant in the APAC context, where diverse education systems, rapid economic growth, and a young workforce create unique challenges for traditional talent management approaches. Organizations in India, Singapore, the UAE, and other APAC markets are finding that a skills-first approach enables them to tap into a broader talent pool and build more adaptable teams.",
    "Building a skills-first organization requires three foundational capabilities. First, a comprehensive skills taxonomy that defines what skills matter for the organization now and in the future. Second, a reliable assessment infrastructure that can measure skills accurately and at scale. Third, a connected technology ecosystem that integrates skills data into every talent decision, from hiring through succession planning.",
    "Organizations that have successfully made this transition report significant improvements in internal mobility, employee engagement, and workforce agility. The journey is not without challenges, particularly around change management and technology integration, but the strategic benefits of knowing and leveraging the full skill capacity of your workforce make the investment worthwhile for forward-looking APAC enterprises.",
  ],
};

export default function BlogPostPage({ params }: PageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const content = articleContent[post.slug] || [];
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(
    0,
    3
  );

  return (
    <>
      {/* Article Header */}
      <section className="gradient-navy py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-teal hover:text-teal-200 text-sm font-medium mb-8 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
          <span className="inline-block px-3 py-1 bg-teal/10 text-teal text-sm font-medium rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>{post.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>{post.category}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                {content.map((paragraph, index) => (
                  <FadeInSection key={index} delay={index * 0.1}>
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  </FadeInSection>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500 mr-2">Tags:</span>
                  {post.keyword.split(" ").map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-lg font-semibold text-navy mb-6">
                  Related Articles
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="block group"
                    >
                      <div className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors border border-gray-100">
                        <span className="text-xs text-teal font-medium">
                          {related.category}
                        </span>
                        <h4 className="text-sm font-semibold text-navy mt-1 group-hover:text-teal transition-colors leading-snug">
                          {related.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <time dateTime={related.date}>
                            {new Date(related.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </time>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span>{related.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Newsletter CTA */}
                <div className="mt-8 bg-gradient-to-br from-navy to-navy-50 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-2">
                    Stay Updated
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Get the latest L&D insights delivered to your inbox.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-teal hover:text-teal-200 text-sm font-medium transition-colors"
                  >
                    Subscribe to our newsletter
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Transform Your Workforce?"
        subtitle="Discover how Zrutam's AI-powered L&D solutions can drive measurable outcomes."
        primaryCTA={{ text: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ text: "Explore Solutions", href: "/solutions" }}
      />
    </>
  );
}
